export default function autoReplyTemplate({
  name,
  email,
  service,
  budget,
  message,
}) {
  const shortMessage =
    message && message.length > 160
      ? message.substring(0, 157) + '...'
      : message || '';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>We received your inquiry — MerxoDevSolutions</title>
  <style>
    @media only screen and (max-width: 620px) {
      .email-wrapper { padding: 16px 8px !important; }
      .email-container { width: 100% !important; }
      .header-pad { padding: 28px 20px 24px !important; }
      .body-pad { padding: 28px 20px !important; }
      .footer-pad { padding: 28px 20px !important; }
      .half-td { display: block !important; width: 100% !important; margin-bottom: 10px !important; }
      .half-gap { display: none !important; }
      .steps-td { display: block !important; width: 100% !important; margin-bottom: 12px !important; }
      .steps-gap { display: none !important; }
      .logo-title { font-size: 22px !important; letter-spacing: 6px !important; }
      .badge-img { height: 34px !important; }
      .social-img { width: 32px !important; height: 32px !important; }
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

        <!-- BANNER / LOGO HEADER -->
        <tr>
          <td style="padding:0;line-height:0;background:#3A006B;">
            <img
              src="https://res.cloudinary.com/doogtvaoh/image/upload/q_auto/f_auto/v1781850663/email-banner_d1unqb.jpg"
              width="620"
              alt="MerxoDevSolutions"
              style="width:100%;max-width:620px;display:block;border:0;"
            />
          </td>
        </tr>

        <!-- HEADER -->
        <tr>
          <td class="header-pad" style="background:#ffffff;padding:36px 48px 32px;text-align:center;border-bottom:1px solid #f0eaf8;">

            <!-- Badge -->
            <table cellpadding="0" cellspacing="0" style="margin:0 auto 18px;">
              <tr>
                <td style="background:#f3eeff;border:1px solid #d8b4fe;border-radius:100px;padding:8px 20px;">
                  <span style="font-size:10px;color:#7c3aed;font-weight:800;letter-spacing:3px;text-transform:uppercase;">
                    ✦ &nbsp;Message Received
                  </span>
                </td>
              </tr>
            </table>

            <p style="margin:0 0 8px;font-size:26px;font-weight:800;color:#1a0030;">
              Thank you, ${name}!
            </p>
            <p style="margin:0 0 6px;font-size:14px;color:#374151;line-height:1.8;">
              We've successfully received your inquiry and we're super excited to connect with you! You're one step closer to bringing your ideas to life. 🚀
            </p>
            <p style="margin:0;font-size:13px;color:#9ca3af;">
              Our team will get back to you within
              <span style="color:#7c3aed;font-weight:700;">02–12 hours</span>.
              <br/><br/>
              <span style="display:inline-block;background:#fff5f5;border:1.5px solid #fca5a5;border-left:4px solid #ef4444;border-radius:12px;padding:14px 18px;font-size:13px;color:#374151;line-height:1.8;text-align:left;">
                ⏰ We usually respond within <span style="color:#7c3aed;font-weight:700;">2–12 hours</span>. But if you haven't heard back from us within that time, feel free to give us a call — we're always happy to help! 
              </span>
              <br/><br/>
            </p>

          </td>
        </tr>

        <!-- BODY -->
        <tr>
          <td class="body-pad" style="background:#fafafa;padding:36px 48px;">

            <!-- Section Label -->
            <p style="margin:0 0 18px;font-size:9px;font-weight:800;color:#9ca3af;letter-spacing:4px;text-transform:uppercase;">
              ── Your Submission Summary
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

            <!-- Email -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td style="background:#ffffff;border:1px solid #bae6fd;border-left:4px solid #06b6d4;border-radius:12px;padding:18px 22px;box-shadow:0 2px 8px rgba(6,182,212,0.06);">
                  <p style="margin:0 0 5px;font-size:9px;font-weight:800;color:#06b6d4;letter-spacing:3px;text-transform:uppercase;">✉️ &nbsp;Email</p>
                  <p style="margin:0;font-size:13px;font-weight:500;color:#1a0030;word-break:break-all;">${email}</p>
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

            <!-- Message Preview -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
              <tr>
                <td style="background:#ffffff;border:1px solid #e9d5ff;border-left:4px solid #a855f7;border-radius:12px;padding:20px 22px;box-shadow:0 2px 8px rgba(168,85,247,0.06);">
                  <p style="margin:0 0 10px;font-size:9px;font-weight:800;color:#a855f7;letter-spacing:3px;text-transform:uppercase;">💬 &nbsp;Your Message</p>
                  <p style="margin:0;font-size:14px;color:#374151;line-height:1.9;">${shortMessage.replace(/\n/g, '<br/>')}</p>
                </td>
              </tr>
            </table>

            <!-- What Happens Next -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
              <tr>
                <td style="background:linear-gradient(135deg,#faf5ff 0%,#fff8eb 100%);border:1px solid #e9d5ff;border-radius:16px;padding:28px;">

                  <p style="margin:0 0 20px;font-size:9px;font-weight:800;color:#9ca3af;letter-spacing:4px;text-transform:uppercase;">── What Happens Next?</p>

                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td class="steps-td" width="30%" style="text-align:center;vertical-align:top;padding:0 8px;">
                        <div style="width:44px;height:44px;border-radius:50%;background:#7c3aed;margin:0 auto 10px;display:flex;align-items:center;justify-content:center;font-size:20px;line-height:44px;text-align:center;">🔍</div>
                        <p style="margin:0 0 4px;font-size:11px;font-weight:800;color:#7c3aed;">Review</p>
                        <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.6;">We'll review your inquiry carefully</p>
                      </td>
                      <td class="steps-gap" width="5%"></td>
                      <td class="steps-td" width="30%" style="text-align:center;vertical-align:top;padding:0 8px;">
                        <div style="width:44px;height:44px;border-radius:50%;background:#f59e0b;margin:0 auto 10px;line-height:44px;text-align:center;font-size:20px;">📋</div>
                        <p style="margin:0 0 4px;font-size:11px;font-weight:800;color:#d97706;">Prepare</p>
                        <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.6;">Our team prepares a tailored solution</p>
                      </td>
                      <td class="steps-gap" width="5%"></td>
                      <td class="steps-td" width="30%" style="text-align:center;vertical-align:top;padding:0 8px;">
                        <div style="width:44px;height:44px;border-radius:50%;background:#06b6d4;margin:0 auto 10px;line-height:44px;text-align:center;font-size:20px;">✉️</div>
                        <p style="margin:0 0 4px;font-size:11px;font-weight:800;color:#0891b2;">Respond</p>
                        <p style="margin:0;font-size:11px;color:#6b7280;line-height:1.6;">We'll reply to <span style="color:#7c3aed;font-weight:600;">${email}</span> within 02–12h</p>
                      </td>
                    </tr>
                  </table>

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
                        <a href="https://www.linkedin.com/in/merxodevsolutions" style="display:inline-block;text-decoration:none;">
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
                    <a href="tel:+8801313334279" style="color:#c4b5fd;text-decoration:none;">+88 01313-34279</a>
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
                    This is an automated reply to your contact form submission on merxodevsolutions.com
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
