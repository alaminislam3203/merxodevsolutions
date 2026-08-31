import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;

export async function uploadImage(base64Image) {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: "merxodevsolutions",
    resource_type: "auto",
  });
  return {
    url: result.secure_url,
    publicId: result.public_id,
    width: result.width,
    height: result.height,
    fileSize: result.bytes,
  };
}

export async function deleteImage(publicId) {
  const result = await cloudinary.uploader.destroy(publicId);
  return result;
}
