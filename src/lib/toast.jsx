"use client";

import toast, { Toaster } from "react-hot-toast";
import {
  FiCheckCircle,
  FiAlertCircle,
  FiInfo,
  FiLock,
  FiLoader,
  FiAlertTriangle,
} from "react-icons/fi";

const baseStyle = {
  background: "rgba(15, 23, 42, 0.96)",
  backdropFilter: "blur(16px)",
  WebkitBackdropFilter: "blur(16px)",
  color: "#f8fafc",
  borderRadius: "14px",
  padding: "12px 18px",
  fontSize: "13.5px",
  fontWeight: "500",
  letterSpacing: "0.2px",
  boxShadow:
    "0 20px 35px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  display: "flex",
  alignItems: "center",
  gap: "10px",
  maxWidth: "420px",
};

/**
 * Interactive react-hot-toast confirmation modal.
 * Returns a Promise that resolves to true (confirmed) or false (cancelled).
 */
export function confirmToast(message, options = {}) {
  return new Promise((resolve) => {
    toast(
      (t) => (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            width: "100%",
            minWidth: "260px",
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: "10px" }}>
            <FiAlertTriangle
              size={20}
              style={{ color: "#f59e0b", flexShrink: 0, marginTop: "2px" }}
            />
            <div
              style={{
                fontSize: "13.5px",
                color: "#f1f5f9",
                fontWeight: 500,
                lineHeight: 1.45,
              }}
            >
              {message}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: "8px",
              marginTop: "4px",
            }}
          >
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(false);
              }}
              style={{
                padding: "6px 14px",
                borderRadius: "8px",
                background: "rgba(255, 255, 255, 0.08)",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                color: "#cbd5e1",
                fontSize: "12.5px",
                cursor: "pointer",
                fontWeight: 500,
                transition: "all 0.15s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.14)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.08)")
              }
            >
              {options.cancelText || "Cancel"}
            </button>
            <button
              type="button"
              onClick={() => {
                toast.dismiss(t.id);
                resolve(true);
              }}
              style={{
                padding: "6px 16px",
                borderRadius: "8px",
                background:
                  options.danger !== false
                    ? "linear-gradient(135deg, #ef4444, #dc2626)"
                    : "linear-gradient(135deg, #6366f1, #8b5cf6)",
                border: "none",
                color: "#ffffff",
                fontSize: "12.5px",
                cursor: "pointer",
                fontWeight: 600,
                boxShadow:
                  options.danger !== false
                    ? "0 4px 14px rgba(239, 68, 68, 0.4)"
                    : "0 4px 14px rgba(99, 102, 241, 0.4)",
                transition: "transform 0.15s ease",
              }}
            >
              {options.confirmText || (options.danger !== false ? "Confirm" : "OK")}
            </button>
          </div>
        </div>
      ),
      {
        duration: options.duration || 15000,
        style: {
          ...baseStyle,
          border: "1px solid rgba(245, 158, 11, 0.35)",
          boxShadow:
            "0 24px 50px -10px rgba(0, 0, 0, 0.85), 0 0 24px rgba(245, 158, 11, 0.15)",
          maxWidth: "440px",
          padding: "16px 20px",
        },
      }
    );
  });
}

/**
 * Global showToast function and helpers
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

showToast.confirm = confirmToast;
showToast.dismiss = (id) => toast.dismiss(id);

/**
 * Global Toaster Component for Root Layout
 */
export function GlobalToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      containerStyle={{
        top: 24,
        right: 24,
        zIndex: 999999,
      }}
      toastOptions={{
        duration: 4500,
        style: baseStyle,
      }}
    />
  );
}

export default showToast;
