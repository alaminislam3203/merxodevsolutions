import { renderBrandCardEmail, getBrandImageUrls } from "./brandEmailLayout";

function escapeHtml(value = "") {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * 1. NEW USER WELCOME EMAIL TEMPLATE
 */
export function welcomeUserTemplate({ name = "Valued Client", email = "", useCid = true }) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);

  const bodyHtml = `
    <p style="margin:0 0 14px;font-size:16px;color:#0f172a;">
      Hi <strong>${safeName}</strong>,
    </p>
    <p style="margin:0 0 22px;font-size:14.5px;color:#334155;line-height:1.7;">
      Welcome to <strong>MerxoDev Solutions</strong>! Your official client account (<span style="color:#4f46e5;font-weight:600;">${safeEmail}</span>) is now active. From your personal dashboard, you can submit project inquiries, track live development milestones, manage account security (2FA), and leave verified reviews.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 22px;margin-bottom:18px;">
      <tr>
        <td>
          <div style="font-size:11px;font-weight:800;color:#7c3aed;letter-spacing:1.6px;text-transform:uppercase;margin-bottom:12px;">
            🚀 What You Can Do Inside Your Account
          </div>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td style="padding:7px 0;font-size:13.5px;color:#1e293b;">
                ✅ <strong>Track Live Project Progress:</strong> View UI/UX, Frontend, Backend & Deployment milestones in real time.
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;font-size:13.5px;color:#1e293b;">
                ✅ <strong>Submit Direct Project Requests:</strong> Start a new web, SaaS, or AI automation project anytime.
              </td>
            </tr>
            <tr>
              <td style="padding:7px 0;font-size:13.5px;color:#1e293b;">
                ✅ <strong>24/7 Live Chat & Engineering Support:</strong> Connect directly with our developers whenever you need help.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return renderBrandCardEmail({
    title: "Welcome to MerxoDev Solutions! 🎉",
    badgeText: "Account Activated",
    badgeBg: "#ecfdf5",
    badgeBorder: "#a7f3d0",
    badgeColor: "#059669",
    subtitle: "Your personal client portal is ready to power your next digital product.",
    bodyHtml,
    ctaPrimary: {
      label: "Open My Account Dashboard",
      url: `${siteUrl}/account`,
    },
    ctaSecondary: {
      label: "Explore Our Portfolio",
      url: `${siteUrl}/our-projects`,
    },
    useCid,
  });
}

/**
 * 2. PROJECT STATUS & MILESTONE UPDATE EMAIL TEMPLATE
 */
export function projectMilestoneUpdateTemplate({
  clientName = "Valued Client",
  projectId = "MD-0000",
  projectTitle = "Custom Web Project",
  serviceType = "Web Development",
  status = "IN_PROGRESS",
  progress = 50,
  milestones = { uiDesign: 100, frontend: 50, backend: 25, deployment: 0 },
  liveDemoUrl = "",
  notes = "",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(clientName);
  const safeTitle = escapeHtml(projectTitle);
  const safeId = escapeHtml(projectId);
  const safeService = escapeHtml(serviceType);
  const safeStatus = escapeHtml(status.replace(/_/g, " "));
  const pct = Math.max(0, Math.min(100, Number(progress || 0)));

  const m = milestones || {};
  const milestoneRows = [
    { label: "UI/UX Architecture & Design", val: Number(m.uiDesign ?? 0) },
    { label: "Frontend Development", val: Number(m.frontend ?? 0) },
    { label: "Backend & Database API", val: Number(m.backend ?? 0) },
    { label: "QA Testing & Cloud Deployment", val: Number(m.deployment ?? 0) },
  ];

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Hello <strong>${safeName}</strong>,
    </p>
    <p style="margin:0 0 20px;font-size:14px;color:#334155;line-height:1.65;">
      Our engineering team has posted a new progress update on your project <strong>${safeTitle}</strong> (<span style="font-family:monospace;color:#7c3aed;font-weight:700;">#${safeId}</span>).
    </p>

    <!-- Overall Progress Card -->
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 22px;margin-bottom:20px;">
      <tr>
        <td>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-bottom:10px;">
            <tr>
              <td style="font-size:13px;font-weight:800;color:#0f172a;">
                ${safeTitle} <span style="font-weight:600;color:#64748b;">(${safeService})</span>
              </td>
              <td align="right">
                <span style="display:inline-block;background-color:#ede9fe;color:#6d28d9;font-size:11px;font-weight:800;padding:4px 10px;border-radius:999px;text-transform:uppercase;">
                  ${safeStatus} • ${pct}%
                </span>
              </td>
            </tr>
          </table>

          <!-- Progress Bar -->
          <div style="width:100%;height:10px;background-color:#e2e8f0;border-radius:999px;overflow:hidden;margin-bottom:16px;">
            <div style="width:${pct}%;height:10px;background:linear-gradient(90deg,#f97316 0%,#7c3aed 100%);border-radius:999px;"></div>
          </div>

          <!-- Milestones Breakdown -->
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
            ${milestoneRows
              .map(
                (item) => `
              <tr>
                <td style="padding:6px 0;font-size:13px;color:#334155;font-weight:600;">
                  ${item.val >= 100 ? "✅" : item.val > 0 ? "⏳" : "⚪"} ${item.label}
                </td>
                <td align="right" style="padding:6px 0;font-size:12.5px;font-weight:800;color:${
                  item.val >= 100 ? "#059669" : item.val > 0 ? "#ea580c" : "#94a3b8"
                };">
                  ${item.val}%
                </td>
              </tr>`
              )
              .join("")}
          </table>
        </td>
      </tr>
    </table>

    ${
      notes
        ? `<div style="background-color:#fff7ed;border-left:4px solid #f97316;padding:12px 16px;border-radius:10px;font-size:13.5px;color:#334155;line-height:1.6;">
            <strong>Team Note:</strong> ${escapeHtml(notes)}
          </div>`
        : ""
    }
  `;

  return renderBrandCardEmail({
    title: `Project Update: ${pct}% Completed`,
    badgeText: `Tracking ID #${safeId}`,
    badgeBg: "#f5f3ff",
    badgeBorder: "#ddd6fe",
    badgeColor: "#6d28d9",
    subtitle: `Live milestone progress update for "${safeTitle}"`,
    bodyHtml,
    ctaPrimary: {
      label: "View Live Progress in Client Portal",
      url: `${siteUrl}/account?tab=inquiries`,
    },
    ctaSecondary: liveDemoUrl
      ? {
          label: "Open Live Staging Preview",
          url: liveDemoUrl,
        }
      : null,
    useCid,
  });
}

