import { NextResponse } from "next/server";
import { Resend } from "resend";
import { connectToDB } from "@/lib/utils";
import { Cart } from "@/lib/models";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const file = formData.get("file");
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const TotalAmount = formData.get("TotalAmount");
    const userId = formData.get("userId");

    let purchasedItems = [];
    const purchasedItemsRaw = formData.get("purchasedItems");

    if (purchasedItemsRaw) {
      try {
        purchasedItems = JSON.parse(purchasedItemsRaw);
      } catch (err) {
        console.error("Failed to parse purchasedItems:", purchasedItemsRaw);
      }
    }

    console.log("Parsed purchasedItems:", purchasedItems);

    const buffer = Buffer.from(await file.arrayBuffer());
    const base64Content = buffer.toString("base64");
    // Prepare form data to send to Kevin's verifier API
    const verifyFormData = new FormData();
    verifyFormData.append("name", name);
    verifyFormData.append("email", email);
    verifyFormData.append("amount", TotalAmount);
    verifyFormData.append("products", JSON.stringify(purchasedItems));
    verifyFormData.append(
      "file",
      new Blob([buffer], { type: file.type }),
      file.name
    );

    // Send to verification API
    const verifyResponse = await fetch(
      "https://kevin-payment-verifier.onrender.com/api/verify",
      {
        method: "POST",
        body: verifyFormData,
      }
    );

    await connectToDB();
    await Cart.findOneAndDelete({ userId });

    const resend = new Resend(process.env.RESEND_API_KEY);

    const productLines = purchasedItems
      .map((item) => `• ${item.title} - ₹${item.price}`)
      .join("<br>");

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: [process.env.EMAIL_RECEIVER],
      subject: `New Payment Screenshot from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Total Amount:</strong> ₹${TotalAmount}</p>
        ${
          productLines
            ? `<p><strong>Purchased Items:</strong><br>${productLines}</p>`
            : ""
        }
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
