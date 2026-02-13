import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { token, email } = await req.json();

    if (!token || !email) {
      return NextResponse.json(
        { message: "Missing token or email" },
        { status: 400 }
      );
    }

    const verificationToken = await prisma.verificationToken.findUnique({
      where: {
        email_token: {
          email,
          token,
        },
      },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { message: "Invalid verification token" },
        { status: 400 }
      );
    }

    if (verificationToken.expires < new Date()) {
      return NextResponse.json(
        { message: "Verification token expired" },
        { status: 400 }
      );
    }

    const user = await prisma.user.update({
      where: { email },
      data: { emailVerified: new Date() },
    });

    await prisma.verificationToken.delete({
      where: {
        email_token: {
          email,
          token,
        },
      },
    });

    await sendWelcomeEmail(email, user.name || "User");

    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { message: "Verification failed" },
      { status: 500 }
    );
  }
}
