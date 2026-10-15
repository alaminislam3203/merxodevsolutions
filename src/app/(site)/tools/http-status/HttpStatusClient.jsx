'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiZap,
  FiSearch,
  FiX,
  FiCopy,
  FiCheck,
  FiArrowLeft,
  FiChevronDown,
  FiChevronUp,
  FiInfo,
  FiAlertTriangle,
  FiCheckCircle,
} from 'react-icons/fi';

const HTTP_CODES = [
  // 1xx
  { code: 100, phrase: 'Continue', category: '1xx', summary: 'Server has received the request headers and client should proceed to send body.', fix: 'Ensure client is waiting for server readiness before streaming large upload bodies.' },
  { code: 101, phrase: 'Switching Protocols', category: '1xx', summary: 'Requester has asked the server to switch protocols (e.g. WebSocket handshake).', fix: 'Normal response when establishing real-time WebSockets via Upgrade header.' },

  // 2xx
  { code: 200, phrase: 'OK', category: '2xx', summary: 'Standard response for successful HTTP requests.', fix: 'Expected standard response payload returned successfully.' },
  { code: 201, phrase: 'Created', category: '2xx', summary: 'The request succeeded and a new resource was successfully created.', fix: 'Ideal response for POST or PUT creation endpoints; often includes Location header.' },
  { code: 202, phrase: 'Accepted', category: '2xx', summary: 'The request has been accepted for processing, but processing is not yet complete.', fix: 'Used for asynchronous background jobs or queue processing workflows.' },
  { code: 204, phrase: 'No Content', category: '2xx', summary: 'Server successfully processed the request and is not returning any content.', fix: 'Standard response for successful DELETE actions or PUT updates with no payload.' },
  { code: 206, phrase: 'Partial Content', category: '2xx', summary: 'Server is delivering only part of the resource due to a Range header sent by client.', fix: 'Used for video/audio streaming or resumable file downloads.' },

  // 3xx
  { code: 301, phrase: 'Moved Permanently', category: '3xx', summary: 'The target resource has been assigned a new permanent URI.', fix: 'Update bookmarks, search engine index, and frontend links to the new Location.' },
  { code: 302, phrase: 'Found (Temporary Redirect)', category: '3xx', summary: 'The target resource resides temporarily under a different URI.', fix: 'Client should continue using original URI for future requests.' },
  { code: 304, phrase: 'Not Modified', category: '3xx', summary: 'Resource has not been modified since the version specified in If-Modified-Since header.', fix: 'Client should safely load cached asset from local browser cache, saving bandwidth.' },
  { code: 307, phrase: 'Temporary Redirect', category: '3xx', summary: 'Same as 302, but guarantees the HTTP request method (e.g. POST) is not changed.', fix: 'Ensures POST request body is retransmitted without converting to GET.' },
  { code: 308, phrase: 'Permanent Redirect', category: '3xx', summary: 'Same as 301, but guarantees the HTTP method will not change.', fix: 'Permanent redirect preserving original HTTP method and body.' },

  // 4xx
  { code: 400, phrase: 'Bad Request', category: '4xx', summary: 'The server cannot or will not process request due to an apparent client error.', fix: 'Verify query parameters, JSON payload syntax, and required headers in request.' },
  { code: 401, phrase: 'Unauthorized', category: '4xx', summary: 'Authentication is required and has failed or has not yet been provided.', fix: 'Pass a valid Authorization Bearer token or check cookie session expiration.' },
  { code: 403, phrase: 'Forbidden', category: '4xx', summary: 'The request was valid, but the server is refusing action (insufficient permissions).', fix: 'User is authenticated but lacks required RBAC role or resource ownership.' },
  { code: 404, phrase: 'Not Found', category: '4xx', summary: 'The requested resource could not be found on the server.', fix: 'Check URL endpoint spelling, router parameters, and database query ID.' },
  { code: 405, phrase: 'Method Not Allowed', category: '4xx', summary: 'A request method is not supported for the requested resource.', fix: 'Ensure you are calling POST/GET on routes that explicitly define those methods.' },
  { code: 408, phrase: 'Request Timeout', category: '4xx', summary: 'The server timed out waiting for the client to send the request.', fix: 'Check network latency or client connection stability during uploads.' },
  { code: 409, phrase: 'Conflict', category: '4xx', summary: 'Request could not be processed because of conflict in current state of resource.', fix: 'Occurs on duplicate unique keys (e.g. email already exists) or concurrent edits.' },
  { code: 422, phrase: 'Unprocessable Entity', category: '4xx', summary: 'Request was well-formed but was unable to be followed due to semantic errors.', fix: 'Common in validation libraries (Zod, Joi) when fields fail regex or type rules.' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx', summary: 'The user has sent too many requests in a given amount of time (Rate Limiting).', fix: 'Inspect Retry-After header and implement exponential backoff on client side.' },

  // 5xx
  { code: 500, phrase: 'Internal Server Error', category: '5xx', summary: 'A generic error message, given when an unexpected condition was encountered.', fix: 'Inspect backend error logs, uncaught exceptions, and unhandled promise rejections.' },
  { code: 501, phrase: 'Not Implemented', category: '5xx', summary: 'The server either does not recognize the request method, or lacks ability to fulfill.', fix: 'Feature or HTTP method has not been implemented by the server handler.' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx', summary: 'The server, while acting as a gateway or proxy, received an invalid response.', fix: 'Check upstream app process (Node.js/PM2/Docker) or Nginx reverse proxy configuration.' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx', summary: 'The server cannot handle request due to temporary overloading or maintenance.', fix: 'Check CPU/memory exhaustion, scale container instances, or verify database limits.' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx', summary: 'The server acting as a gateway or proxy did not receive a timely response.', fix: 'Increase proxy_read_timeout in Nginx or optimize long-running SQL database queries.' },
];

const CATEGORY_COLORS = {
  '1xx': 'bg-blue-100 text-blue-800 dark:bg-blue-950/80 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  '2xx': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  '3xx': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/80 dark:text-cyan-300 border-cyan-200 dark:border-cyan-800',
  '4xx': 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  '5xx': 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300 border-rose-200 dark:border-rose-800',
};

export default function HttpStatusClient() {
  const [activeCat, setActiveCat] = useState('All');
  const [search, setSearch] = useState('');
  const [expandedCode, setExpandedCode] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const filteredCodes = useMemo(() => {
    return HTTP_CODES.filter((c) => {
      const matchCat = activeCat === 'All' || c.category === activeCat;
      const q = search.toLowerCase().trim();
      const matchSearch =
        !q ||
        c.code.toString().includes(q) ||
        c.phrase.toLowerCase().includes(q) ||
        c.summary.toLowerCase().includes(q) ||
        c.fix.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  }, [activeCat, search]);

  const handleCopy = (c) => {
    const text = `${c.code} ${c.phrase} — ${c.summary}`;
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopiedCode(c.code);
        toast.success(`Copied ${c.code} ${c.phrase}!`);
        setTimeout(() => setCopiedCode(null), 1500);
      });
    }
  };

  return (
    <div className="min-h-screen pb-24 overflow-hidden pt-4 sm:pt-6 mt-8">
      {/* Background ambient lighting */}
      <div
        aria-hidden
        className="pointer-events-none fixed -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none fixed -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #3b82f6, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <nav aria-label="Breadcrumb" className="pt-2 flex items-center gap-2 text-xs font-exo-extralight text-zinc-400 dark:text-zinc-600">
          <Link href="/" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Home
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <Link href="/tools" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            Tools
          </Link>
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="9 18 15 12 9 6" />
          </svg>
          <span className="text-zinc-700 dark:text-zinc-300 font-semibold">HTTP Status Codes Guide</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 font-exo-extralight uppercase tracking-widest">
                <FiZap className="w-3.5 h-3.5" />
                REST API & Web Protocols
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700">
                <FiInfo className="w-3 h-3 text-amber-500" />
                Developer Troubleshooting Guide
              </span>
            </div>

            <h1 className="font-exo-medium text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#27003B] dark:text-white uppercase tracking-tight">
              HTTP Status Codes{' '}
              <span className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 bg-clip-text text-transparent">
                Reference
              </span>
            </h1>
            <p className="max-w-xl text-zinc-500 dark:text-zinc-400 text-xs sm:text-sm mt-1.5 font-exo-extralight">
              Comprehensive and searchable cheatsheet of HTTP response status codes with official specifications, common causes, and developer solutions.
            </p>
          </div>

          <Link
            href="/tools"
            className="self-start md:self-auto inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 text-xs font-bold uppercase tracking-wider font-exo-extralight transition-all shadow-sm"
          >
            <FiArrowLeft className="w-3.5 h-3.5" />
            All Tools
          </Link>
        </div>

        {/* Toolbar: Search & Category Pills */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 mb-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="relative flex-1 max-w-md">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by code (404, 500) or keyword (auth, redirect)..."
              className="w-full pl-10 pr-9 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
              >
                <FiX className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {['All', '1xx', '2xx', '3xx', '4xx', '5xx'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold font-exo-extralight uppercase transition-all ${activeCat === cat
                  ? 'bg-amber-500 text-white shadow-sm'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Status Codes Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCodes.map((item) => {
            const isExpanded = expandedCode === item.code;
            const badgeClass = CATEGORY_COLORS[item.category] || 'bg-zinc-100 text-zinc-800';

            return (
              <div
                key={item.code}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 shadow-sm hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-2xl font-black text-zinc-900 dark:text-white">
                      {item.code}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border ${badgeClass}`}>
                      {item.category}
                    </span>
                  </div>

                  <h3 className="font-exo-medium text-base font-bold text-zinc-800 dark:text-zinc-100 mb-2">
                    {item.phrase}
                  </h3>

                  <p className="text-xs text-zinc-600 dark:text-zinc-400 font-exo-extralight leading-relaxed mb-3">
                    {item.summary}
                  </p>

                  {/* Expandable Fix Info */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 text-xs font-exo-extralight animate-fadeIn">
                      <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider block mb-1">
                        Developer Troubleshooting:
                      </span>
                      <p className="text-zinc-500 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/60 p-2.5 rounded-xl border border-zinc-100 dark:border-zinc-700/60">
                        {item.fix}
                      </p>
                    </div>
                  )}
                </div>

                <div className="pt-3 mt-3 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-xs font-exo-extralight">
                  <button
                    onClick={() => setExpandedCode(isExpanded ? null : item.code)}
                    className="text-amber-600 hover:text-amber-700 font-bold flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Less Info' : 'Fix & Details'}</span>
                    {isExpanded ? <FiChevronUp className="w-3.5 h-3.5" /> : <FiChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  <button
                    onClick={() => handleCopy(item)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Copy code details"
                  >
                    {copiedCode === item.code ? <FiCheck className="text-emerald-500 w-4 h-4" /> : <FiCopy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
