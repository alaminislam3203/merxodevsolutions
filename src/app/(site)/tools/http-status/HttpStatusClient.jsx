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