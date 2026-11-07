import path from "path";
import fs from "fs";
import nodemailer from "nodemailer";
import { Resend } from "resend";

const getSiteUrl = () => {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXTAUTH_URL;
  if (envUrl && !envUrl.includes("localhost") && !envUrl.includes("127.0.0.1")) {
    return envUrl.replace(/\/$/, "");
  }
  return "https://merxodevsolutions.pro.bd";
};

const SITE_URL = getSiteUrl();

/**
 * Returns Nodemailer CID inline attachments for public/logo.png and public/favicon.png
 * so Gmail, Outlook, and Apple Mail always display both images immediately.
 */
export function getBrandEmailAttachments() {
  const attachments = [];
  try {
    const logoPath = path.join(process.cwd(), "public", "logo.png");
    if (fs.existsSync(logoPath)) {
      attachments.push({
        filename: "logo.png",
        path: logoPath,
        cid: "merxodev_logo",
        contentDisposition: "inline",
      });
    }
  } catch {}

  try {
    const faviconPath = path.join(process.cwd(), "public", "favicon.png");
    if (fs.existsSync(faviconPath)) {
      attachments.push({
        filename: "favicon.png",
        path: faviconPath,
        cid: "merxodev_favicon",
        contentDisposition: "inline",
      });
    }
  } catch {}

  return attachments;
}

export function getBrandImageUrls(useCid = true) {
  const hasLogoFile = (() => {
    try {
      return fs.existsSync(path.join(process.cwd(), "public", "logo.png"));
    } catch {
      return false;
    }
  })();
  const hasFaviconFile = (() => {
    try {
      return fs.existsSync(path.join(process.cwd(), "public", "favicon.png"));
    } catch {
      return false;
    }
  })();

  return {
    logoSrc:
      useCid && hasLogoFile ? "cid:merxodev_logo" : `${SITE_URL}/logo.png`,
    faviconSrc:
      useCid && hasFaviconFile
        ? "cid:merxodev_favicon"
        : `${SITE_URL}/favicon.png`,
    siteUrl: SITE_URL,
  };
}

/**
 * Clean White-Background Security & OTP Email Template
 * Displays both favicon.png and logo.png in the header and footer.
 */
