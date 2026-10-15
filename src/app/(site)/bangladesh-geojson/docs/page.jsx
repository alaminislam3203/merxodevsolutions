'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  FiBookOpen,
  FiCode,
  FiCopy,
  FiCheck,
  FiLayers,
  FiDownload,
  FiExternalLink,
  FiCheckCircle,
  FiAlertCircle,
} from 'react-icons/fi';
import toast from 'react-hot-toast';

const API_METHODS = [
  {
    fn: 'getDivisions()',
    returns: 'Division[]',
    desc: 'Returns all 8 administrative divisions of Bangladesh with IDs, names (EN + বাংলা), and geographic centers.',
    snippet: `import bd from 'bangladesh-geojson';
const divisions = bd.getDivisions();
console.log(divisions);
// [{ id: '1', name: 'Barishal', bn_name: 'বরিশাল', lat: '22.7010', long: '90.3535' }, ...]`,
  },
  {
    fn: 'getDivisionById(id)',
    returns: 'Division | undefined',
    desc: 'Finds a specific division by its numeric string ID (1 through 8).',
    snippet: `const dhaka = bd.getDivisionById('3');`,
  },
  {
    fn: 'getDistricts()',
    returns: 'District[]',
    desc: 'Returns all 64 districts with division mapping and coordinates.',
    snippet: `const allDistricts = bd.getDistricts();`,
  },
  {
    fn: 'getDistrictsByDivision(divisionId)',
    returns: 'District[]',
    desc: 'Returns all districts within a specified division ID.',
    snippet: `// All districts in Rangpur Division (id: '7')
const rangpurDistricts = bd.getDistrictsByDivision('7');`,
  },
  {
    fn: 'getUpazilas()',
    returns: 'Upazila[]',
    desc: 'Returns all 494+ upazilas across Bangladesh mapped to districts.',
    snippet: `const allUpazilas = bd.getUpazilas();`,
  },
  {
    fn: 'getUpazilasByDistrict(districtId)',
    returns: 'Upazila[]',
    desc: 'Returns all upazilas inside a target district ID.',
    snippet: `// Upazilas in Bogura (districtId: '3')
const upazilas = bd.getUpazilasByDistrict('3');`,
  },
  {
    fn: 'getPostcodes()',
    returns: 'Postcode[]',
    desc: 'Returns all 1,349+ post office entries with 4-digit post codes.',
    snippet: `const postcodes = bd.getPostcodes();`,
  },
  {
    fn: 'getPostcodesByDistrict(districtId)',
    returns: 'Postcode[]',
    desc: 'Returns all post offices and postal codes belonging to a specific district.',
    snippet: `const dhakaPostcodes = bd.getPostcodesByDistrict('1');`,
  },
  {
    fn: 'search(query)',
    returns: 'SearchResult[]',
    desc: 'Deep bilingual search across division names, district names, upazila names, and postcodes/post offices.',
    snippet: `const matches = bd.search('Mirpur');
// or Bangla search:
const banglaMatches = bd.search('কুড়িগ্রাম');`,
  },
  {
    fn: 'getFullHierarchy()',
    returns: 'HierarchyDivision[]',
    desc: 'Returns a nested tree where each division contains its districts, and each district contains its upazilas.',
    snippet: `const tree = bd.getFullHierarchy();`,
  },
];

