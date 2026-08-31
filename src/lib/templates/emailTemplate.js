export default function emailTemplate({
  name,
  email,
  phone,
  service,
  budget,
  message,
  createdAt,
}) {
  const date = new Date(createdAt || Date.now()).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>New Inquiry — MerxoDevSolutions</title>
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
      .logo-title { font-size: 20px !important; letter-spacing: 6px !important; }
    }
  </style>
</head>
<body style="margin:0;padding:0;background:#f0f0f5;font-family:'Segoe UI',Arial,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" class="email-wrapper" style="background:#f0f0f5;padding:40px 16px;">
  <tr>
    <td align="center">
      <table width="620" cellpadding="0" cellspacing="0" class="email-container" style="max-width:620px;width:100%;border-radius:20px;overflow:hidden;box-shadow:0 8px 40px rgba(58,0,107,0.12);">

        <!-- TOP BAR -->
        <tr>
          <td style="height:5px;background:linear-gradient(90deg,#7c3aed 0%,#a855f7 40%,#f59e0b 100%);"></td>
        </tr>

        <!-- BANNER -->
        <tr>
          <td style="padding:0;line-height:0;background:#3A006B;">
            <img
              src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781850663/email-banner_d1unqb.jpg"
              width="620" alt="MerxoDevSolutions"
              style="width:100%;max-width:620px;display:block;border:0;"
            />
          </td>
        </tr>

        <!-- HEADER -->
        <tr>
          <td class="header-pad" style="background:#ffffff;padding:36px 48px 32px;text-align:center;border-bottom:1px solid #f0eaf8;">

            <!-- Badge -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;">
              <tr>
                <td style="background:#f3eeff;border:1px solid #d8b4fe;border-radius:100px;padding:8px 20px;">
                  <span style="font-size:10px;color:#7c3aed;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
                    ✦ &nbsp;New Contact Submission
                  </span>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 6px;font-size:24px;font-weight:800;color:#1a0030;letter-spacing:0.3px;">
              You have a new inquiry
            </p>
            <p style="margin:0 0 28px;font-size:12px;color:#9ca3af;">
              Received on ${date}
            </p>

            <!-- Quick Stats -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td class="stats-td" width="32%" style="background:#faf5ff;border:1px solid #e9d5ff;border-top:3px solid #7c3aed;border-radius:12px;padding:16px 10px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:20px;">💼</p>
                  <p style="margin:0 0 3px;font-size:9px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">Service</p>
                  <p style="margin:0;font-size:12px;font-weight:700;color:#7c3aed;">${service || 'General'}</p>
                </td>
                <td class="stats-gap" width="4%"></td>
                <td class="stats-td" width="32%" style="background:#fffbeb;border:1px solid #fde68a;border-top:3px solid #f59e0b;border-radius:12px;padding:16px 10px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:20px;">💰</p>
                  <p style="margin:0 0 3px;font-size:9px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">Budget</p>
                  <p style="margin:0;font-size:12px;font-weight:700;color:#d97706;">${budget || 'Flexible'}</p>
                </td>
                <td class="stats-gap" width="4%"></td>
                <td class="stats-td" width="28%" style="background:#ecfeff;border:1px solid #a5f3fc;border-top:3px solid #06b6d4;border-radius:12px;padding:16px 10px;text-align:center;">
                  <p style="margin:0 0 4px;font-size:20px;">🔖</p>
                  <p style="margin:0 0 3px;font-size:9px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">Status</p>
                  <p style="margin:0;font-size:12px;font-weight:700;color:#0891b2;">New</p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td class="body-pad" style="background:#fafafa;padding:36px 48px;">

            <!-- Section Label -->
            <p style="margin:0 0 18px;font-size:9px;font-weight:800;color:#9ca3af;letter-spacing:4px;text-transform:uppercase;">
              ── Contact Details
            </p>

            <!-- Name -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td style="background:#ffffff;border:1px solid #e9d5ff;border-left:4px solid #7c3aed;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(124,58,237,0.06);">
                  <p style="margin:0 0 5px;font-size:9px;font-weight:800;color:#7c3aed;letter-spacing:3px;text-transform:uppercase;">👤 &nbsp;Full Name</p>
                  <p style="margin:0;font-size:16px;font-weight:700;color:#1a0030;">${name}</p>
                </td>
              </tr>
            </table>

            <!-- Email & Phone -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td class="half-td" width="48%" style="background:#ffffff;border:1px solid #bae6fd;border-left:4px solid #06b6d4;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(6,182,212,0.06);">
                  <p style="margin:0 0 5px;font-size:9px;font-weight:800;color:#06b6d4;letter-spacing:3px;text-transform:uppercase;">✉️ &nbsp;Email</p>
                  <p style="margin:0;font-size:13px;font-weight:500;color:#1a0030;word-break:break-all;">${email}</p>
                </td>
                <td class="half-gap" width="4%"></td>
                <td class="half-td" width="48%" style="background:#ffffff;border:1px solid #bae6fd;border-left:4px solid #06b6d4;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(6,182,212,0.06);">
                  <p style="margin:0 0 5px;font-size:9px;font-weight:800;color:#06b6d4;letter-spacing:3px;text-transform:uppercase;">📞 &nbsp;Phone</p>
                  <p style="margin:0;font-size:13px;font-weight:500;color:#1a0030;">${phone || 'Not provided'}</p>
                </td>
              </tr>
            </table>

            <!-- Service & Budget -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td class="half-td" width="48%" style="background:#ffffff;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(245,158,11,0.06);">
                  <p style="margin:0 0 5px;font-size:9px;font-weight:800;color:#d97706;letter-spacing:3px;text-transform:uppercase;">💼 &nbsp;Service</p>
                  <p style="margin:0;font-size:13px;font-weight:500;color:#1a0030;">${service || 'Not specified'}</p>
                </td>
                <td class="half-gap" width="4%"></td>
                <td class="half-td" width="48%" style="background:#ffffff;border:1px solid #fde68a;border-left:4px solid #f59e0b;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(245,158,11,0.06);">
                  <p style="margin:0 0 5px;font-size:9px;font-weight:800;color:#d97706;letter-spacing:3px;text-transform:uppercase;">💰 &nbsp;Budget</p>
                  <p style="margin:0;font-size:13px;font-weight:500;color:#1a0030;">${budget || 'Not specified'}</p>
                </td>
              </tr>
            </table>

            <!-- Message -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
              <tr>
                <td style="background:#ffffff;border:1px solid #e9d5ff;border-left:4px solid #a855f7;border-radius:12px;padding:20px 22px;box-shadow:0 2px 8px rgba(168,85,247,0.06);">
                  <p style="margin:0 0 10px;font-size:9px;font-weight:800;color:#a855f7;letter-spacing:3px;text-transform:uppercase;">💬 &nbsp;Message</p>
                  <p style="margin:0;font-size:14px;color:#374151;line-height:1.9;">${(message || '').replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>

            <!-- CTA -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <a href="mailto:${email}?subject=Re: Your inquiry at MerxoDevSolutions&body=Hi ${name},%0A%0AThank you for reaching out..."
                    class="cta-btn"
                    style="display:inline-block;background:linear-gradient(135deg,#7c3aed 0%,#a855f7 50%,#f59e0b 100%);color:#ffffff;font-size:12px;font-weight:800;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:16px 40px;border-radius:100px;box-shadow:0 8px 24px rgba(124,58,237,0.3);">
                    ✦ &nbsp;Reply to ${name}
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- FOOTER -->
        <tr>
          <td class="footer-pad" style="background:#3A006B;padding:36px 48px;">

            <!-- Social Icons -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:0 5px;">
                        <a href="https://www.facebook.com/merxodevsolutions" style="display:inline-block;text-decoration:none;">
                          <img class="social-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781851881/facebook-icon_avzopy.png" width="38" height="38" alt="Facebook" style="display:block;border-radius:10px;"/>
                        </a>
                      </td>
                      <td style="padding:0 5px;">
                        <a href="https://github.com/merxodevsolutions" style="display:inline-block;text-decoration:none;">
                          <img class="social-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781851882/github-icon_cmtliq.png" width="38" height="38" alt="GitHub" style="display:block;border-radius:10px;"/>
                        </a>
                      </td>
                      <td style="padding:0 5px;">
                        <a href="https://linkedin.com/company/merxodevsolutions" style="display:inline-block;text-decoration:none;">
                          <img class="social-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781853494/linkdln-icon_b8bcdi.png" width="38" height="38" alt="LinkedIn" style="display:block;border-radius:10px;"/>
                        </a>
                      </td>
                      <td style="padding:0 5px;">
                        <a href="https://youtube.com/@merxodevsolutions" style="display:inline-block;text-decoration:none;">
                          <img class="social-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781853388/youtube-icon_y4xl4n.png" width="38" height="38" alt="YouTube" style="display:block;border-radius:10px;"/>
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
              <tr>
                <td style="height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent);"></td>
              </tr>
            </table>

            <!-- Phone -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td align="center">
                  <span style="font-size:11px;color:rgba(255,255,255,0.5);">
                    📞 &nbsp;
                    <a href="tel:+8801313334279" style="color:#c4b5fd;text-decoration:none;">+88 01313-334279</a>
                    &nbsp;<span style="color:rgba(255,255,255,0.2);">|</span>&nbsp;
                    <a href="tel:09638888981" style="color:#c4b5fd;text-decoration:none;">09638-888981</a>
                    &nbsp;<span style="color:rgba(255,255,255,0.2);">|</span>&nbsp;
                    <a href="tel:09697634279" style="color:#c4b5fd;text-decoration:none;">09697-634279</a>
                  </span>
                </td>
              </tr>
            </table>

            <!-- Location -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td align="center">
                  <a href="https://www.google.com/maps/search/Rangpur+Sadar+Rangpur+Bangladesh" target="_blank" style="text-decoration:none;">
                    <img src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781851881/location-icon_yjeht1.png" width="13" height="13" alt="Location" style="vertical-align:middle;display:inline-block;"/>
                    <span style="font-size:11px;color:#c4b5fd;vertical-align:middle;">&nbsp;Rangpur Sadar, Rangpur, Bangladesh</span>
                  </a>
                </td>
              </tr>
            </table>

            <!-- App Badges -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
              <tr>
                <td align="center">
                  <table cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:0 4px;">
                        <a href="https://play.google.com/store/apps" style="display:inline-block;text-decoration:none;">
                          <img class="badge-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781849590/play-store_gtjmts.png" height="38" alt="Google Play" style="display:block;border-radius:8px;"/>
                        </a>
                      </td>
                      <td style="padding:0 4px;">
                        <a href="https://www.apple.com/app-store" style="display:inline-block;text-decoration:none;">
                          <img class="badge-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781849726/app-store_fcnojn.png" height="38" alt="App Store" style="display:block;border-radius:8px;"/>
                        </a>
                      </td>
                      <td style="padding:0 4px;">
                        <a href="https://apps.microsoft.com/apps" style="display:inline-block;text-decoration:none;">
                          <img class="badge-img" src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781849813/microsoft-store_ywzcjq.png" height="38" alt="Microsoft Store" style="display:block;border-radius:8px;"/>
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>

            <!-- Divider -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:16px;">
              <tr>
                <td style="height:1px;background:rgba(255,255,255,0.08);"></td>
              </tr>
            </table>

            <!-- Copyright -->
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td align="center">
                  <p style="margin:0 0 4px;font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:1px;">
                    © ${new Date().getFullYear()} MerxoDevSolutions. All rights reserved.
                  </p>
                  <p style="margin:0;font-size:10px;color:rgba(255,255,255,0.15);">
                    This email was triggered by a contact form submission on merxodevsolutions.com
                  </p>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- BOTTOM BAR -->
        <tr>
          <td style="height:5px;background:linear-gradient(90deg,#7c3aed 0%,#a855f7 40%,#f59e0b 100%);"></td>
        </tr>

      </table>
    </td>
  </tr>
</table>

</body>
</html>
  `;
}
