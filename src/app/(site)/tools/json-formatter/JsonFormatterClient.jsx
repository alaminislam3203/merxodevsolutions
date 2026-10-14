'use client';

import { useState, useMemo, useRef } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import {
  FiCode,
  FiCopy,
  FiCheck,
  FiDownload,
  FiTrash2,
  FiUpload,
  FiZap,
  FiAlertCircle,
  FiCheckCircle,
  FiArrowLeft,
  FiMaximize2,
  FiMinimize2,
  FiLayers,
  FiFileText,
  FiRefreshCw,
  FiChevronDown,
  FiChevronRight,
  FiLock,
} from 'react-icons/fi';

const SAMPLE_JSON = JSON.stringify(