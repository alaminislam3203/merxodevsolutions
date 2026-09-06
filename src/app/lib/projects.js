import prisma from "@/lib/prisma";

/**
 * Get all projects from DB (server-side helper)
 */
export async function getAllProjects() {
  try {
    return await prisma.project.findMany({ orderBy: { createdAt: "asc" } });
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
    return await prisma.project.findUnique({ where: { slug } });
  } catch (err) {
    console.error(`Error fetching project by slug "${slug}":`, err.message);
    return null;
  }
}