/**
 * 3. OFFICIAL INVOICE & PAYMENT RECEIPT EMAIL TEMPLATE
 */
export function invoiceReceiptTemplate({
  clientName = "Valued Client",
  projectId = "MD-0000",
  projectTitle = "Custom Web Project",
  serviceType = "Web Development",
  invoiceAmount = "$0.00",
  invoiceStatus = "PAID",
  budget = "",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(clientName);
  const safeId = escapeHtml(projectId);
  const safeTitle = escapeHtml(projectTitle);
  const safeService = escapeHtml(serviceType);
  const safeAmount = escapeHtml(invoiceAmount || budget || "As Agreed");
  const statusUpper = String(invoiceStatus || "UNPAID").toUpperCase();
  const isPaid = statusUpper === "PAID";

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Dear <strong>${safeName}</strong>,
    </p>
    <p style="margin:0 0 20px;font-size:14px;color:#334155;line-height:1.65;">
      ${
        isPaid
          ? "Thank you for your payment! Please find your official payment confirmation receipt below."
          : "An official invoice update has been generated for your project with MerxoDev Solutions."
      }
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:22px;margin-bottom:18px;">
      <tr>
        <td style="padding-bottom:12px;border-bottom:1px solid #e2e8f0;">
          <span style="font-size:11px;font-weight:800;color:#64748b;text-transform:uppercase;letter-spacing:1.5px;">Invoice Reference</span>
          <div style="font-size:16px;font-weight:800;color:#0f172a;margin-top:3px;">#${safeId} — ${safeTitle}</div>
        </td>
        <td align="right" style="padding-bottom:12px;border-bottom:1px solid #e2e8f0;">
          <span style="display:inline-block;padding:5px 12px;border-radius:999px;font-size:11px;font-weight:800;background-color:${
            isPaid ? "#dcfce7" : "#fef3c7"
          };color:${isPaid ? "#15803d" : "#b45309"};">
            ${escapeHtml(statusUpper)}
          </span>
        </td>
      </tr>
      <tr>
        <td style="padding-top:14px;font-size:13.5px;color:#475569;">Service Category</td>
        <td align="right" style="padding-top:14px;font-size:13.5px;font-weight:700;color:#0f172a;">${safeService}</td>
      </tr>
      <tr>
        <td style="padding-top:10px;font-size:13.5px;color:#475569;">Total Invoice Amount</td>
        <td align="right" style="padding-top:10px;font-size:18px;font-weight:800;color:#ea580c;">${safeAmount}</td>
      </tr>
    </table>
  `;

  return renderBrandCardEmail({
    title: isPaid ? "Payment Receipt Confirmed ✅" : `Invoice Statement (#${safeId})`,
    badgeText: isPaid ? "Official Receipt" : "Billing Notification",
    badgeBg: isPaid ? "#ecfdf5" : "#fff7ed",
    badgeBorder: isPaid ? "#a7f3d0" : "#fed7aa",
    badgeColor: isPaid ? "#059669" : "#ea580c",
    subtitle: `Project: ${safeTitle} (#${safeId})`,
    bodyHtml,
    ctaPrimary: {
      label: "View Invoice in Client Portal",
      url: `${siteUrl}/account?tab=inquiries`,
    },
    useCid,
  });
}

