import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

export async function POST(req) {
  try {
    const { name, email, phone, service, budget, message } = await req.json();

    if (!name || !email || !message) {
      return Response.json(
        { error: 'Required fields missing' },
        { status: 400 },
      );
    }

    await transporter.sendMail({
      from: `"MerxoDevSolutions" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `✦ New Inquiry: ${name} — ${service || 'General Inquiry'}`,
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8"/>
          <meta name="viewport" content="width=device-width,initial-scale=1"/>
        </head>
        <body style="margin:0;padding:0;background:#0f0f13;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f0f13;padding:48px 20px;">
            <tr>
              <td align="center">
                <table width="620" cellpadding="0" cellspacing="0" style="max-width:620px;width:100%;">

                  <!-- TOP GLOW BAR -->
                  <tr>
                    <td style="background:linear-gradient(90deg,#7c3aed,#a855f7,#06b6d4);height:3px;border-radius:3px 3px 0 0;"></td>
                  </tr>

                  <!-- HEADER -->
                  <tr>
                    <td style="background:linear-gradient(160deg,#1a0533 0%,#0d1a2e 100%);padding:44px 48px 36px;border-radius:0;text-align:center;">
                      
                      <!-- Logo -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center" style="padding-bottom:8px;">
                            <span style="font-size:26px;font-weight:900;color:#ffffff;letter-spacing:8px;text-transform:uppercase;font-family:'Segoe UI',Arial,sans-serif;">
                              MER<span style="color:#f59e0b;">❯</span><span style="color:#ffffff;">❮</span>ODEV
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <td style="background:#f59e0b;height:1px;width:32px;"></td>
                                <td style="padding:0 10px;">
                                  <span style="font-size:9px;color:#f59e0b;letter-spacing:5px;text-transform:uppercase;font-weight:700;">Solutions</span>
                                </td>
                                <td style="background:#f59e0b;height:1px;width:32px;"></td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>

                      <!-- Divider -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0 24px;">
                        <tr>
                          <td style="background:linear-gradient(90deg,transparent,rgba(124,58,237,0.4),rgba(6,182,212,0.4),transparent);height:1px;"></td>
                        </tr>
                      </table>

                      <!-- Badge -->
                      <div style="display:inline-block;background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.4);border-radius:50px;padding:8px 20px;margin-bottom:16px;">
                        <span style="font-size:10px;color:#a78bfa;font-weight:700;letter-spacing:3px;text-transform:uppercase;">● New Contact Submission</span>
                      </div>

                      <p style="margin:0;font-size:22px;font-weight:700;color:#ffffff;letter-spacing:1px;">
                        You have a new inquiry
                      </p>
                      <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.45);letter-spacing:0.5px;">
                        Someone reached out through your website
                      </p>
                    </td>
                  </tr>

                  <!-- BODY -->
                  <tr>
                    <td style="background:#13131a;padding:40px 48px;">

                      <!-- Name -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                        <tr>
                          <td style="background:#1c1c28;border:1px solid #2a2a3d;border-left:3px solid #7c3aed;border-radius:10px;padding:18px 22px;">
                            <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#7c3aed;letter-spacing:3px;text-transform:uppercase;">Full Name</p>
                            <p style="margin:0;font-size:16px;font-weight:600;color:#f4f4f8;">${name}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Email & Phone -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                        <tr>
                          <td width="48%" style="background:#1c1c28;border:1px solid #2a2a3d;border-left:3px solid #06b6d4;border-radius:10px;padding:18px 22px;">
                            <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#06b6d4;letter-spacing:3px;text-transform:uppercase;">Email</p>
                            <p style="margin:0;font-size:14px;color:#f4f4f8;">${email}</p>
                          </td>
                          <td width="4%"></td>
                          <td width="48%" style="background:#1c1c28;border:1px solid #2a2a3d;border-left:3px solid #06b6d4;border-radius:10px;padding:18px 22px;">
                            <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#06b6d4;letter-spacing:3px;text-transform:uppercase;">Phone</p>
                            <p style="margin:0;font-size:14px;color:#f4f4f8;">${phone || 'Not provided'}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Service & Budget -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                        <tr>
                          <td width="48%" style="background:#1c1c28;border:1px solid #2a2a3d;border-left:3px solid #f59e0b;border-radius:10px;padding:18px 22px;">
                            <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#f59e0b;letter-spacing:3px;text-transform:uppercase;">Service</p>
                            <p style="margin:0;font-size:14px;color:#f4f4f8;">${service || 'Not specified'}</p>
                          </td>
                          <td width="4%"></td>
                          <td width="48%" style="background:#1c1c28;border:1px solid #2a2a3d;border-left:3px solid #f59e0b;border-radius:10px;padding:18px 22px;">
                            <p style="margin:0 0 5px;font-size:9px;font-weight:700;color:#f59e0b;letter-spacing:3px;text-transform:uppercase;">Budget</p>
                            <p style="margin:0;font-size:14px;color:#f4f4f8;">${budget || 'Not specified'}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Message -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:28px;">
                        <tr>
                          <td style="background:#1c1c28;border:1px solid #2a2a3d;border-left:3px solid #a855f7;border-radius:10px;padding:18px 22px;">
                            <p style="margin:0 0 10px;font-size:9px;font-weight:700;color:#a855f7;letter-spacing:3px;text-transform:uppercase;">Message</p>
                            <p style="margin:0;font-size:14px;color:#d4d4e8;line-height:1.8;">${message.replace(/\n/g, '<br/>')}</p>
                          </td>
                        </tr>
                      </table>

                      <!-- Reply CTA -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <a href="mailto:${email}" style="display:inline-block;background:linear-gradient(135deg,#7c3aed,#06b6d4);color:#ffffff;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase;text-decoration:none;padding:14px 36px;border-radius:50px;">
                              Reply to ${name} →
                            </a>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- FOOTER -->
                  <tr>
                    <td style="background:#0d0d14;padding:36px 48px;border-radius:0 0 16px 16px;">

                      <!-- Social Icons -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <!-- Facebook -->
                                <td style="padding:0 6px;">
                                  <a href="https://facebook.com/merxodevsolutions" style="display:inline-block;width:36px;height:36px;background:#1877f2;border-radius:8px;text-align:center;line-height:36px;text-decoration:none;">
                                    <img src="https://cdn-icons-png.flaticon.com/24/733/733547.png" width="16" height="16" alt="Facebook" style="vertical-align:middle;margin-top:10px;" />
                                  </a>
                                </td>
                                <!-- Instagram -->
                                <td style="padding:0 6px;">
                                  <a href="https://instagram.com/merxodevsolutions" style="display:inline-block;width:36px;height:36px;background:linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888);border-radius:8px;text-align:center;line-height:36px;text-decoration:none;">
                                    <img src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png" width="16" height="16" alt="Instagram" style="vertical-align:middle;margin-top:10px;" />
                                  </a>
                                </td>
                                <!-- LinkedIn -->
                                <td style="padding:0 6px;">
                                  <a href="https://linkedin.com/company/merxodevsolutions" style="display:inline-block;width:36px;height:36px;background:#0a66c2;border-radius:8px;text-align:center;line-height:36px;text-decoration:none;">
                                    <img src="https://cdn-icons-png.flaticon.com/24/733/733561.png" width="16" height="16" alt="LinkedIn" style="vertical-align:middle;margin-top:10px;" />
                                  </a>
                                </td>
                                <!-- YouTube -->
                                <td style="padding:0 6px;">
                                  <a href="https://youtube.com/@merxodevsolutions" style="display:inline-block;width:36px;height:36px;background:#ff0000;border-radius:8px;text-align:center;line-height:36px;text-decoration:none;">
                                    <img src="https://cdn-icons-png.flaticon.com/24/1384/1384060.png" width="16" height="16" alt="YouTube" style="vertical-align:middle;margin-top:10px;" />
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
                          <td style="background:linear-gradient(90deg,transparent,rgba(124,58,237,0.3),rgba(6,182,212,0.3),transparent);height:1px;"></td>
                        </tr>
                      </table>

                      <!-- Phone Numbers -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:14px;">
                        <tr>
                          <td align="center">
                            <span style="font-size:11px;color:rgba(255,255,255,0.35);letter-spacing:1px;">
                              📞
                              <a href="tel:+8801313334279" style="color:#a78bfa;text-decoration:none;margin:0 4px;">+88 01313-34279</a>
                              <span style="color:rgba(255,255,255,0.2);margin:0 4px;">|</span>
                              <a href="tel:09638888981" style="color:#a78bfa;text-decoration:none;margin:0 4px;">09638-888981</a>
                              <span style="color:rgba(255,255,255,0.2);margin:0 4px;">|</span>
                              <a href="tel:09697634279" style="color:#a78bfa;text-decoration:none;margin:0 4px;">09697-634279</a>
                            </span>
                          </td>
                        </tr>
                      </table>

                      <!-- Location -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:20px;">
                        <tr>
                          <td align="center">
                            <span style="font-size:11px;color:rgba(255,255,255,0.3);letter-spacing:1px;">
                              📍 Rangpur, Nilphamari, Bangladesh
                            </span>
                          </td>
                        </tr>
                      </table>

                      <!-- App Store Badges -->
                      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:24px;">
                        <tr>
                          <td align="center">
                            <table cellpadding="0" cellspacing="0">
                              <tr>
                                <!-- App Store -->
                                <td style="padding:0 5px;">
                                  <a href="#" style="display:inline-block;background:#000000;border:1px solid #333;border-radius:8px;padding:7px 14px;text-decoration:none;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right:8px;vertical-align:middle;">
                                          <span style="font-size:18px;">🍎</span>
                                        </td>
                                        <td style="vertical-align:middle;">
                                          <p style="margin:0;font-size:8px;color:rgba(255,255,255,0.6);letter-spacing:1px;">Download on the</p>
                                          <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">App Store</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </a>
                                </td>
                                <!-- Google Play -->
                                <td style="padding:0 5px;">
                                  <a href="#" style="display:inline-block;background:#000000;border:1px solid #333;border-radius:8px;padding:7px 14px;text-decoration:none;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right:8px;vertical-align:middle;">
                                          <span style="font-size:18px;">▶</span>
                                        </td>
                                        <td style="vertical-align:middle;">
                                          <p style="margin:0;font-size:8px;color:rgba(255,255,255,0.6);letter-spacing:1px;">GET IT ON</p>
                                          <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">Google Play</p>
                                        </td>
                                      </tr>
                                    </table>
                                  </a>
                                </td>
                                <!-- Microsoft -->
                                <td style="padding:0 5px;">
                                  <a href="#" style="display:inline-block;background:#000000;border:1px solid #333;border-radius:8px;padding:7px 14px;text-decoration:none;">
                                    <table cellpadding="0" cellspacing="0">
                                      <tr>
                                        <td style="padding-right:8px;vertical-align:middle;">
                                          <span style="font-size:18px;">⊞</span>
                                        </td>
                                        <td style="vertical-align:middle;">
                                          <p style="margin:0;font-size:8px;color:rgba(255,255,255,0.6);letter-spacing:1px;">Get it from</p>
                                          <p style="margin:0;font-size:12px;font-weight:700;color:#ffffff;letter-spacing:0.5px;">Microsoft</p>
                                        </td>
                                      </tr>
                                    </table>
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
                          <td style="background:rgba(255,255,255,0.06);height:1px;"></td>
                        </tr>
                      </table>

                      <!-- Copyright -->
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">
                            <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.2);letter-spacing:1px;">
                              © ${new Date().getFullYear()} MerxoDevSolutions. All rights reserved.
                            </p>
                            <p style="margin:6px 0 0;font-size:10px;color:rgba(255,255,255,0.15);">
                              This email was sent because someone filled out the contact form on your website.
                            </p>
                          </td>
                        </tr>
                      </table>

                    </td>
                  </tr>

                  <!-- BOTTOM GLOW BAR -->
                  <tr>
                    <td style="background:linear-gradient(90deg,#7c3aed,#a855f7,#06b6d4);height:3px;border-radius:0 0 3px 3px;"></td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    return Response.json({ success: true });
  } catch (err) {
    console.error(err);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