export function renderOtpSecurityEmail({
  title = "Security Verification",
  badgeText = "Account Security",
  recipientName = "Valued Client",
  introText = "Use the 6-digit verification code below to complete your request:",
  code = "000000",
  expiryMinutes = 2,
  footerWarning = "If you did not request this code, you can safely ignore this email.",
  useCid = true,
}) {
  const { logoSrc, faviconSrc, siteUrl } = getBrandImageUrls(useCid);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${title} — MerxoDev Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f8fafc;padding:36px 14px;">
    <tr>
      <td align="center">
        <table width="580" cellpadding="0" cellspacing="0" style="max-width:580px;width:100%;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:22px;overflow:hidden;box-shadow:0 12px 36px rgba(15,23,42,0.06);">

          <!-- Top Accent Bar -->
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#f97316 0%,#7c3aed 55%,#06b6d4 100%);"></td>
          </tr>

          <!-- White Brand Header with favicon.png + logo.png -->
          <tr>
            <td align="center" style="background-color:#ffffff;padding:32px 32px 22px;border-bottom:1px solid #f1f5f9;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
                <tr>
                  <td valign="middle" style="padding-right:12px;">
                    <div style="width:42px;height:42px;border-radius:12px;background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);padding:7px;box-sizing:border-box;box-shadow:0 4px 12px rgba(249,115,22,0.28);">
                      <img
                        src="${faviconSrc}"
                        width="28"
                        height="28"
                        alt="MerxoDev Icon"
                        style="display:block;width:28px;height:28px;object-fit:contain;border:0;"
                      />
                    </div>
                  </td>
                  <td valign="middle">
                    <img
                      src="${logoSrc}"
                      height="36"
                      alt="MerxoDev Solutions"
                      style="display:block;height:36px;width:auto;max-width:210px;object-fit:contain;border:0;"
                    />
                  </td>
                </tr>
              </table>

              <div style="display:inline-block;background-color:#f5f3ff;border:1px solid #ddd6fe;border-radius:999px;padding:6px 16px;margin-bottom:10px;">
                <span style="font-size:10.5px;font-weight:800;color:#6d28d9;letter-spacing:2px;text-transform:uppercase;">
                  ${badgeText}
                </span>
              </div>

              <h1 style="margin:0;font-size:22px;font-weight:800;color:#0f172a;letter-spacing:-0.2px;">
                ${title}
              </h1>
            </td>
          </tr>

          <!-- Main White Body -->
          <tr>
            <td style="background-color:#ffffff;padding:30px 36px;">
              <p style="margin:0 0 12px;font-size:15px;color:#0f172a;">
                Hello <strong>${recipientName}</strong>,
              </p>
              <p style="margin:0 0 24px;font-size:14px;color:#475569;line-height:1.65;">
                ${introText}
              </p>

              <!-- OTP Code Box on White/Light Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                <tr>
                  <td align="center" style="background-color:#f8fafc;border:2px dashed #7c3aed;border-radius:16px;padding:22px 20px;">
                    <div style="font-size:11px;font-weight:700;color:#64748b;letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">
                      Verification Code
                    </div>
                    <div style="font-size:34px;font-weight:800;letter-spacing:10px;color:#4f46e5;font-family:'Courier New',Courier,monospace;">
                      ${code}
                    </div>
                    <div style="margin-top:10px;font-size:12px;font-weight:600;color:#d97706;">
                      ⏱ This code will expire in <strong>${expiryMinutes} minutes</strong>.
                    </div>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:13px;color:#64748b;line-height:1.6;background-color:#f8fafc;border-left:4px solid #f97316;padding:12px 16px;border-radius:8px;">
                ${footerWarning}
              </p>
            </td>
          </tr>

          <!-- Clean White Footer with favicon.png & logo.png -->
          <tr>
            <td align="center" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 32px;">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto 10px;">
                <tr>
                  <td valign="middle" style="padding-right:8px;">
                    <div style="width:24px;height:24px;border-radius:7px;background:#f97316;padding:4px;box-sizing:border-box;">
                      <img
                        src="${faviconSrc}"
                        width="16"
                        height="16"
                        alt="MerxoDev"
                        style="display:block;width:16px;height:16px;object-fit:contain;border:0;"
                      />
                    </div>
                  </td>
                  <td valign="middle">
                    <img
                      src="${logoSrc}"
                      height="20"
                      alt="MerxoDev Solutions"
                      style="display:block;height:20px;width:auto;object-fit:contain;border:0;"
                    />
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;font-size:12px;color:#475569;font-weight:600;">
                © ${year} MerxoDev Solutions. All rights reserved.
              </p>
              <p style="margin:0;font-size:11.5px;color:#64748b;">
                Rangpur, Bangladesh • <a href="${siteUrl}" style="color:#7c3aed;text-decoration:none;font-weight:600;">merxodevsolutions.pro.bd</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Universal White-Background Brand Shell for all MerxoDev Agency Emails
 * Ensures both favicon.png (in orange badge) and logo.png render in header & footer.
 */
export function renderBrandCardEmail({
  title = "MerxoDev Solutions Update",
  badgeText = "Official Notification",
  badgeBg = "#fff7ed",
  badgeBorder = "#fed7aa",
  badgeColor = "#ea580c",
  subtitle = "",
  bodyHtml = "",
  ctaPrimary = null, // { label, url, bg }
  ctaSecondary = null, // { label, url }
  useCid = true,
}) {
  const { logoSrc, faviconSrc, siteUrl } = getBrandImageUrls(useCid);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${title} — MerxoDev Solutions</title>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;padding:36px 14px;">
    <tr>
      <td align="center">
        <table width="620" cellpadding="0" cellspacing="0" role="presentation" style="max-width:620px;width:100%;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:24px;overflow:hidden;box-shadow:0 16px 40px rgba(15,23,42,0.06);">

          <!-- Top Brand Accent Bar -->
          <tr>
            <td style="height:6px;background:linear-gradient(90deg,#f97316 0%,#7c3aed 52%,#06b6d4 100%);"></td>
          </tr>

          <!-- White Header with favicon.png + logo.png -->
          <tr>
            <td align="center" style="background-color:#ffffff;padding:34px 36px 24px;border-bottom:1px solid #f1f5f9;">
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto 18px;">
                <tr>
                  <td valign="middle" style="padding-right:12px;">
                    <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);padding:8px;box-sizing:border-box;box-shadow:0 6px 16px rgba(249,115,22,0.28);">
                      <img
                        src="${faviconSrc}"
                        width="28"
                        height="28"
                        alt="MerxoDev Icon"
                        style="display:block;width:28px;height:28px;object-fit:contain;border:0;"
                      />
                    </div>
                  </td>
                  <td valign="middle">
                    <img
                      src="${logoSrc}"
                      height="38"
                      alt="MerxoDev Solutions"
                      style="display:block;height:38px;width:auto;max-width:220px;object-fit:contain;border:0;"
                    />
                  </td>
                </tr>
              </table>

              <div style="display:inline-block;background-color:${badgeBg};border:1px solid ${badgeBorder};border-radius:999px;padding:6px 16px;margin-bottom:12px;">
                <span style="font-size:11px;font-weight:800;color:${badgeColor};letter-spacing:1.8px;text-transform:uppercase;">
                  ${badgeText}
                </span>
              </div>

              <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#0f172a;letter-spacing:-0.3px;line-height:1.3;">
                ${title}
              </h1>
              ${
                subtitle
                  ? `<p style="margin:0;font-size:14px;color:#64748b;max-width:480px;line-height:1.6;">${subtitle}</p>`
                  : ""
              }
            </td>
          </tr>

          <!-- Main Body -->
          <tr>
            <td style="background-color:#ffffff;padding:30px 36px 26px;">
              ${bodyHtml}

              ${
                ctaPrimary || ctaSecondary
                  ? `<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:24px;">
                      <tr>
                        <td align="center">
                          ${
                            ctaPrimary
                              ? `<a href="${ctaPrimary.url}" target="_blank" style="display:inline-block;background:${
                                  ctaPrimary.bg || "linear-gradient(135deg,#f97316 0%,#7c3aed 100%)"
                                };color:#ffffff;font-size:13.5px;font-weight:800;text-decoration:none;padding:13px 26px;border-radius:12px;margin:4px 6px;box-shadow:0 8px 20px rgba(124,58,237,0.22);">
                                  ${ctaPrimary.label}
                                </a>`
                              : ""
                          }
                          ${
                            ctaSecondary
                              ? `<a href="${ctaSecondary.url}" target="_blank" style="display:inline-block;background-color:#f8fafc;color:#0f172a;border:1px solid #cbd5e1;font-size:13.5px;font-weight:700;text-decoration:none;padding:12px 22px;border-radius:12px;margin:4px 6px;">
                                  ${ctaSecondary.label}
                                </a>`
                              : ""
                          }
                        </td>
                      </tr>
                    </table>`
                  : ""
              }
            </td>
          </tr>

          <!-- Clean White Footer with favicon.png & logo.png -->
          <tr>
            <td align="center" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 32px;">
              <table cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto 10px;">
                <tr>
                  <td valign="middle" style="padding-right:8px;">
                    <div style="width:24px;height:24px;border-radius:7px;background:#f97316;padding:4px;box-sizing:border-box;">
                      <img
                        src="${faviconSrc}"
                        width="16"
                        height="16"
                        alt="MerxoDev"
                        style="display:block;width:16px;height:16px;object-fit:contain;border:0;"
                      />
                    </div>
                  </td>
                  <td valign="middle">
                    <img
                      src="${logoSrc}"
                      height="20"
                      alt="MerxoDev Solutions"
                      style="display:block;height:20px;width:auto;object-fit:contain;border:0;"
                    />
                  </td>
                </tr>
              </table>

              <p style="margin:0 0 4px;font-size:12px;color:#475569;font-weight:600;">
                © ${year} MerxoDev Solutions. All rights reserved.
              </p>
              <p style="margin:0;font-size:11.5px;color:#64748b;">
                Rangpur, Bangladesh • <a href="${siteUrl}" style="color:#7c3aed;text-decoration:none;font-weight:600;">merxodevsolutions.pro.bd</a> • <a href="mailto:merxodevsolutions@gmail.com" style="color:#f97316;text-decoration:none;font-weight:600;">merxodevsolutions@gmail.com</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Unified non-blocking email sender with Resend + Gmail SMTP fallback
 * Always attaches logo.png and favicon.png inline for Nodemailer.
 */
