import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { Readable } from "stream";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const stream = Readable.from(buffer);

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "posts" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(
              NextResponse.json({ error: error.message }, { status: 500 })
            );
          } else {
            resolve(
              NextResponse.json({ url: result.secure_url }, { status: 200 })
            );
          }
        }
      );
      stream.pipe(uploadStream);
    });
  } catch (error) {
    console.error("Upload Route Error:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
