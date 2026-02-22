"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  const session = await getServerSession(authOptions);
  // Using email as a fallback if ID isn't mapped, but ID is preferred
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) return [];

  return await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(formData: FormData) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) throw new Error("User not found");

  await prisma.task.create({
    data: {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      status: "todo",
      priority: (formData.get("priority") as string) || "medium",
      userId: user.id,
    },
  });

  revalidatePath("/dashboard/tasks");
}

export async function updateTaskStatus(id: string, status: string) {
  await prisma.task.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/dashboard/tasks");
}

export async function deleteTask(id: string) {
  await prisma.task.delete({ where: { id } });
  revalidatePath("/dashboard/tasks");
}
