'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import {
  divisions,
  districts,
  upazilas,
  postcodes,
} from '@/lib/bangladeshGeoData';
import { useBangladeshGeoLang } from '@/context/BangladeshGeoLangContext';

// Dynamically import map component with ssr: false
const BangladeshMap = dynamic(
  () => import('@/components/bangladesh-geojson/BangladeshMap'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full min-h-[520px] lg:min-h-[640px] rounded-3xl bg-zinc-100 dark:bg-zinc-900/60 flex flex-col items-center justify-center border border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="w-9 h-9 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">Initializing MapLibre Engine...</p>
      </div>
    ),
  }
);

// Translation helpers matching Demo.tsx
const T = {
  division: { en: 'Division', bn: 'বিভাগ' },
  district: { en: 'District', bn: 'জেলা' },
  upazila: { en: 'Upazila', bn: 'উপজেলা' },
  postcode: { en: 'Postcode', bn: 'পোস্টকোড' },
  searchPh: {
    en: "type a place — try 'sylhet' or 'ঢাকা'",
    bn: 'যেকোনো জায়গা লিখুন — যেমন ‘সিলেট’ বা ‘Dhaka’',
  },
  allDivisions: { en: 'All Divisions', bn: 'সব বিভাগ' },
  allDistricts: { en: 'All Districts', bn: 'সব জেলা' },
  allUpazilas: { en: 'All Upazilas', bn: 'সব উপজেলা' },
  empty: {
    en: 'click a place on the map, or pick one from the dropdowns. its details show up here.',
    bn: 'ম্যাপে কোনো জায়গায় ক্লিক করুন, অথবা ড্রপডাউন থেকে বাছুন। তার তথ্য এখানে দেখাবে।',
  },
  copy: { en: 'copy json', bn: 'JSON কপি করুন' },
  copied: { en: 'copied', bn: 'কপি হয়েছে' },
  footerLeft: {
    en: 'made by ',
    bn: 'বানিয়েছেন ',
  },
  footerRight: {
    en: 'map tiles by openfreemap',
    bn: 'ম্যাপ টাইলস: OpenFreeMap',
  },
};

function nameOf(item, lang) {
  if (!item) return '';
  if (lang === 'bn') return item.bn_name || item.name || '';
  return item.name || item.bn_name || '';
}

// Search helper
function searchGeo(query, limit = 20) {
  const q = (query || '').trim().toLowerCase();
  if (!q) return [];
  const out = [];
  const matches = (s) => Boolean(s && s.toLowerCase().includes(q));

  for (const d of divisions) {
    if (matches(d.name) || matches(d.bn_name)) out.push({ type: 'division', data: d });
    if (out.length >= limit) return out;
  }
  for (const d of districts) {
    if (matches(d.name) || matches(d.bn_name)) out.push({ type: 'district', data: d });
    if (out.length >= limit) return out;
  }
  for (const u of upazilas) {
    if (matches(u.name) || matches(u.bn_name)) out.push({ type: 'upazila', data: u });
    if (out.length >= limit) return out;
  }
  for (const p of postcodes) {
    if (matches(p.postOffice) || matches(p.upazila) || matches(p.postCode)) {
      out.push({ type: 'postcode', data: p });
    }
    if (out.length >= limit) return out;
  }
  return out;
}

const ACCENT_BY_TYPE = {
  division: 'mint',
  district: 'peach',
  upazila: 'rose',
  postcode: 'mint',
};

