"use client";

import toast from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiLock,
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

/**
 * Callable showToast function that also has method helpers:
 * - showToast("Message", "success" | "error" | "info" | "lock")
 * - showToast.success("Message")
 * - showToast.error("Message")
 * - showToast.lock("Message")
 * - showToast.info("Message")
 * - showToast.loading("Message")
 */
export function showToast(message, type = "success", options = {}) {
  if (type === "error") {
    return showToast.error(message, options);
  }
  if (type === "lock") {
    return showToast.lock(message, options);
  }
  if (type === "info") {
    return showToast.info(message, options);
  }
  if (type === "loading") {
    return showToast.loading(message, options);
  }
  return showToast.success(message, options);
}

showToast.success = (message, options = {}) => {
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
};

showToast.error = (message, options = {}) => {
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
};

showToast.lock = (message, options = {}) => {
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
};

showToast.info = (message, options = {}) => {
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
};

showToast.loading = (message, options = {}) => {
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
};

showToast.dismiss = (id) => toast.dismiss(id);

export default showToast;
