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