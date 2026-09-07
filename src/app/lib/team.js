import prisma from "@/lib/prisma";

export const defaultTeam = [
  {
    id: "default-1",
    name: "AL-AMIN ISLAM",
    role: "Founder & Lead Developer",
    image: "/alamin-profile.jpeg",
    color: "from-violet-600 to-cyan-500",
    bio: "Full-stack engineer with a passion for clean architecture and pixel-perfect UIs.",
    order: 0,
    isActive: true,
    socialLinks: {
      linkedin: "https://linkedin.com",
      github: "https://github.com",
    },
  },
  {
    id: "default-2",
    name: "Nafisa Akter",
    role: "UI/UX Designer",
    image: "/nafisa-profile.png",
    color: "from-amber-400 to-orange-500",
    bio: "Designs interfaces that feel intuitive — because good design should be invisible.",
    order: 1,
    isActive: true,
    socialLinks: {
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "default-3",
    name: "SHAMS ALL LABIB",
    role: "Backend Engineer",
    image: "/labib-profile.png",
    color: "from-cyan-500 to-violet-600",
    bio: "Builds APIs and systems that scale without drama.",
    order: 2,
    isActive: true,
    socialLinks: {
      github: "https://github.com",
    },
  },
];

/**
 * Get all active team members from DB (server-side helper)
 * Falls back to defaultTeam if DB returns empty
 */
export async function getTeamMembers() {
  try {
    if (!prisma?.teamMember) {
      console.warn("prisma.teamMember is not initialized yet in this process. Falling back to default team.");
      return defaultTeam;
    }

    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: [{ order: "asc" }, { createdAt: "asc" }],
    });

    if (!members || members.length === 0) {
      return defaultTeam;
    }

    return members;
  } catch (err) {
    console.error("Error fetching team members from DB:", err.message);
    return defaultTeam;
  }
}
