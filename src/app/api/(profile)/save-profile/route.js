import { connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      _id,
      name,
      email,
      phone,
      city = "",
      instaId = "",
    } = await req.json();

    if (!_id || !name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDB();

    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          name,
          email,
          phone,
          city,
          instaId,
        },
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (err) {
    console.error("Error saving profile:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