export async function sendBrandEmail({
  to,
  subject,
  buildHtml, // function(useCid) => htmlString
  text = "",
  replyTo = null,
}) {
  if (!to || typeof buildHtml !== "function") return { sent: false };

  const htmlCid = buildHtml(true);
  const htmlPublic = buildHtml(false);

  // 1. Try Gmail SMTP first when configured so inline CID logo.png & favicon.png always attach
  if (process.env.GMAIL_USER && process.env.GMAIL_PASS) {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: `"MerxoDev Solutions" <${process.env.GMAIL_USER}>`,
        to,
        replyTo: replyTo || process.env.GMAIL_USER,
        subject,
        text,
        html: htmlCid,
        attachments: getBrandEmailAttachments(),
      });
      return { sent: true, provider: "nodemailer" };
    } catch (smtpErr) {
      console.warn("sendBrandEmail Nodemailer warning:", smtpErr.message);
    }
  }

  // 2. Fallback to Resend if configured
  if (process.env.RESEND_API_KEY) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const fromSender =
        process.env.RESEND_FROM_EMAIL ||
        "MerxoDev Solutions <onboarding@resend.dev>";
      const res = await resend.emails.send({
        from: fromSender,
        to,
        replyTo: replyTo || undefined,
        subject,
        text,
        html: htmlPublic,
      });
      if (!res.error) {
        return { sent: true, provider: "resend" };
      }
    } catch (resendErr) {
      console.warn("sendBrandEmail Resend warning:", resendErr.message);
    }
  }

  return { sent: false };
}

