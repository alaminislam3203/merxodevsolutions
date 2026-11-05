import path from "path";
import fs from "fs";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXTAUTH_URL ||
  "https://merxodevsolutions.pro.bd"
).replace(/\/$/, "");

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
