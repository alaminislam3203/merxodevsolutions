import prisma from "@/lib/prisma";

/**
 * Sanitizes and formats project URLs:
 * - Trims whitespace
 * - Guarantees absolute protocol (https://) if missing so it never behaves as a broken relative link
 * - Never arbitrarily rewrites the user's custom project domain
 */
export function cleanProjectUrl(url, slug = "") {
  if (!url || typeof url !== "string") return null;
  let clean = url.trim();
  if (!clean) return null;

  // Protocol guarantee if hostname only (e.g. "smartdokan.vercel.app" or "myproject.com")
  if (!/^https?:\/\//i.test(clean) && !clean.startsWith("/") && !clean.startsWith("#") && !clean.startsWith("mailto:") && !clean.startsWith("tel:")) {
    clean = `https://${clean}`;
  }

  return clean;
}

/**
 * Normalizes project object to guarantee clean production URLs
 */
export function normalizeProject(p) {
  if (!p) return p;
  return {
    ...p,
    liveUrl: cleanProjectUrl(p.liveUrl, p.slug),
  };
}

/**
 * Executes a database operation with automatic retry on serverless cold-start timeouts
 */
async function executeWithRetry(fn, retries = 1, delayMs = 1500) {
  try {
    return await fn();
  } catch (err) {
    const isConnErr =
      err?.message?.includes("Connection terminated") ||
      err?.message?.includes("connection timeout") ||
      err?.message?.includes("Can't reach database server") ||
      err?.code === "P1001";

    if (retries > 0 && isConnErr) {
      console.warn(`[Neon DB] Connection timed out or server sleeping. Retrying in ${delayMs}ms...`);
      await new Promise((resolve) => setTimeout(resolve, delayMs));
      return await fn();
    }
    throw err;
  }
}

/**
 * Get all projects from DB (server-side helper)
 */
export async function getAllProjects() {
  try {
    const rows = await executeWithRetry(async () => {
      try {
        return await prisma.project.findMany({
          orderBy: [{ order: "asc" }, { createdAt: "desc" }],
        });
      } catch (orderErr) {
        console.warn("Fallback query without order sort:", orderErr?.message);
        return await prisma.project.findMany({
          orderBy: { createdAt: "desc" },
        });
      }
    });

    // Filter out projects pending admin approval and normalize URLs
    return (rows || [])
      .filter((p) => {
        const status = p?.details?.approvalStatus;
        return status !== "PENDING";
      })
      .map(normalizeProject);
  } catch (err) {
    console.error("Error fetching all projects from DB:", err.message);
    return [];
  }
}

/**
 * Get a single project by slug from DB
 */
export async function getProjectBySlug(slug) {
  try {
    if (!slug) return null;
    const project = await executeWithRetry(() =>
      prisma.project.findUnique({ where: { slug } })
    );
    return normalizeProject(project);
  } catch (err) {
    console.error(`Error fetching project by slug "${slug}":`, err.message);
    return null;
  }
}

