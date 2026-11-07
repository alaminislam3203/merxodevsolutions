import prisma from "@/lib/prisma";

/**
 * Sanitizes URLs to remove localhost, merxohub, or legacy domain references
 * and point them to the official production domain https://merxodevsolutions.pro.bd
 */
export function cleanProjectUrl(url, slug = "") {
  if (!url || typeof url !== "string") return url;
  let clean = url.trim();

  // 1. Remove localhost references with any port
  if (/https?:\/\/localhost(:\d+)?/i.test(clean)) {
    clean = clean.replace(/https?:\/\/localhost(:\d+)?/gi, "https://merxodevsolutions.pro.bd");
  }

  // 2. Remove merxohub.pro.bd references
  if (/merxohub\.pro\.bd/i.test(clean)) {
    clean = clean.replace(/https?:\/\/(www\.)?merxohub\.pro\.bd/gi, "https://merxodevsolutions.pro.bd");
    clean = clean.replace(/merxohub\.pro\.bd/gi, "merxodevsolutions.pro.bd");
  }

  // 3. Remove legacy merxodev.com references
  if (/merxodev\.com/i.test(clean)) {
    clean = clean.replace(/https?:\/\/(www\.)?merxodev\.com/gi, "https://merxodevsolutions.pro.bd");
    clean = clean.replace(/merxodev\.com/gi, "merxodevsolutions.pro.bd");
  }

  // Protocol guarantee if hostname only
  if (clean.startsWith("merxodevsolutions.pro.bd")) {
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

let hasAutoRepairedDb = false;

/**
 * Background auto-repair for existing database records (Projects & Banners)
 */
async function autoRepairDatabaseUrls() {
  if (hasAutoRepairedDb) return;
  hasAutoRepairedDb = true;

  try {
    const dirtyProjects = await prisma.project.findMany({
      where: {
        OR: [
          { liveUrl: { contains: "localhost" } },
          { liveUrl: { contains: "merxohub" } },
          { liveUrl: { contains: "merxodev.com" } },
        ],
      },
    });

    for (const p of dirtyProjects) {
      const fixedUrl = cleanProjectUrl(p.liveUrl, p.slug);
      if (fixedUrl && fixedUrl !== p.liveUrl) {
        await prisma.project
          .update({
            where: { id: p.id },
            data: { liveUrl: fixedUrl },
          })
          .catch(() => {});
      }
    }

    // Also repair any banners with legacy links
    const dirtyBanners = await prisma.banner.findMany({
      where: {
        OR: [
          { buttonLink: { contains: "localhost" } },
          { buttonLink: { contains: "merxohub" } },
          { buttonLink: { contains: "merxodev.com" } },
        ],
      },
    });

    for (const b of dirtyBanners) {
      const fixedLink = cleanProjectUrl(b.buttonLink);
      if (fixedLink && fixedLink !== b.buttonLink) {
        await prisma.banner
          .update({
            where: { id: b.id },
            data: { buttonLink: fixedLink },
          })
          .catch(() => {});
      }
    }
  } catch (err) {
    console.warn("DB URL auto-repair notice:", err?.message);
  }
}

/**
 * Get all projects from DB (server-side helper)
 */
export async function getAllProjects() {
  try {
    // Trigger background auto-repair if needed
    autoRepairDatabaseUrls().catch(() => {});

    let rows = [];
    try {
      rows = await prisma.project.findMany({
        orderBy: [{ order: "asc" }, { createdAt: "desc" }],
      });
    } catch (orderErr) {
      console.warn("Fallback query without order sort:", orderErr?.message);
      rows = await prisma.project.findMany({
        orderBy: { createdAt: "desc" },
      });
    }
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
    const project = await prisma.project.findUnique({ where: { slug } });
    return normalizeProject(project);
  } catch (err) {
    console.error(`Error fetching project by slug "${slug}":`, err.message);
    return null;
  }
}

