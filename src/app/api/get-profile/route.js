import { connectToDB } from "@/lib/utils";
import { User } from "@/lib/models";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await connectToDB();

    const { userId } = await req.json();
    const user = await User.findById(userId).lean();

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });
  } catch (err) {
    console.error("Error fetching user profile", err);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
