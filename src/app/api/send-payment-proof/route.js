import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDB } from "@/lib/utils";
import { Cart } from "@/lib/models";
import { revalidatePath } from "next/cache";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const TotalAmount = formData.get("TotalAmount");
    const userId = formData.get("userId");

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Content = buffer.toString("base64");

    await connectToDB();
    await Cart.findOneAndDelete({ userId });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [process.env.EMAIL_RECEIVER],
      subject: `New Payment Screenshot from ${name}`,
      html: `
        <p><strong>Name : </strong> ${name}</p>
        <p><strong>Email : </strong> ${email}</p>
        <p><strong>Phone : </strong> ${phone}</p>
        <p><strong>Total Amount to be paid : </strong> ${TotalAmount}</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: base64Content,
        },
      ],
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
