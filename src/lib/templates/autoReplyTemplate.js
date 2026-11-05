import { getBrandImageUrls } from "@/lib/templates/brandEmailLayout";

export default function autoReplyTemplate({
  name,
  email,
  phone,
  service,
  budget,
  message,
  referenceId,
  createdAt,
  useCid = true,
}) {
  const { logoSrc, faviconSrc, siteUrl } = getBrandImageUrls(useCid);
  const year = new Date().getFullYear();
  const refCode =
    referenceId ||
    `MD-${Math.floor(1000 + Math.random() * 9000)}`;

  const date = new Date(createdAt || Date.now()).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>We Received Your Inquiry — MerxoDev Solutions</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 16px 8px !important; }
      .email-container { width: 100% !important; }
      .header-pad { padding: 26px 20px 22px !important; }
      .body-pad { padding: 26px 20px !important; }
      .footer-pad { padding: 26px 20px !important; }
      .step-td { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
      .step-gap { display: none !important; }
      .cta-btn { display: block !important; margin-bottom: 10px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background-color:#f8fafc;font-family:'Segoe UI',-apple-system,BlinkMacSystemFont,Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">

<table width="100%" cellpadding="0" cellspacing="0" class="email-wrapper" style="background-color:#f8fafc;padding:36px 16px;">
  <tr>
    <td align="center">
      <table width="620" cellpadding="0" cellspacing="0" class="email-container" style="max-width:620px;width:100%;background-color:#ffffff;border:1px solid #e2e8f0;border-radius:22px;overflow:hidden;box-shadow:0 12px 40px rgba(15,23,42,0.07);">

        <!-- TOP ACCENT BAR -->
        <tr>
          <td style="height:6px;background:linear-gradient(90deg,#f97316 0%,#7c3aed 50%,#06b6d4 100%);"></td>
        </tr>

        <!-- WHITE BRAND HEADER WITH FAVICON.PNG + LOGO.PNG -->
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

        <!-- HERO CONFIRMATION HEADER -->
        <tr>
          <td class="header-pad" style="background-color:#ffffff;padding:28px 44px 26px;text-align:center;border-bottom:1px solid #f1f5f9;">
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 14px;">
              <tr>
                <td style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:100px;padding:7px 18px;">
                  <span style="font-size:10px;color:#059669;font-weight:800;letter-spacing:2.5px;text-transform:uppercase;">
                    ✓ &nbsp;Inquiry Received • Ref #${refCode}
                  </span>
                </td>
              </tr>
            </table>

            <h1 style="margin:0 0 8px;font-size:24px;font-weight:800;color:#0f172a;letter-spacing:-0.2px;">
              Thank You for Reaching Out, ${name}!
            </h1>
            <p style="margin:0;font-size:13.5px;color:#64748b;line-height:1.6;">
              We have received your project inquiry on <strong>${date}</strong>. Our engineering &amp; product team is reviewing your requirements right now.
            </p>
          </td>
        </tr>

        <!-- BODY (Pure White Background) -->
        <tr>
          <td class="body-pad" style="background-color:#ffffff;padding:32px 44px;">

            <!-- What Happens Next (3 Steps) -->
            <p style="margin:0 0 14px;font-size:10px;font-weight:800;color:#64748b;letter-spacing:3px;text-transform:uppercase;">
              What Happens Next
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td class="step-td" width="31%" valign="top" style="background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #f97316;border-radius:12px;padding:14px 12px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#ea580c;letter-spacing:1.5px;text-transform:uppercase;">Step 01</p>
                  <p style="margin:0 0 4px;font-size:13px;font-weight:800;color:#0f172a;">Scope Review</p>
                  <p style="margin:0;font-size:11.5px;color:#64748b;line-height:1.5;">Our lead architect reviews your goals &amp; tech stack.</p>
                </td>
                <td class="step-gap" width="3.5%"></td>
                <td class="step-td" width="31%" valign="top" style="background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #7c3aed;border-radius:12px;padding:14px 12px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#7c3aed;letter-spacing:1.5px;text-transform:uppercase;">Step 02</p>
                  <p style="margin:0 0 4px;font-size:13px;font-weight:800;color:#0f172a;">Custom Proposal</p>
                  <p style="margin:0;font-size:11.5px;color:#64748b;line-height:1.5;">We prepare a tailored roadmap, timeline &amp; quote.</p>
                </td>
                <td class="step-gap" width="3.5%"></td>
                <td class="step-td" width="31%" valign="top" style="background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #06b6d4;border-radius:12px;padding:14px 12px;">
                  <p style="margin:0 0 4px;font-size:10px;font-weight:800;color:#0891b2;letter-spacing:1.5px;text-transform:uppercase;">Step 03</p>
                  <p style="margin:0 0 4px;font-size:13px;font-weight:800;color:#0f172a;">Direct Response</p>
                  <p style="margin:0;font-size:11.5px;color:#64748b;line-height:1.5;">We contact you within <strong>2–6 business hours</strong>.</p>
                </td>
              </tr>
            </table>

            <!-- Inquiry Summary Card -->
            <p style="margin:0 0 12px;font-size:10px;font-weight:800;color:#64748b;letter-spacing:3px;text-transform:uppercase;">
              Your Inquiry Summary
            </p>

            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:14px;padding:18px 20px;margin-bottom:28px;">
              <tr>
                <td style="padding-bottom:10px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Service Category:</span>
                  <span style="font-size:13.5px;color:#7c3aed;font-weight:800;float:right;">${service || "Custom Web / Software Development"}</span>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Estimated Budget:</span>
                  <span style="font-size:13.5px;color:#d97706;font-weight:800;float:right;">${budget || "Flexible / To Be Discussed"}</span>
                </td>
              </tr>
              ${
                phone
                  ? `<tr>
                <td style="padding:10px 0;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Phone / WhatsApp:</span>
                  <span style="font-size:13px;color:#0f172a;font-weight:700;float:right;">${phone}</span>
                </td>
              </tr>`
                  : ""
              }
              <tr>
                <td style="padding-top:12px;">
                  <p style="margin:0 0 6px;font-size:11px;color:#64748b;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Your Message:</p>
                  <p style="margin:0;font-size:13.5px;color:#1e293b;line-height:1.7;">${(message || "").replace(/\n/g, "<br/>")}</p>
                </td>
              </tr>
            </table>

            <!-- Action Buttons -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="https://wa.me/8801313334279?text=Hi%20MerxoDev%20Team%2C%20I%20just%20submitted%20an%20inquiry%20(Ref%20%23${refCode})"
                    class="cta-btn"
                    style="display:inline-block;background:linear-gradient(135deg,#10b981 0%,#059669 100%);color:#ffffff;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:100px;margin:0 6px;box-shadow:0 6px 18px rgba(16,185,129,0.25);">
                    Chat Instantly on WhatsApp
                  </a>
                  <a href="${siteUrl}/our-projects"
                    class="cta-btn"
                    style="display:inline-block;background:linear-gradient(135deg,#f97316 0%,#7c3aed 100%);color:#ffffff;font-size:12px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;text-decoration:none;padding:14px 28px;border-radius:100px;margin:0 6px;box-shadow:0 6px 18px rgba(124,58,237,0.22);">
                    Explore Our Projects
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- CLEAN WHITE FOOTER WITH FAVICON.PNG + LOGO.PNG -->
        <tr>
          <td class="footer-pad" align="center" style="background-color:#f8fafc;border-top:1px solid #e2e8f0;padding:28px 44px;">

            <!-- Footer Brand Row -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 12px;">
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

            <p style="margin:0 0 6px;font-size:12px;color:#475569;font-weight:600;">
              <a href="tel:+8801313334279" style="color:#7c3aed;text-decoration:none;">+88 01313-334279</a>
              &nbsp;|&nbsp;
              <a href="tel:09638888981" style="color:#7c3aed;text-decoration:none;">09638-888981</a>
              &nbsp;|&nbsp;
              <a href="tel:09697634279" style="color:#7c3aed;text-decoration:none;">09697-634279</a>
            </p>

            <p style="margin:0 0 10px;font-size:11.5px;color:#64748b;">
              Rangpur Sadar, Rangpur, Bangladesh • <a href="${siteUrl}" style="color:#f97316;text-decoration:none;font-weight:700;">merxodevsolutions.pro.bd</a>
            </p>

            <p style="margin:0;font-size:11px;color:#94a3b8;">
              © ${year} MerxoDev Solutions. All rights reserved.
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
</html>`;
}
