"use server";

import { revalidatePath } from "next/cache";
import { Post } from "@/lib/models";
import { connectToDB } from "@/lib/utils";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function createPost(formData) {
  try {
    await connectToDB();

    const title = formData.get("title");
    const personal = formData.get("personal");
    const commercial = formData.get("commercial");
    const image = formData.get("image");
    if (!image || !title) throw new Error("Missing data");

    await Post.create({
      title,
      image,
      price: { personal, commercial },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Post creation failed:", err);
    return { success: false, message: err.message };
  }
}

export const deletepost = async (id) => {
  try {
    await connectToDB();
    const post = await Post.findById(id);
    if (post?.image) {
      const parts = post.image.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(`posts/${publicId}`);
    }

    await Post.findByIdAndDelete(id);
    revalidatePath("/admin");
  } catch (err) {
    console.log("Error deleting a post", err);
  }
};

export const updatePost = async (formData) => {
  try {
    await connectToDB();
    const id = formData.get("id");
    const title = formData.get("title");
    const personal = formData.get("personal");
    const commercial = formData.get("commercial");
    const oldImage = formData.get("oldImage");
    let image = formData.get("image");

    // No file upload required anymore
    if (image !== oldImage) {
      const parts = oldImage.split("/");
      const publicId = parts[parts.length - 1].split(".")[0];
      await cloudinary.uploader.destroy(`posts/${publicId}`);
    }

    await Post.findByIdAndUpdate(id, {
      title,
      image,
      price: { personal, commercial },
    });

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    console.error("Update failed:", err);
    return { success: false, message: err.message };
  }
};