/**
 * 4. TEAM MEMBER INVITATION / ROLE UPGRADE EMAIL TEMPLATE
 */
export function roleUpgradeTemplate({
  name = "Team Member",
  email = "",
  role = "TEAM_MEMBER",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(name);
  const isFullAdmin = String(role).toUpperCase() === "ADMIN";
  const roleLabel = isFullAdmin ? "Administrator (Full Access)" : "Team Member (Staff Access)";

  const bodyHtml = `
    <p style="margin:0 0 14px;font-size:15.5px;color:#0f172a;">
      Congratulations <strong>${safeName}</strong>! 🎉
    </p>
    <p style="margin:0 0 20px;font-size:14px;color:#334155;line-height:1.65;">
      Your account (<span style="color:#4f46e5;font-weight:600;">${escapeHtml(email)}</span>) has been granted <strong>${roleLabel}</strong> privileges at <strong>MerxoDev Solutions</strong>.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 22px;margin-bottom:18px;">
      <tr>
        <td>
          <div style="font-size:11px;font-weight:800;color:#ea580c;letter-spacing:1.6px;text-transform:uppercase;margin-bottom:10px;">
            🔑 Your Portal Capabilities
          </div>
          <p style="margin:0 0 8px;font-size:13.5px;color:#1e293b;">• <strong>Dashboard & Analytics:</strong> View real-time traffic and agency metrics.</p>
          <p style="margin:0 0 8px;font-size:13.5px;color:#1e293b;">• <strong>Projects & Images:</strong> Submit new portfolio projects and copy image URLs.</p>
          <p style="margin:0 0 8px;font-size:13.5px;color:#1e293b;">• <strong>Live Chat & Reviews:</strong> Reply directly to visitors and manage client reviews.</p>
          <p style="margin:0;font-size:13.5px;color:#1e293b;">• <strong>Team Profile & Workspace:</strong> Update your own profile card in <code>/709832/team</code> and manage assigned tasks in <code>/709832/workspace</code>.</p>
        </td>
      </tr>
    </table>
  `;

  return renderBrandCardEmail({
    title: `Welcome to the MerxoDev Team!`,
    badgeText: roleLabel,
    badgeBg: "#f5f3ff",
    badgeBorder: "#ddd6fe",
    badgeColor: "#6d28d9",
    subtitle: "Your staff workspace and management tools are now unlocked.",
    bodyHtml,
    ctaPrimary: {
      label: "Open Staff Control Panel",
      url: `${siteUrl}/709832`,
    },
    ctaSecondary: {
      label: "Edit My Team Profile",
      url: `${siteUrl}/709832/team`,
    },
    useCid,
  });
}

/**
 * 5. NEW TASK ASSIGNED EMAIL TEMPLATE (TO TEAM MEMBER)
 */
export function taskAssignedTemplate({
  assignedToName = "Team Member",
  title = "New Project Task",
  description = "",
  priority = "HIGH",
  dueDate = "",
  assignedBy = "Admin",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(assignedToName);
  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description || "Please check the Team Workspace board for full details.");
  const safePriority = escapeHtml(priority);
  const safeDue = escapeHtml(dueDate || "Flexible / ASAP");

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Hi <strong>${safeName}</strong>,
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:#334155;line-height:1.65;">
      <strong>${escapeHtml(assignedBy)}</strong> has assigned a new task to you on the <strong>MerxoDev Agency Workspace</strong> board.
    </p>

    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:20px 22px;margin-bottom:16px;">
      <tr>
        <td>
          <div style="font-size:16px;font-weight:800;color:#0f172a;margin-bottom:8px;">
            📋 ${safeTitle}
          </div>
          <p style="margin:0 0 14px;font-size:13.5px;color:#475569;line-height:1.6;">
            ${safeDesc}
          </p>
          <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="border-top:1px solid #e2e8f0;padding-top:12px;">
            <tr>
              <td style="font-size:12.5px;color:#64748b;">
                Priority: <strong style="color:#ea580c;">${safePriority}</strong>
              </td>
              <td align="right" style="font-size:12.5px;color:#64748b;">
                Due Date: <strong style="color:#0f172a;">${safeDue}</strong>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  `;

  return renderBrandCardEmail({
    title: "New Task Assigned to You 📋",
    badgeText: `Priority: ${safePriority}`,
    badgeBg: "#fff7ed",
    badgeBorder: "#fed7aa",
    badgeColor: "#ea580c",
    subtitle: safeTitle,
    bodyHtml,
    ctaPrimary: {
      label: "Open Workspace Task Board",
      url: `${siteUrl}/709832/workspace`,
    },
    useCid,
  });
}

/**
 * 6. PROJECT APPROVAL NOTIFICATION EMAIL TEMPLATE
 */
export function projectApprovedTemplate({
  authorName = "Team Member",
  projectTitle = "Portfolio Project",
  projectSlug = "",
  tag = "Web Application",
  approvedBy = "Admin",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(authorName);
  const safeTitle = escapeHtml(projectTitle);
  const liveLink = projectSlug ? `${siteUrl}/our-projects/${projectSlug}` : `${siteUrl}/our-projects`;

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Great news, <strong>${safeName}</strong>! 🎉
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:#334155;line-height:1.65;">
      Your submitted project <strong>"${safeTitle}"</strong> (${escapeHtml(tag)}) has been reviewed and approved by <strong>${escapeHtml(approvedBy)}</strong>. It is now live on the public MerxoDev Solutions portfolio!
    </p>
  `;

  return renderBrandCardEmail({
    title: "Your Project is Now Live! 🚀",
    badgeText: "Approved & Published",
    badgeBg: "#ecfdf5",
    badgeBorder: "#a7f3d0",
    badgeColor: "#059669",
    subtitle: safeTitle,
    bodyHtml,
    ctaPrimary: {
      label: "View Live Project on Website",
      url: liveLink,
    },
    useCid,
  });
}

/**
 * 7. LIVE CHAT REPLY NOTIFICATION EMAIL TEMPLATE
 */
export function liveChatReplyTemplate({
  visitorName = "Valued Visitor",
  replyText = "",
  senderName = "MerxoDev Support Team",
  senderRole = "Support Engineer",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeVisitor = escapeHtml(visitorName);
  const safeReply = escapeHtml(replyText).replace(/\r\n|\r|\n/g, "<br />");
  const safeSender = escapeHtml(senderName);

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Hi <strong>${safeVisitor}</strong>,
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:#334155;line-height:1.65;">
      <strong>${safeSender}</strong> (${escapeHtml(senderRole)}) just replied to your conversation on <strong>MerxoDev Solutions Live Chat</strong>:
    </p>

    <div style="background-color:#f8fafc;border-left:4px solid #7c3aed;border-radius:12px;padding:18px 20px;margin-bottom:18px;font-size:14px;color:#0f172a;line-height:1.7;">
      "${safeReply}"
    </div>

    <p style="margin:0;font-size:13px;color:#64748b;">
      You can continue chatting live on our website or reply directly to this email.
    </p>
  `;

  return renderBrandCardEmail({
    title: `New Message from ${safeSender} 💬`,
    badgeText: "Live Support Reply",
    badgeBg: "#f5f3ff",
    badgeBorder: "#ddd6fe",
    badgeColor: "#6d28d9",
    subtitle: "Our team has responded to your inquiry.",
    bodyHtml,
    ctaPrimary: {
      label: "Continue Chat on Website",
      url: siteUrl,
    },
    ctaSecondary: {
      label: "Chat on WhatsApp",
      url: "https://wa.me/8801793961823",
    },
    useCid,
  });
}

/**
 * 8. PROJECT COMPLETED & CLIENT REVIEW REQUEST EMAIL TEMPLATE
 */
export function clientReviewCompletedTemplate({
  clientName = "Valued Client",
  projectTitle = "Your Digital Project",
  projectId = "MD-0000",
  liveDemoUrl = "",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(clientName);
  const safeTitle = escapeHtml(projectTitle);
  const safeId = escapeHtml(projectId);

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Dear <strong>${safeName}</strong>,
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:#334155;line-height:1.65;">
      We are thrilled to announce that your project <strong>${safeTitle}</strong> (<span style="font-family:monospace;color:#7c3aed;font-weight:700;">#${safeId}</span>) has been marked as <strong>100% COMPLETED</strong>! 🎉
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:#334155;line-height:1.65;">
      It was an absolute pleasure building this with you. If you loved working with the MerxoDev Solutions team, we would be honored if you could take 30 seconds to share your feedback on our website!
    </p>
  `;

  return renderBrandCardEmail({
    title: "Your Project is Complete! ⭐",
    badgeText: `Completed • #${safeId}`,
    badgeBg: "#ecfdf5",
    badgeBorder: "#a7f3d0",
    badgeColor: "#059669",
    subtitle: `Thank you for partnering with MerxoDev Solutions on "${safeTitle}"`,
    bodyHtml,
    ctaPrimary: {
      label: "⭐ Share Your Review",
      url: `${siteUrl}/#testimonials`,
    },
    ctaSecondary: liveDemoUrl
      ? {
          label: "Visit Your Live Project",
          url: liveDemoUrl,
        }
      : {
          label: "Open Client Portal",
          url: `${siteUrl}/account?tab=inquiries`,
        },
    useCid,
  });
}

/**
 * 9. CLIENT REVIEW APPROVED & PUBLISHED EMAIL TEMPLATE
 */
export function reviewPublishedTemplate({
  userName = "Valued Client",
  rating = 5,
  comment = "",
  useCid = true,
}) {
  const { siteUrl } = getBrandImageUrls(useCid);
  const safeName = escapeHtml(userName);
  const safeComment = escapeHtml(comment);
  const stars = "⭐".repeat(Math.max(1, Math.min(5, Number(rating || 5))));

  const bodyHtml = `
    <p style="margin:0 0 12px;font-size:15.5px;color:#0f172a;">
      Hi <strong>${safeName}</strong>,
    </p>
    <p style="margin:0 0 18px;font-size:14px;color:#334155;line-height:1.65;">
      Thank you so much for sharing your review with <strong>MerxoDev Solutions</strong>! Your feedback has been verified and is now featured live on our website.
    </p>

    <div style="background-color:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:18px 20px;margin-bottom:16px;">
      <div style="font-size:16px;margin-bottom:8px;">${stars}</div>
      <p style="margin:0;font-size:14px;color:#1e293b;font-style:italic;line-height:1.65;">
        "${safeComment}"
      </p>
    </div>
  `;

  return renderBrandCardEmail({
    title: "Thank You for Your Review! 🌟",
    badgeText: "Verified Client Review",
    badgeBg: "#fff7ed",
    badgeBorder: "#fed7aa",
    badgeColor: "#ea580c",
    subtitle: "Your review is now live on the MerxoDev Solutions website.",
    bodyHtml,
    ctaPrimary: {
      label: "View Live Testimonials",
      url: `${siteUrl}/#testimonials`,
    },
    useCid,
  });
}

