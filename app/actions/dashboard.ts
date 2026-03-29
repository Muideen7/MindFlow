"use server";

import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock 
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Helper to get current user
async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return null;
  return await prisma.user.findUnique({
    where: { email: session.user.email },
  });
}

export async function getDashboardStats() {
  const user = await getCurrentUser();
  if (!user) return [];

  const [totalCount, completedCount, inProgressCount] = await Promise.all([
    prisma.task.count({ where: { userId: user.id } }),
    prisma.task.count({ where: { userId: user.id, status: "completed" } }),
    prisma.task.count({ where: { userId: user.id, status: "in-progress" } }),
  ]);

  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  return [
    { 
      title: "Tasks Completed", 
      value: `${completionRate}%`, 
      change: `Of ${totalCount} total`, 
      isUp: true, 
      iconName: "CheckCircle2" 
    },
    { 
      title: "Tasks Pending", 
      value: (totalCount - completedCount).toString(), 
      change: `${inProgressCount} in progress`, 
      isUp: false, 
      iconName: "Clock" 
    },
    { 
      title: "Task Efficiency", 
      value: totalCount > 0 ? "8.2" : "0", 
      change: "Based on focus", 
      isUp: true, 
      iconName: "TrendingUp" 
    },
    { 
      title: "Workspace Size", 
      value: totalCount.toString(), 
      change: "Total items", 
      isUp: true, 
      iconName: "Users" 
    },
  ];
}

export async function getProjectProgress() {
  const user = await getCurrentUser();
  if (!user) return [];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const now = new Date();
  
  // Aggregate tasks for the last 7 days
  const last7Days = await Promise.all(
    Array.from({ length: 7 }).map(async (_, i) => {
      const d = new Date();
      d.setDate(now.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      
      const nextDay = new Date(d);
      nextDay.setDate(d.getDate() + 1);

      const tasksCreated = await prisma.task.count({
        where: {
          userId: user.id,
          createdAt: { gte: d, lt: nextDay }
        }
      });

      return {
        name: days[d.getDay()],
        progress: tasksCreated * 20 > 100 ? 100 : tasksCreated * 20, // Simplified progress logic
        tasks: tasksCreated
      };
    })
  );

  return last7Days;
}

export async function getDeadlines() {
  const user = await getCurrentUser();
  if (!user) return [];

  const now = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(now.getDate() + 7);

  const upcomingTasks = await prisma.task.findMany({
    where: {
      userId: user.id,
      status: { not: "completed" },
      dueDate: { gte: now, lte: nextWeek }
    },
    take: 4,
    orderBy: { dueDate: "asc" }
  });

  if (upcomingTasks.length === 0) {
    return [
      { name: "No Deadlines", value: 0 },
    ];
  }

  return upcomingTasks.map(t => ({
    name: t.title.substring(0, 10),
    value: 100 - ( (t.dueDate!.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) ) * 10
  }));
}

export async function getKanbanData() {
  const user = await getCurrentUser();
  if (!user) return [];

  const allTasks = await prisma.task.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  const columns = [
    { id: "todo", title: "To Do", color: "bg-blue-500", tasks: [] as any[] },
    { id: "inprogress", title: "In Progress", color: "bg-violet-500", tasks: [] as any[] },
    { id: "completed", title: "Completed", color: "bg-green-500", tasks: [] as any[] },
  ];

  allTasks.forEach(task => {
    const taskData = {
      id: task.id,
      title: task.title,
      priority: task.priority.charAt(0).toUpperCase() + task.priority.slice(1),
      date: new Date(task.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      tags: [task.priority],
      status: task.status
    };

    if (task.status === "todo") columns[0].tasks.push(taskData);
    else if (task.status === "in-progress") columns[1].tasks.push(taskData);
    else if (task.status === "completed") columns[2].tasks.push(taskData);
  });

  return columns;
}

export async function getTeamActivity() {
  const user = await getCurrentUser();
  if (!user) return [];

  const recentTasks = await prisma.task.findMany({
    where: { userId: user.id },
    take: 5,
    orderBy: { updatedAt: "desc" }
  });

  if (recentTasks.length === 0) {
    return [
      { id: 0, user: "System", action: "Welcome to MindFlow!", project: "Workspace", time: "just now", avatar: null }
    ];
  }

  return recentTasks.map((t, i) => {
    const isToday = new Date(t.updatedAt).toDateString() === new Date().toDateString();
    return {
      id: t.id,
      user: user.name || "User",
      action: t.status === "completed" ? "completed the task" : "working on",
      project: t.title,
      time: isToday ? "Today" : new Date(t.updatedAt).toLocaleDateString(),
      avatar: user.image
    };
  });
}
