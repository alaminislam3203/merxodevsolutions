import { getBrandImageUrls } from "@/lib/templates/brandEmailLayout";

export default function emailTemplate({
  name,
  email,
  phone,
  service,
  budget,
  message,
  createdAt,
  useCid = true,
}) {
  const { logoSrc, faviconSrc, siteUrl } = getBrandImageUrls(useCid);

  const date = new Date(createdAt || Date.now()).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>New Inquiry — MerxoDev Solutions</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 16px 8px !important; }
      .email-container { width: 100% !important; }
      .header-pad { padding: 28px 20px 24px !important; }
      .body-pad { padding: 28px 20px !important; }
      .footer-pad { padding: 28px 20px !important; }
      .stats-td { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
      .stats-gap { display: none !important; }
      .half-td { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
      .half-gap { display: none !important; }
      .badge-img { height: 34px !important; }
      .social-img { width: 32px !important; height: 32px !important; }
      .cta-btn { padding: 14px 24px !important; font-size: 11px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;color:#0f172a;">

<table width="100%" cellpadding="0" cellspacing="0" class="email-wrapper" style="background-color:#f8fafc;padding:36px 16px;">
  <tr>
    <td align="center">
      <table width="620" cellpadding="0" cellspacing="0" class="email-container" style="max-width:620px;width:100%;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:22px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.07);">

        <!-- TOP BAR -->
        <tr>
          <td style="height:6px;background:linear-gradient(90deg,#f97316 0%,#7c3aed 50%,#06b6d4 100%);"></td>
        </tr>

        <!-- WHITE BRAND BAR WITH FAVICON.PNG + LOGO.PNG -->
        <tr>
          <td align="center" style="background-color:#ffffff;padding:28px 36px 20px;border-bottom:1px solid #f1f5f9;">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto;">
              <tr>
                <td valign="middle" style="padding-right:12px;">
                  <div style="width:44px;height:44px;border-radius:12px;background:linear-gradient(135deg,#f97316 0%,#ea580c 100%);padding:8px;box-sizing:border-box;box-shadow:0 4px 12px rgba(249,115,22,0.28);">
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
          </td>
        </tr>

        <!-- HEADER -->
        <tr>
          <td class="header-pad" style="background-color:#ffffff;padding:28px 48px 30px;text-align:center;border-bottom:1px solid #f1f5f9;">

            <!-- Badge -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 14px;">
              <tr>
                <td style="background:#f5f3ff;border:1px solid #ddd6fe;border-radius:100px;padding:7px 18px;">
                  <span style="font-size:10px;color:#7c3aed;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;">
                    ✦ &nbsp;New Contact Submission
                  </span>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 6px;font-size:24px;font-weight:800;color:#0f172a;letter-spacing:0.2px;">
              You have a new project inquiry
            </p>
            <p style="margin:0 0 26px;font-size:12px;color:#64748b;">
              Received on ${date}
            </p>

            <!-- Quick Stats -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="stats-td" width="32%" style="background:#faf5ff;border:1px solid #e9d5ff;border-top:3px solid #7c3aed;border-radius:12px;padding:14px 10px;text-align:center;">
                  <p style="margin:0 0 3px;font-size:9px;color:#64748b;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Service</p>
                  <p style="margin:0;font-size:12.5px;font-weight:800;color:#6d28d9;">${service || "General"}</p>
                </td>
                <td class="stats-gap" width="4%"></td>
                <td class="stats-td" width="32%" style="background:#fffbeb;border:1px solid #fde68a;border-top:3px solid #f59e0b;border-radius:12px;padding:14px 10px;text-align:center;">
                  <p style="margin:0 0 3px;font-size:9px;color:#64748b;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Budget</p>
                  <p style="margin:0;font-size:12.5px;font-weight:800;color:#d97706;">${budget || "Flexible"}</p>
                </td>
                <td class="stats-gap" width="4%"></td>
                <td class="stats-td" width="28%" style="background:#ecfeff;border:1px solid #a5f3fc;border-top:3px solid #06b6d4;border-radius:12px;padding:14px 10px;text-align:center;">
                  <p style="margin:0 0 3px;font-size:9px;color:#64748b;letter-spacing:2px;text-transform:uppercase;font-weight:700;">Status</p>
                  <p style="margin:0;font-size:12.5px;font-weight:800;color:#0891b2;">New Inquiry</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- BODY (Pure White Background) -->
        <tr>
          <td class="body-pad" style="background-color:#ffffff;padding:34px 48px;">

            <!-- Section Label -->
            <p style="margin:0 0 16px;font-size:10px;font-weight:800;color:#64748b;letter-spacing:3px;text-transform:uppercase;">
              Client &amp; Project Details
            </p>

            <!-- Name -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #7c3aed;border-radius:12px;padding:16px 20px;">
                  <p style="margin:0 0 4px;font-size:9.5px;font-weight:800;color:#7c3aed;letter-spacing:2.5px;text-transform:uppercase;">Full Name</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#0f172a;">${name}</p>
                </td>
              </tr>
            </table>

            <!-- Email & Phone -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td class="half-td" width="48%" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #06b6d4;border-radius:12px;padding:16px 20px;">
                  <p style="margin:0 0 4px;font-size:9.5px;font-weight:800;color:#0891b2;letter-spacing:2.5px;text-transform:uppercase;">Email Address</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;word-break:break-all;">${email}</p>
                </td>
                <td class="half-gap" width="4%"></td>
                <td class="half-td" width="48%" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #06b6d4;border-radius:12px;padding:16px 20px;">
                  <p style="margin:0 0 4px;font-size:9.5px;font-weight:800;color:#0891b2;letter-spacing:2.5px;text-transform:uppercase;">Phone / WhatsApp</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;">${phone || "Not provided"}</p>
                </td>
              </tr>
            </table>

            <!-- Service & Budget -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td class="half-td" width="48%" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #f59e0b;border-radius:12px;padding:16px 20px;">
                  <p style="margin:0 0 4px;font-size:9.5px;font-weight:800;color:#d97706;letter-spacing:2.5px;text-transform:uppercase;">Service</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;">${service || "Not specified"}</p>
                </td>
                <td class="half-gap" width="4%"></td>
                <td class="half-td" width="48%" style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #f59e0b;border-radius:12px;padding:16px 20px;">
                  <p style="margin:0 0 4px;font-size:9.5px;font-weight:800;color:#d97706;letter-spacing:2.5px;text-transform:uppercase;">Budget</p>
                  <p style="margin:0;font-size:13px;font-weight:600;color:#0f172a;">${budget || "Not specified"}</p>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:30px;">
              <tr>
                <td style="background:#f8fafc;border:1px solid #e2e8f0;border-left:4px solid #f97316;border-radius:12px;padding:18px 20px;">
                  <p style="margin:0 0 8px;font-size:9.5px;font-weight:800;color:#ea580c;letter-spacing:2.5px;text-transform:uppercase;">Project Message</p>
                  <p style="margin:0;font-size:14px;color:#1e293b;line-height:1.8;">${(message || "").replace(/\n/g, "<br/>")}</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="mailto:${email}?subject=Re: Your inquiry at MerxoDev Solutions&body=Hi ${name},%0A%0AThank you for reaching out..."
                    class="cta-btn"
                    style="display:inline-block;background:linear-gradient(135deg,#f97316 0%,#7c3aed 100%);color:#ffffff;font-size:12px;font-weight:800;letter-spacing:2px;text-transform:uppercase;text-decoration:none;padding:15px 38px;border-radius:100px;box-shadow:0 8px 20px rgba(124,58,237,0.25);">
                    ✦ &nbsp;Reply to ${name}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- CLEAN WHITE FOOTER WITH FAVICON.PNG + LOGO.PNG -->
        <tr>
          <td class="footer-pad" align="center" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:30px 48px;">

            <!-- Footer Brand Row -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 14px;">
              <tr>
                <td valign="middle" style="padding-right:8px;">
                  <div style="width:26px;height:26px;border-radius:7px;background:#f97316;padding:4px;box-sizing:border-box;">
                    <img
                      src="${faviconSrc}"
                      width="18"
                      height="18"
                      alt="MerxoDev"
                      style="display:block;width:18px;height:18px;object-fit:contain;border:0;"
                    />
                  </div>
                </td>
                <td valign="middle">
                  <img
                    src="${logoSrc}"
                    height="22"
                    alt="MerxoDev Solutions"
                    style="display:block;height:22px;width:auto;object-fit:contain;border:0;"
                  />
                </td>
              </tr>
            </table>

            <!-- Phone -->
            <p style="margin:0 0 8px;font-size:12px;color:#475569;font-weight:600;">
              <a href="tel:+8801313334279" style="color:#7c3aed;text-decoration:none;">+88 01313-334279</a>
              &nbsp;|&nbsp;
              <a href="tel:09638888981" style="color:#7c3aed;text-decoration:none;">09638-888981</a>
              &nbsp;|&nbsp;
              <a href="tel:09697634279" style="color:#7c3aed;text-decoration:none;">09697-634279</a>
            </p>

            <p style="margin:0 0 12px;font-size:11.5px;color:#64748b;">
              Rangpur Sadar, Rangpur, Bangladesh • <a href="${siteUrl}" style="color:#f97316;text-decoration:none;font-weight:700;">merxodevsolutions.pro.bd</a>
            </p>

            <p style="margin:0;font-size:11px;color:#94a3b8;">
              © ${new Date().getFullYear()} MerxoDev Solutions. All rights reserved.
            </p>

          </td>
        </tr>

        <!-- BOTTOM BAR -->
        <tr>
          <td style="height:5px;background:linear-gradient(90deg,#f97316 0%,#7c3aed 50%,#06b6d4 100%);"></td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
  `;
}
