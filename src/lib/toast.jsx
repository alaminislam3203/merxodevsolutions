"use client";

import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiLock,
  FiXCircle,
  FiLoader,
} from "react-icons/fi";

const baseStyle = {
  background: "rgba(15, 23, 42, 0.95)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  color: "#f8fafc",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "13.5px",
  fontWeight: "500",
  letterSpacing: "0.2px",
  boxShadow:
    "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  maxWidth: "420px",
};

export const showToast = {
  success: (message, options = {}) => {
    return toast.success(message, {
      icon: (
        <FiCheckCircle
          size={19}
          style={{ color: "#10b981", flexShrink: 0 }}
        />
      ),
      style: {
        ...baseStyle,
        border: "1px solid rgba(16, 185, 129, 0.35)",
        boxShadow:
          "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(16, 185, 129, 0.15)",
        ...(options.style || {}),
      },
      ...options,
    });
  },

  error: (message, options = {}) => {
    return toast.error(message, {
      icon: (
        <FiAlertCircle
          size={19}
          style={{ color: "#ef4444", flexShrink: 0 }}
        />
      ),
      style: {
        ...baseStyle,
        border: "1px solid rgba(239, 68, 68, 0.35)",
        boxShadow:
          "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(239, 68, 68, 0.15)",
        ...(options.style || {}),
      },
      ...options,
    });
  },

  lock: (message, options = {}) => {
    return toast.error(message, {
      icon: (
        <FiLock
          size={19}
          style={{ color: "#f59e0b", flexShrink: 0 }}
        />
      ),
      style: {
        ...baseStyle,
        border: "1px solid rgba(245, 158, 11, 0.35)",
        boxShadow:
          "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(245, 158, 11, 0.15)",
        ...(options.style || {}),
      },
      ...options,
    });
  },

  info: (message, options = {}) => {
    return toast(message, {
      icon: (
        <FiInfo
          size={19}
          style={{ color: "#6366f1", flexShrink: 0 }}
        />
      ),
      style: {
        ...baseStyle,
        border: "1px solid rgba(99, 102, 241, 0.35)",
        boxShadow:
          "0 20px 35px -8px rgba(0, 0, 0, 0.7), 0 0 20px rgba(99, 102, 241, 0.15)",
        ...(options.style || {}),
      },
      ...options,
    });
  },

  loading: (message, options = {}) => {
    return toast.loading(message, {
      icon: (
        <FiLoader
          size={19}
          className="animate-spin"
          style={{ color: "#a855f7", flexShrink: 0 }}
        />
      ),
      style: {
        ...baseStyle,
        border: "1px solid rgba(168, 85, 247, 0.35)",
        ...(options.style || {}),
      },
      ...options,
    });
  },

  dismiss: (id) => toast.dismiss(id),
};

export default showToast;
