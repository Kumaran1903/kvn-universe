import { Post } from "@/lib/models";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("Received post:", body);
    await Post.create({
      title: body.title,
      image: body.image,
      price: {
        personal: body.price.personal,
        commercial: body.price.commercial,
      },
    });
    revalidatePath("/admin");
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
