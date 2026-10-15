'use client';

import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useBangladeshGeoLang } from '@/context/BangladeshGeoLangContext';

const BD_CENTER = [90.3563, 23.685];
const BD_ZOOM = 6.4;
const STYLE_URL = 'https://tiles.openfreemap.org/styles/positron';
const GEOJSON_URL = '/bangladesh.geojson';
const BAZARS_URL = '/bd-bazars.geojson';
const ROUTES_URL = '/bd-major-routes.geojson';

function popupHtml(p, lang) {
  const primary =
    lang === 'bn' ? p.bn_name || p.name || p.source_name || '' : p.name || p.source_name || '';
  const secondary = lang === 'bn' ? p.name || '' : p.bn_name || '';
  const district =
    lang === 'bn' ? p.district_bn_name || p.district_name || '' : p.district_name || '';
  const safe = (s) =>
    (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div style="font-family:'Hind Siliguri',system-ui,sans-serif;font-size:12px;line-height:1.35;padding:4px 6px;">
      <div style="color:#0f172a;font-weight:600;letter-spacing:-0.01em;">${safe(primary)}</div>
      ${secondary ? `<div style="color:#64748b;font-size:11px;margin-top:1px;">${safe(secondary)}</div>` : ''}
      ${district ? `<div style="color:#059669;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;margin-top:3px;">${safe(district)}</div>` : ''}
    </div>
  `;
}

function bazarPopupHtml(p, lang) {
  const primary = lang === 'bn' ? p.bn_name || p.name || '' : p.name || '';
  const upa = p.upazila || '';
  const dist = p.district || '';
  const tag = lang === 'bn' ? 'বাজার' : 'Bazar';
  const safe = (s) =>
    (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `
    <div style="font-family:'Hind Siliguri',system-ui,sans-serif;font-size:12px;line-height:1.35;padding:4px 6px;">
      <div style="color:#d97706;font-size:10px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;">${tag}</div>
      <div style="color:#0f172a;font-weight:600;letter-spacing:-0.01em;margin-top:2px;">${safe(primary)}</div>
      ${upa || dist ? `<div style="color:#64748b;font-size:11px;margin-top:1px;">${safe([upa, dist].filter(Boolean).join(' · '))}</div>` : ''}
    </div>
  `;
}

export default function BangladeshMap({
  flyTo,
  selectedUpazilaId,
  onUpazilaClick,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const popupRef = useRef(null);
  const bazarPopupRef = useRef(null);
  const hoverIdRef = useRef(null);
  const selectedIdRef = useRef(null);
  const { lang } = useBangladeshGeoLang();
  const langRef = useRef(lang);
  langRef.current = lang;

  const onUpazilaClickRef = useRef(onUpazilaClick);
  onUpazilaClickRef.current = onUpazilaClick;

  const [overlays, setOverlays] = useState({
    boundary: true,
    bazars: false,
    routes: false,
  });

  const loadedRef = useRef({
    boundary: false,
    bazars: false,
    routes: false,
  });

  // Ensure Bazars layer
  const ensureBazarsLayer = async () => {
    const m = mapRef.current;
    if (!m || loadedRef.current.bazars) return;
    try {
      const r = await fetch(BAZARS_URL);
      if (!r.ok) return;
      const geojson = await r.json();
      if (!mapRef.current) return;
      m.addSource('bd-bazars', { type: 'geojson', data: geojson });
      m.addLayer({
        id: 'bd-bazars-circle',
        type: 'circle',
        source: 'bd-bazars',
        paint: {
          'circle-radius': ['interpolate', ['linear'], ['zoom'], 6, 1.6, 9, 3, 12, 5],
          'circle-color': '#f59e0b',
          'circle-stroke-color': '#d97706',
          'circle-stroke-width': 0.6,
          'circle-opacity': 0.85,
        },
      });
      m.on('mouseenter', 'bd-bazars-circle', () => {
        m.getCanvas().style.cursor = 'pointer';
      });
      m.on('mouseleave', 'bd-bazars-circle', () => {
        m.getCanvas().style.cursor = '';
        bazarPopupRef.current?.remove();
      });
      m.on('mousemove', 'bd-bazars-circle', (e) => {
        if (!e.features?.length) return;
        const f = e.features[0];
        if (!bazarPopupRef.current) {
          bazarPopupRef.current = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 8,
          });
        }
        bazarPopupRef.current
          .setLngLat(e.lngLat)
          .setHTML(bazarPopupHtml(f.properties || {}, langRef.current))
          .addTo(m);
      });
      loadedRef.current.bazars = true;
    } catch {
      /* bazars optional */
    }
  };

  // Ensure Routes layer
  const ensureRoutesLayer = async () => {
    const m = mapRef.current;
    if (!m || loadedRef.current.routes) return;
    try {
      const r = await fetch(ROUTES_URL);
      if (!r.ok) return;
      const geojson = await r.json();
      if (!mapRef.current) return;
      m.addSource('bd-routes', { type: 'geojson', data: geojson });
      m.addLayer(
        {
          id: 'bd-routes-line',
          type: 'line',
          source: 'bd-routes',
          layout: { 'line-cap': 'round', 'line-join': 'round' },
          paint: {
            'line-color': [
              'match',
              ['get', 'highway'],
              'motorway', '#e11d48',
              'trunk', '#f43f5e',
              '#fb7185',
            ],
            'line-width': [
              'interpolate', ['linear'], ['zoom'],
              6, 0.6,
              10, 1.6,
              13, 3,
            ],
            'line-opacity': 0.85,
          },
        },
        m.getLayer('bd-boundary-line-active') ? 'bd-boundary-line-active' : undefined
      );
      loadedRef.current.routes = true;
    } catch {
      /* routes optional */
    }
  };

  // React to overlay changes
  useEffect(() => {
    const m = mapRef.current;
    if (!m || !m.isStyleLoaded()) return;

    (async () => {
      // Bazars
      if (overlays.bazars) {
        await ensureBazarsLayer();
        if (m.getLayer('bd-bazars-circle')) {
          m.setLayoutProperty('bd-bazars-circle', 'visibility', 'visible');
        }
      } else if (m.getLayer('bd-bazars-circle')) {
        m.setLayoutProperty('bd-bazars-circle', 'visibility', 'none');
      }

      // Routes
      if (overlays.routes) {
        await ensureRoutesLayer();
        if (m.getLayer('bd-routes-line')) {
          m.setLayoutProperty('bd-routes-line', 'visibility', 'visible');
        }
      } else if (m.getLayer('bd-routes-line')) {
        m.setLayoutProperty('bd-routes-line', 'visibility', 'none');
      }

      // Boundary
      const visBoundary = overlays.boundary ? 'visible' : 'none';
      for (const id of ['bd-boundary-fill', 'bd-boundary-line', 'bd-boundary-line-active']) {
        if (m.getLayer(id)) m.setLayoutProperty(id, 'visibility', visBoundary);
      }
    })();
  }, [overlays]);

  // Initialize Map
  useEffect(() => {
    if (!containerRef.current) return;

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: STYLE_URL,
      center: BD_CENTER,
      zoom: BD_ZOOM,
      attributionControl: { compact: true },
    });

    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');

    map.on('load', () => {
      map.resize();

      fetch(GEOJSON_URL)
        .then((r) => (r.ok ? r.json() : null))
        .then((geojson) => {
          if (!geojson || !mapRef.current) return;
          const m = mapRef.current;

          for (let i = 0; i < geojson.features.length; i++) {
            const f = geojson.features[i];
            f.id = f.properties?.upazila_id || `f${i}`;
          }

          m.addSource('bd-boundary', { type: 'geojson', data: geojson });

          m.addLayer({
            id: 'bd-boundary-fill',
            type: 'fill',
            source: 'bd-boundary',
            paint: {
              'fill-color': '#10b981',
              'fill-opacity': [
                'case',
                ['boolean', ['feature-state', 'selected'], false],
                0.35,
                ['boolean', ['feature-state', 'hover'], false],
                0.2,
                0.05,
              ],
            },
          });

          m.addLayer({
            id: 'bd-boundary-line',
            type: 'line',
            source: 'bd-boundary',
            paint: {
              'line-color': '#059669',
              'line-width': 0.6,
              'line-opacity': 0.45,
            },
          });

          m.addLayer({
            id: 'bd-boundary-line-active',
            type: 'line',
            source: 'bd-boundary',
            filter: [
              'any',
              ['boolean', ['feature-state', 'hover'], false],
              ['boolean', ['feature-state', 'selected'], false],
            ],
            paint: {
              'line-color': '#047857',
              'line-width': 1.8,
              'line-opacity': 0.95,
            },
          });

          loadedRef.current.boundary = true;

          popupRef.current = new maplibregl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: 8,
          });

          const setHover = (id, lngLat, props) => {
            const prev = hoverIdRef.current;
            if (prev !== null && prev !== id) {
              try {
                m.setFeatureState({ source: 'bd-boundary', id: prev }, { hover: false });
              } catch {
                /* feature gone */
              }
            }
            hoverIdRef.current = id;
            if (id !== null) {
              try {
                m.setFeatureState({ source: 'bd-boundary', id }, { hover: true });
              } catch {
                /* feature gone */
              }
            }
            if (id !== null && lngLat && props && popupRef.current) {
              popupRef.current
                .setLngLat(lngLat)
                .setHTML(popupHtml(props, langRef.current))
                .addTo(m);
            } else if (popupRef.current) {
              popupRef.current.remove();
            }
          };

          m.on('mousemove', 'bd-boundary-fill', (e) => {
            if (!e.features?.length) return;
            const f = e.features[0];
            const props = f.properties;
            m.getCanvas().style.cursor = 'pointer';
            setHover(f.id ?? null, e.lngLat, props);
          });

          m.on('mouseleave', 'bd-boundary-fill', () => {
            m.getCanvas().style.cursor = '';
            setHover(null);
          });

          m.on('click', 'bd-boundary-fill', (e) => {
            if (!e.features?.length) return;
            const f = e.features[0];
            const props = f.properties;
            if (props?.upazila_id) {
              onUpazilaClickRef.current?.(props);
            }
          });
        })
        .catch(() => {
          /* optional error handle */
        });
    });

    mapRef.current = map;

    // Handle container resize
    const resizeObserver = new ResizeObserver(() => {
      map.resize();
    });
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      popupRef.current?.remove();
      bazarPopupRef.current?.remove();
      popupRef.current = null;
      bazarPopupRef.current = null;
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // Update selected upazila feature state
  useEffect(() => {
    const m = mapRef.current;
    if (!m || !m.isStyleLoaded()) return;

    const prev = selectedIdRef.current;
    if (prev !== null && prev !== selectedUpazilaId) {
      try {
        m.setFeatureState({ source: 'bd-boundary', id: prev }, { selected: false });
      } catch {
        /* feature gone */
      }
    }
    if (selectedUpazilaId) {
      try {
        m.setFeatureState({ source: 'bd-boundary', id: selectedUpazilaId }, { selected: true });
      } catch {
        /* feature gone */
      }
    }
    selectedIdRef.current = selectedUpazilaId || null;
  }, [selectedUpazilaId]);

  // Close popup if language changes
  useEffect(() => {
    if (popupRef.current && popupRef.current.isOpen() && hoverIdRef.current !== null) {
      popupRef.current.remove();
    }
  }, [lang]);

  // React to flyTo changes
  useEffect(() => {
    if (!flyTo || !mapRef.current) return;
    mapRef.current.flyTo({
      center: [flyTo.lng, flyTo.lat],
      zoom: flyTo.zoom ?? 10,
      essential: true,
    });
  }, [flyTo]);

  return (
    <div className="relative h-full w-full min-h-[520px] lg:min-h-[640px]">
      <div ref={containerRef} className="absolute inset-0 h-full w-full" />
      <Legend overlays={overlays} setOverlays={setOverlays} lang={lang} />
    </div>
  );
}

function Legend({ overlays, setOverlays, lang }) {
  const labels = {
    boundary: { en: 'Upazilas', bn: 'উপজেলা', dot: 'bg-emerald-500' },
    bazars: { en: 'Bazars', bn: 'বাজার', dot: 'bg-amber-500' },
    routes: { en: 'Routes', bn: 'হাইওয়ে', dot: 'bg-rose-500' },
  };
  const order = ['boundary', 'bazars', 'routes'];

  return (
    <div className="pointer-events-auto absolute left-3 top-3 flex flex-col gap-1.5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 p-1.5 text-[11px] shadow-lg backdrop-blur z-10">
      {order.map((k) => {
        const on = overlays[k];
        return (
          <button
            key={k}
            type="button"
            onClick={() => setOverlays((s) => ({ ...s, [k]: !s[k] }))}
            className={`flex items-center gap-2 rounded-xl px-2.5 py-1 transition-all cursor-pointer ${
              on
                ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-medium'
                : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${labels[k].dot} ${on ? '' : 'opacity-30'}`}
            />
            <span>{labels[k][lang] || labels[k].en}</span>
          </button>
        );
      })}
    </div>
  );
}
