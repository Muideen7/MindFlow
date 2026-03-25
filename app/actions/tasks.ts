"use server";

import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";

// Helper to get current user ID
async function getUserId() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  return user?.id || null;
}

export async function getTasks() {
  const userId = await getUserId();
  if (!userId) return [];

  return await prisma.task.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });
}

export async function createTask(data: {
  title: string;
  description: string;
  priority: string;
  status: string;
}) {
  try {
    const userId = await getUserId();
    if (!userId) throw new Error("Unauthorized");

    const newTask = await prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        status: data.status,
        userId: userId, // CRITICAL: Connect the task to the user
      },
    });

    revalidatePath("/dashboard/tasks");
    revalidatePath("/dashboard");

    return { success: true, task: newTask };
  } catch (error) {
    console.error("Task creation failed:", error);
    return { success: false, error: "Database error" };
  }
}

export async function updateTaskStatus(id: string, status: string) {
  await prisma.task.update({
    where: { id },
    data: { status },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/tasks");
}

export async function updateTask(id: string, data: {
  title?: string;
  description?: string;
  priority?: string;
  status?: string;
}) {
  try {
    const updatedTask = await prisma.task.update({
      where: { id },
      data,
    });
    revalidatePath("/dashboard/tasks");
    revalidatePath("/dashboard");
    return { success: true, task: updatedTask };
  } catch (error) {
    console.error("Task update failed:", error);
    return { success: false, error: "Database error" };
  }
}

export async function deleteTask(id: string) {
  try {
    await prisma.task.delete({ where: { id } });
    revalidatePath("/dashboard/tasks");
    revalidatePath("/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Task deletion failed:", error);
    return { success: false, error: "Database error" };
  }
}

export async function searchGlobal(query: string) {
  if (!query || query.length < 2) return [];
  
  const userId = await getUserId();
  if (!userId) return [];

  // Search tasks
  const tasks = await prisma.task.findMany({
    where: {
      userId,
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ],
    },
    take: 5,
    orderBy: { createdAt: 'desc' }
  });

  // Simulated projects for now as there's no Project model yet
  const simulatedProjects = [
    { id: 'p1', title: 'MindFlow UI', type: 'Project' },
    { id: 'p2', title: 'Marketing Campaign', type: 'Project' },
    { id: 'p3', title: 'Q1 Roadmap', type: 'Project' },
  ].filter(p => p.title.toLowerCase().includes(query.toLowerCase()));

  return [
    ...simulatedProjects.map(p => ({ ...p, category: 'project' })),
    ...tasks.map(t => ({ id: t.id, title: t.title, type: 'Task', category: 'task', status: t.status }))
  ];
}