export default function BangladeshGeoDocsPage() {
  const [copiedId, setCopiedId] = useState('');

  const copyCode = (code, id) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    toast.success('Snippet copied to clipboard!');
    setTimeout(() => setCopiedId(''), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
      {/* Sticky Table of Contents Sidebar */}
      <aside className="lg:col-span-3 lg:sticky lg:top-28 space-y-4 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-xs">
        <div className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-[11px]">
          Table of Contents
        </div>
        <nav className="space-y-1.5 font-exo">
          {[
            { label: '1. Getting Started', href: '#getting-started' },
            { label: '2. Data Models (TypeScript)', href: '#data-models' },
            { label: '3. Core API Functions', href: '#api-functions' },
            { label: '4. Direct Raw JSON Imports', href: '#raw-json' },
            { label: '5. React Cascade Component', href: '#react-example' },
            { label: '6. Licenses & Attribution', href: '#license' },
          ].map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="block py-1.5 px-2.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-colors font-medium"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <Link
            href="/bangladesh-geojson/demo"
            className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-center transition-colors"
          >
            <span>Open Live Demo</span>
          </Link>
        </div>
      </aside>

      {/* Main Documentation Body */}
      <div className="lg:col-span-9 space-y-12">
        {/* 1. Getting Started */}
        <section id="getting-started" className="scroll-mt-32 space-y-4">
          <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white flex items-center gap-2">
            <span>1. Getting Started</span>
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
            The <code className="text-emerald-600 dark:text-emerald-400 font-mono">bangladesh-geojson</code> library is zero-dependency, works seamlessly in Node.js, Next.js, Vite, and React, and ships with complete TypeScript type definitions.
          </p>

          <div className="p-4 rounded-xl bg-zinc-950 text-white font-mono text-xs flex items-center justify-between border border-zinc-800">
            <span>npm install bangladesh-geojson</span>
            <button
              type="button"
              onClick={() => copyCode('npm install bangladesh-geojson', 'npm-install')}
              className="p-1.5 text-zinc-400 hover:text-emerald-400"
            >
              {copiedId === 'npm-install' ? <FiCheck className="w-4 h-4 text-emerald-400" /> : <FiCopy className="w-4 h-4" />}
            </button>
          </div>
        </section>

        {/* 2. Data Models */}
        <section id="data-models" className="scroll-mt-32 space-y-4">
          <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
            2. Data Models (TypeScript Interfaces)
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
            All records include both English and Bengali names along with geographic centers where applicable.
          </p>

          <div className="p-5 rounded-2xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800">
            <pre>
{`export interface Division {
  id: string;        // '1' - '8'
  name: string;      // 'Dhaka', 'Rangpur', etc.
  bn_name: string;   // 'ঢাকা', 'রংপুর', etc.
  lat: string;       // Geographic latitude
  long: string;      // Geographic longitude
}

export interface District {
  id: string;        // '1' - '64'
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  long: string;
}

export interface Upazila {
  id: string;        // '1' - '494'
  district_id: string;
  name: string;
  bn_name: string;
}

export interface Postcode {
  division_id: string;
  district_id: string;
  upazila: string;
  postOffice: string;
  postCode: string;  // e.g. '1212'
}`}
            </pre>
          </div>
        </section>

        {/* 3. API Functions */}
        <section id="api-functions" className="scroll-mt-32 space-y-6">
          <div>
            <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
              3. Core API Functions
            </h2>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight mt-1">
              Convenient helper methods exported by the root package.
            </p>
          </div>

          <div className="space-y-5">
            {API_METHODS.map((method, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400">
                      {method.fn}
                    </span>
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                      &rarr; {method.returns}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => copyCode(method.snippet, `fn-${idx}`)}
                    className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                  >
                    {copiedId === `fn-${idx}` ? <FiCheck className="w-3.5 h-3.5 text-emerald-500" /> : <FiCopy className="w-3.5 h-3.5" />}
                    <span>Copy</span>
                  </button>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight">
                  {method.desc}
                </p>

                <div className="p-3.5 rounded-xl bg-zinc-950 text-zinc-300 font-mono text-xs overflow-x-auto">
                  <pre>{method.snippet}</pre>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Direct Raw JSON Imports */}
        <section id="raw-json" className="scroll-mt-32 space-y-4">
          <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
            4. Direct Raw JSON Imports
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
            If you do not want to use helper methods, you can import the raw optimized datasets directly into your bundler:
          </p>

          <div className="p-4 rounded-xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800">
            <pre>
{`import divisions from 'bangladesh-geojson/divisions';
import districts from 'bangladesh-geojson/districts';
import upazilas from 'bangladesh-geojson/upazilas';
import postcodes from 'bangladesh-geojson/postcodes';
import boundary from 'bangladesh-geojson/boundary'; // 3.6MB GeoJSON
import dhaka from 'bangladesh-geojson/dhaka-city';`}
            </pre>
          </div>
        </section>

        {/* 5. React / Next.js Cascade Example */}
        <section id="react-example" className="scroll-mt-32 space-y-4">
          <h2 className="text-2xl font-bold font-exo-medium text-zinc-900 dark:text-white">
            5. React Address Cascading Example
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-exo-extralight">
            Here is a drop-in pattern to implement a Division &rarr; District &rarr; Upazila cascade in React:
          </p>

          <div className="p-4 rounded-xl bg-zinc-950 text-emerald-300 font-mono text-xs overflow-x-auto border border-zinc-800">
            <pre>
{`import { useState } from 'react';
import bd from 'bangladesh-geojson';

export default function ShippingAddressSelector() {
  const [divisionId, setDivisionId] = useState('');
  const [districtId, setDistrictId] = useState('');

  const divisions = bd.getDivisions();
  const districts = divisionId ? bd.getDistrictsByDivision(divisionId) : [];
  const upazilas = districtId ? bd.getUpazilasByDistrict(districtId) : [];

  return (
    <div className="grid grid-cols-3 gap-3">
      <select value={divisionId} onChange={(e) => setDivisionId(e.target.value)}>
        <option value="">Select Division</option>
        {divisions.map((d) => (
          <option key={d.id} value={d.id}>{d.name} ({d.bn_name})</option>
        ))}
      </select>

      <select value={districtId} onChange={(e) => setDistrictId(e.target.value)} disabled={!divisionId}>
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d.id} value={d.id}>{d.name} ({d.bn_name})</option>
        ))}
      </select>
    </div>
  );
}`}
            </pre>
          </div>
        </section>

        {/* 6. Licenses & Attribution */}
        <section id="license" className="scroll-mt-32 space-y-4 p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold font-exo-medium text-zinc-900 dark:text-white flex items-center gap-2">
            <FiCheckCircle className="text-emerald-500" />
            <span>6. Licenses &amp; OpenStreetMap Attribution</span>
          </h2>

          <div className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight space-y-2 leading-relaxed">
            <p>
              • <strong>Code &amp; Library:</strong> MIT License. Free for commercial and non-commercial projects.
            </p>
            <p>
              • <strong>Boundary Data:</strong> CC BY 4.0, sourced from geoBoundaries (gbOpen, ADM3). Underlying authority: Bangladesh Bureau of Statistics (BBS) / OCHA ROAP.
            </p>
            <p>
              • <strong>OSM-derived layers:</strong> Open Database License (ODbL 1.0). Attribution: <em>&copy; OpenStreetMap contributors &mdash; odbl-1.0</em>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