export default function BangladeshGeoDemoPage() {
  const { lang } = useBangladeshGeoLang();
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');
  const [upazilaId, setUpazilaId] = useState('');
  const [searchHit, setSearchHit] = useState(null);

  const selection = useMemo(() => {
    if (upazilaId) {
      const u = upazilas.find((x) => String(x.id) === String(upazilaId));
      if (u) return { type: 'upazila', data: u };
    }
    if (districtId) {
      const d = districts.find((x) => String(x.id) === String(districtId));
      if (d) return { type: 'district', data: d };
    }
    if (divisionId) {
      const d = divisions.find((x) => String(x.id) === String(divisionId));
      if (d) return { type: 'division', data: d };
    }
    return null;
  }, [divisionId, districtId, upazilaId]);

  const flyTo = useMemo(() => {
    if (searchHit) {
      const d = searchHit.data;
      if (searchHit.type === 'upazila') {
        const district = districts.find((x) => String(x.id) === String(d.district_id || ''));
        if (district && district.lat && district.long) {
          return { lng: parseFloat(district.long), lat: parseFloat(district.lat), zoom: 10 };
        }
      }
      if (d && d.lat && d.long) {
        return {
          lng: parseFloat(d.long),
          lat: parseFloat(d.lat),
          zoom: searchHit.type === 'division' ? 8 : 10,
        };
      }
    }
    if (!selection) return null;
    if (selection.type === 'upazila') {
      const district = districts.find((x) => String(x.id) === String(selection.data.district_id));
      if (district && district.lat && district.long) {
        return { lng: parseFloat(district.long), lat: parseFloat(district.lat), zoom: 10 };
      }
      return null;
    }
    const data = selection.data;
    if (data && data.lat && data.long) {
      return {
        lng: parseFloat(data.long),
        lat: parseFloat(data.lat),
        zoom: selection.type === 'division' ? 8 : 10,
      };
    }
    return null;
  }, [selection, searchHit]);

  const onUpazilaClick = (props) => {
    if (!props?.upazila_id) return;
    setDivisionId(props.division_id ? String(props.division_id) : '');
    setDistrictId(props.district_id ? String(props.district_id) : '');
    setUpazilaId(String(props.upazila_id));
    setSearchHit(null);
  };

  const onSearchSelect = (hit) => {
    setSearchHit(hit);
    if (hit.type === 'division') {
      setDivisionId(String(hit.data.id));
      setDistrictId('');
      setUpazilaId('');
    } else if (hit.type === 'district') {
      setDivisionId(String(hit.data.division_id));
      setDistrictId(String(hit.data.id));
      setUpazilaId('');
    } else if (hit.type === 'upazila') {
      const dist = districts.find((x) => String(x.id) === String(hit.data.district_id));
      setDivisionId(dist?.division_id ? String(dist.division_id) : '');
      setDistrictId(String(hit.data.district_id));
      setUpazilaId(String(hit.data.id));
    }
  };

  const cardData = searchHit ?? selection;
  const cardJson = cardData?.data ?? null;
  const cardAccent = cardData ? ACCENT_BY_TYPE[cardData.type] : 'mint';
  const cardBadge = cardData ? T[cardData.type][lang] : '';
  const cardTitle = cardData
    ? cardData.type === 'postcode'
      ? `${cardData.data.postOffice} · ${cardData.data.postCode}`
      : nameOf(cardData.data, lang)
    : '';
  const cardSubtitle =
    cardData && cardData.type !== 'postcode'
      ? lang === 'en'
        ? cardData.data.bn_name
        : cardData.data.name
      : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <main className="w-full flex-1">
        {/* Header Title Section */}
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl font-exo-medium">
              {lang === 'en' ? 'play with the data' : 'ডেটা নিয়ে খেলুন'}
            </h1>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              {lang === 'en'
                ? 'type a place, pick from the dropdowns, or click anywhere on the map.'
                : 'যেকোনো জায়গা লিখুন, ড্রপডাউন থেকে বাছুন, বা ম্যাপে ক্লিক করুন।'}
            </p>
          </div>
        </div>

        {/* 5-Column Grid Layout: 2 Cols Form/Cards, 3 Cols Map */}
        <div className="grid gap-6 lg:grid-cols-5">
          {/* Controls Column */}
          <div className="space-y-5 lg:col-span-2">
            <SearchBar onSelect={onSearchSelect} lang={lang} />
            <Cascade
              divisionId={divisionId}
              districtId={districtId}
              upazilaId={upazilaId}
              lang={lang}
              onChange={({ divisionId: d, districtId: dt, upazilaId: u }) => {
                setDivisionId(d);
                setDistrictId(dt);
                setUpazilaId(u);
                setSearchHit(null);
              }}
            />
            {cardJson ? (
              <LocationCard
                title={cardTitle}
                subtitle={cardSubtitle}
                badge={cardBadge}
                accent={cardAccent}
                json={cardJson}
                lang={lang}
              />
            ) : (
              <div className="flex items-start gap-3 rounded-3xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/40 p-6 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                <span>{T.empty[lang]}</span>
              </div>
            )}
          </div>

          {/* Interactive Map Column */}
          <div className="relative w-full h-[560px] lg:h-[720px] overflow-hidden rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-900/5 lg:col-span-3">
            <BangladeshMap
              flyTo={flyTo}
              selectedUpazilaId={upazilaId}
              onUpazilaClick={onUpazilaClick}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-zinc-200 dark:border-zinc-800/80 pt-6 pb-2">
        <div className="flex flex-col items-start justify-between gap-2 text-[11px] text-zinc-500 dark:text-zinc-400 sm:flex-row sm:items-center">
          <p>
            {T.footerLeft[lang]}
            <a
              href="https://x.com/merxodev"
              target="_blank"
              rel="noreferrer"
              className="text-zinc-900 dark:text-white font-medium underline decoration-emerald-300 dark:decoration-emerald-500 underline-offset-2 hover:decoration-emerald-600"
            >
              {lang === 'en' ? 'Alamin Islam' : 'আলামিন ইসলাম'}
            </a>{' '}
            ·{' '}
            <a
              href="https://x.com/merxodev"
              target="_blank"
              rel="noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              @alaminislam3203
            </a>
          </p>
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{T.footerRight[lang]}</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ==========================================================================
   Subcomponents (SearchBar, Cascade, LocationCard)
   ========================================================================== */

const TYPE_TINT = {
  division: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  district: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  upazila: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
  postcode: 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700',
};

function SearchBar({ onSelect, lang }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const hits = useMemo(() => (query ? searchGeo(query, 12) : []), [query]);

  useEffect(() => {
    function onClick(e) {
      if (!wrapRef.current) return;
      if (!wrapRef.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={wrapRef} className="relative w-full">
      <div className="relative">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          placeholder={T.searchPh[lang]}
          className="w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-3.5 pl-11 pr-4 text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 dark:placeholder:text-zinc-500 shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
        />
      </div>

      {open && hits.length > 0 && (
        <ul className="absolute z-30 mt-2 max-h-96 w-full overflow-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 py-1.5 shadow-2xl backdrop-blur-xl">
          {hits.map((h, i) => {
            const data = h.data;
            const primary =
              h.type === 'postcode'
                ? `${data.postOffice} · ${data.postCode}`
                : nameOf(data, lang);
            const secondary =
              h.type === 'postcode'
                ? `Upazila: ${data.upazila}`
                : lang === 'en'
                  ? data.bn_name ?? ''
                  : data.name ?? '';

            return (
              <li key={`${h.type}-${i}`}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800/70 transition-colors cursor-pointer"
                  onClick={() => {
                    onSelect(h);
                    setOpen(false);
                    setQuery('');
                  }}
                >
                  <span className="min-w-0 truncate">
                    <span className="font-medium text-zinc-900 dark:text-white">{primary}</span>
                    {secondary && (
                      <span className="ml-2 text-xs text-zinc-400 dark:text-zinc-500">{secondary}</span>
                    )}
                  </span>
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide ${TYPE_TINT[h.type]}`}>
                    {T[h.type][lang]}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function Cascade({ divisionId, districtId, upazilaId, onChange, lang }) {
  const filteredDistricts = useMemo(
    () => (divisionId ? districts.filter((d) => String(d.division_id) === String(divisionId)) : []),
    [divisionId]
  );
  const filteredUpazilas = useMemo(
    () => (districtId ? upazilas.filter((u) => String(u.district_id) === String(districtId)) : []),
    [districtId]
  );

  return (
    <div className="grid gap-2.5 sm:grid-cols-3">
      <Select
        accent="mint"
        label={T.division[lang]}
        value={divisionId}
        onChange={(v) => onChange({ divisionId: v, districtId: '', upazilaId: '' })}
        options={divisions.map((d) => ({ value: String(d.id), label: nameOf(d, lang) }))}
        placeholder={T.allDivisions[lang]}
      />
      <Select
        accent="peach"
        label={T.district[lang]}
        value={districtId}
        disabled={!divisionId}
        onChange={(v) => onChange({ divisionId, districtId: v, upazilaId: '' })}
        options={filteredDistricts.map((d) => ({ value: String(d.id), label: nameOf(d, lang) }))}
        placeholder={divisionId ? T.allDistricts[lang] : '—'}
      />
      <Select
        accent="rose"
        label={T.upazila[lang]}
        value={upazilaId}
        disabled={!districtId}
        onChange={(v) => onChange({ divisionId, districtId, upazilaId: v })}
        options={filteredUpazilas.map((u) => ({ value: String(u.id), label: nameOf(u, lang) }))}
        placeholder={districtId ? T.allUpazilas[lang] : '—'}
      />
    </div>
  );
}

const ACCENT_DOT = {
  mint: 'bg-emerald-500',
  peach: 'bg-amber-500',
  rose: 'bg-rose-500',
};

function Select({ label, value, onChange, options, placeholder, disabled, accent }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-400 dark:text-zinc-500">
        <span className={`h-1.5 w-1.5 rounded-full ${ACCENT_DOT[accent]}`} />
        {label}
      </span>
      <div className="relative">
        <select
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-3.5 py-2.5 pr-8 text-xs text-zinc-900 dark:text-white shadow-sm transition-all focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 disabled:bg-zinc-50 dark:disabled:bg-zinc-800/40 disabled:text-zinc-400 dark:disabled:text-zinc-600 cursor-pointer disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}

const ACCENT_CARD_BG = {
  mint: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
  peach: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20',
  rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20',
};

function LocationCard({ title, subtitle, badge, accent, json, lang }) {
  const [copied, setCopied] = useState(false);
  const text = JSON.stringify(json, null, 2);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard fallback */
    }
  };

  return (
    <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-lg shadow-zinc-900/5 transition-all">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] ${ACCENT_CARD_BG[accent]}`}
          >
            {badge}
          </span>
          <h2 className="mt-2.5 truncate text-xl font-bold tracking-tight text-zinc-900 dark:text-white font-exo-medium">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-0.5">{subtitle}</p>
          )}
        </div>
        <button
          type="button"
          onClick={onCopy}
          className="shrink-0 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800 px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.1em] text-zinc-700 dark:text-zinc-300 transition-all hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer shadow-sm active:scale-95"
        >
          {copied ? T.copied[lang] : T.copy[lang]}
        </button>
      </div>

      <pre className="mt-4 max-h-72 overflow-auto rounded-2xl bg-zinc-50 dark:bg-zinc-950 p-4 font-mono text-[11px] leading-relaxed text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-800/80">
        {text}
      </pre>
    </div>
  );
}
