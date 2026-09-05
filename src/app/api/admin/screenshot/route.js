import { NextResponse } from "next/server";
import { auth } from "@/auth";
import cloudinary from "@/lib/cloudinary";

export const maxDuration = 60; // Allow sufficient time for capture & upload

// Helper: Ensure valid URL
function formatUrl(url) {
  let clean = url.trim();
  if (!clean.startsWith("http://") && !clean.startsWith("https://")) {
    clean = "https://" + clean;
  }
  return clean;
}

// POST /api/admin/screenshot
// Body: { url: string, type: 'cover' | 'desktop' | 'mobile' }
export async function POST(request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { url, type = "cover" } = await request.json();

    if (!url || !url.trim()) {
      return NextResponse.json({ error: "Website URL is required" }, { status: 400 });
    }

    const targetUrl = formatUrl(url);

    // Resolution based on image type
    let width = 1200;
    if (type === "mobile") {
      width = 390;
    } else if (type === "desktop") {
      width = 1440;
    } else {
      // cover
      width = 1200;
    }

    // High quality screenshot source URL
    // WordPress mShots API with custom viewport width
    const mshotUrl = `https://s0.wp.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=${width}`;

    // Upload directly to Cloudinary
    const uploaded = await cloudinary.uploader.upload(mshotUrl, {
      folder: "merxodevsolutions/projects",
      resource_type: "image",
    });

    return NextResponse.json({
      success: true,
      url: uploaded.secure_url,
      width: uploaded.width,
      height: uploaded.height,
      type,
    });
  } catch (error) {
    console.error("Screenshot capture error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to capture screenshot" },
      { status: 500 }
    );
  }
}
