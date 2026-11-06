"use client";

/**
 * Generates and opens a print-ready Official White-Background PDF Invoice
 * featuring MerxoDev Solutions logo.png and favicon.png, project milestones, and billing summary.
 */
export function downloadOfficialInvoice(project = {}) {
  if (typeof window === "undefined") return;

  const id = project.id || "MD-0000";
  const clientName = project.clientName || "Valued Client";
  const clientEmail = project.clientEmail || "";
  const clientPhone = project.clientPhone || "";
  const projectTitle = project.projectTitle || "Custom Digital Project";
  const serviceType = project.serviceType || "Custom Web Development";
  const invoiceAmount = project.invoiceAmount || project.budget || "As Agreed";
  const invoiceStatus = String(project.invoiceStatus || "UNPAID").toUpperCase();
  const progress = Number(project.progress ?? 0);
  const issueDate = project.updatedAt
    ? new Date(project.updatedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

  const m = project.milestones || {};
  const isPaid = invoiceStatus === "PAID";
  const isPartial = invoiceStatus === "PARTIAL";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Invoice_${id}_MerxoDev_Solutions</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 36px 20px;
      background: #f8fafc;
      font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif;
      color: #0f172a;
    }
    .invoice-sheet {
      max-width: 780px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
    }
    .top-bar {
      height: 8px;
      background: linear-gradient(90deg, #f97316 0%, #7c3aed 55%, #06b6d4 100%);
    }
    .header {
      padding: 36px 42px 28px;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #f1f5f9;
    }
    .brand-row {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 10px;
    }
    .fav-badge {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: linear-gradient(135deg, #f97316, #ea580c);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 7px;
    }
    .status-pill {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 800;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background: ${isPaid ? "#dcfce7" : isPartial ? "#fef3c7" : "#fee2e2"};
      color: ${isPaid ? "#15803d" : isPartial ? "#b45309" : "#b91c1c"};
      border: 1px solid ${isPaid ? "#86efac" : isPartial ? "#fde68a" : "#fecaca"};
    }
    .body {
      padding: 32px 42px;
    }
    .meta-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 24px;
      margin-bottom: 30px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px 24px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 28px;
    }
    th {
      text-align: left;
      padding: 12px 14px;
      background: #f1f5f9;
      font-size: 11.5px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #475569;
      border-bottom: 1px solid #cbd5e1;
    }
    td {
      padding: 14px;
      border-bottom: 1px solid #f1f5f9;
      font-size: 14px;
      color: #1e293b;
    }
    .total-box {
      display: flex;
      justify-content: flex-end;
      margin-top: 12px;
    }
    .total-card {
      width: 300px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 18px 22px;
    }
    .footer {
      padding: 24px 42px;
      background: #f8fafc;
      border-top: 1px solid #e2e8f0;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #64748b;
    }
    .no-print {
      max-width: 780px;
      margin: 0 auto 16px;
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
    .btn {
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 700;
      border: none;
      cursor: pointer;
      background: linear-gradient(135deg, #f97316, #7c3aed);
      color: #fff;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .invoice-sheet { box-shadow: none; border: none; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="no-print">
    <button class="btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>

  <div class="invoice-sheet">
    <div class="top-bar"></div>
    <div class="header">
      <div>
        <div class="brand-row">
          <div class="fav-badge">
            <img src="${window.location.origin}/favicon-with-bg.png" width="28" height="28" alt="MerxoDev" />
          </div>
          <img src="${window.location.origin}/logo.png" height="36" alt="MerxoDev Solutions" />
        </div>
        <div style="font-size:12.5px;color:#64748b;line-height:1.6;">
          <strong>MerxoDev Solutions</strong><br />
          Rangpur, Bangladesh • +880 1313-334279<br />
          merxodevsolutions@gmail.com • merxodevsolutions.pro.bd
        </div>
      </div>

      <div style="text-align:right;">
        <div style="font-size:11px;font-weight:800;color:#7c3aed;letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">
          OFFICIAL INVOICE &amp; STATEMENT
        </div>
        <div style="font-size:24px;font-weight:800;color:#0f172a;margin-bottom:8px;">
          #${id}
        </div>
        <div class="status-pill">${invoiceStatus}</div>
        <div style="font-size:12px;color:#64748b;margin-top:8px;">
          Date: <strong>${issueDate}</strong>
        </div>
      </div>
    </div>

    <div class="body">
      <div class="meta-grid">
        <div>
          <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:6px;">
            Billed To Client
          </div>
          <div style="font-size:16px;font-weight:800;color:#0f172a;">${clientName}</div>
          ${clientEmail ? `<div style="font-size:13px;color:#475569;margin-top:3px;">${clientEmail}</div>` : ""}
          ${clientPhone ? `<div style="font-size:13px;color:#475569;margin-top:2px;">${clientPhone}</div>` : ""}
        </div>
        <div>
          <div style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1.2px;margin-bottom:6px;">
            Project Summary
          </div>
          <div style="font-size:15px;font-weight:800;color:#0f172a;">${projectTitle}</div>
          <div style="font-size:13px;color:#475569;margin-top:3px;">Category: ${serviceType}</div>
          <div style="font-size:13px;color:#7c3aed;font-weight:700;margin-top:3px;">Completion Progress: ${progress}%</div>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Description / Milestone</th>
            <th>Category</th>
            <th>Progress</th>
            <th style="text-align:right;">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <strong>${projectTitle}</strong><br />
              <span style="font-size:12px;color:#64748b;">
                Full-Stack Engineering (UI/UX: ${Number(m.uiDesign ?? 100)}%, Frontend: ${Number(m.frontend ?? 0)}%, Backend: ${Number(m.backend ?? 0)}%, Deployment: ${Number(m.deployment ?? 0)}%)
              </span>
            </td>
            <td>${serviceType}</td>
            <td><strong>${progress}%</strong></td>
            <td style="text-align:right;font-weight:800;font-size:15px;">${invoiceAmount}</td>
          </tr>
        </tbody>
      </table>

      <div class="total-box">
        <div class="total-card">
          <div style="display:flex;justify-content:space-between;font-size:13px;color:#64748b;margin-bottom:8px;">
            <span>Payment Status:</span>
            <strong style="color:${isPaid ? "#15803d" : "#ea580c"};">${invoiceStatus}</strong>
          </div>
          <div style="display:flex;justify-content:space-between;font-size:17px;font-weight:800;color:#0f172a;border-top:1px solid #cbd5e1;padding-top:10px;">
            <span>Total Invoice:</span>
            <span style="color:#ea580c;">${invoiceAmount}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="footer">
      <div>Thank you for partnering with <strong>MerxoDev Solutions</strong>!</div>
      <div>Verified Digital Invoice • merxodevsolutions.pro.bd</div>
    </div>
  </div>
  <script>
    window.onload = function() {
      setTimeout(function() { window.print(); }, 350);
    };
  </script>
</body>
</html>`;

  const win = window.open("", "_blank");
  if (win) {
    win.document.open();
    win.document.write(html);
    win.document.close();
  }
}

/**
 * Universal One-Click CSV / JSON Exporter for Admin Panel tables
 */
export function exportRecordsToFile(records = [], filenameBase = "merxodev_export", format = "csv") {
  if (typeof window === "undefined" || !Array.isArray(records) || records.length === 0) return;

  const dateStamp = new Date().toISOString().slice(0, 10);
  if (format === "json") {
    const blob = new Blob([JSON.stringify(records, null, 2)], {
      type: "application/json;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filenameBase}_${dateStamp}.json`;
    a.click();
    URL.revokeObjectURL(url);
    return;
  }

  // CSV Export
  const keys = Array.from(
    records.reduce((acc, row) => {
      if (row && typeof row === "object") {
        Object.keys(row).forEach((k) => acc.add(k));
      }
      return acc;
    }, new Set())
  );

  const escapeCsv = (val) => {
    if (val === null || val === undefined) return "";
    const str = typeof val === "object" ? JSON.stringify(val) : String(val);
    if (/[",\n\r]/.test(str)) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const csvRows = [
    keys.join(","),
    ...records.map((r) => keys.map((k) => escapeCsv(r[k])).join(",")),
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${filenameBase}_${dateStamp}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

