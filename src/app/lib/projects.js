import prisma from "@/lib/prisma";

/**
 * Get all projects from DB (server-side helper)
 */
export async function getAllProjects() {
  return prisma.project.findMany({ orderBy: { createdAt: "asc" } });
}

/**
 * Get a single project by slug from DB
 */
export async function getProjectBySlug(slug) {
  return prisma.project.findUnique({ where: { slug } });
}
