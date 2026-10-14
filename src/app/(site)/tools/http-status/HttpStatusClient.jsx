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
