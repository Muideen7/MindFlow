"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateProfile(formData: {
  name: string;
  status: string;
  image?: string;
}) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    throw new Error("Unauthorized");
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        name: formData.name,
        status: formData.status,
        image: formData.image,
      },
    });

    // This refreshes the layout and profile page with new data
    revalidatePath("/dashboard");
    revalidatePath("/dashboard/profile");

    return { success: true, user: updatedUser };
  } catch (error) {
    console.error("Profile Update Error:", error);
    return { success: false, error: "Failed to update profile" };
  }
}
