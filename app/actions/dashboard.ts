"use server";

import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock 
} from "lucide-react";

// In a real app, these would fetch from Prisma/Postgres
export async function getDashboardStats() {
  return [
    { title: "Tasks Completed", value: "84%", change: "+12.5%", isUp: true, iconName: "CheckCircle2" },
    { title: "Projects Active", value: "12", change: "+2", isUp: true, iconName: "TrendingUp" },
    { title: "Task Overview", value: "92%", change: "-2.4%", isUp: false, iconName: "Users" },
    { title: "Time Spent", value: "142h", change: "+18h", isUp: true, iconName: "Clock" },
  ];
}

export async function getProjectProgress() {
  return [
    { name: "Mon", progress: 40, tasks: 24 },
    { name: "Tue", progress: 30, tasks: 13 },
    { name: "Wed", progress: 65, tasks: 38 },
    { name: "Thu", progress: 45, tasks: 26 },
    { name: "Fri", progress: 90, tasks: 45 },
    { name: "Sat", progress: 70, tasks: 30 },
    { name: "Sun", progress: 85, tasks: 40 },
  ];
}

export async function getDeadlines() {
  return [
    { name: "Mar 10", value: 80 },
    { name: "Mar 15", value: 45 },
    { name: "Mar 20", value: 60 },
    { name: "Mar 25", value: 90 },
  ];
}

export async function getKanbanData() {
  return [
    { 
      id: "todo", 
      title: "To Do", 
      color: "bg-blue-500",
      tasks: [
        { id: 1, title: "Design Landing Page", priority: "High", date: "Mar 12", tags: ["Design", "UI"] },
        { id: 2, title: "Setup Database Schema", priority: "Medium", date: "Mar 15", tags: ["Backend"] },
      ]
    },
    { 
      id: "inprogress", 
      title: "In Progress", 
      color: "bg-orange-500",
      tasks: [
        { id: 3, title: "Develop Auth Flow", priority: "High", date: "Mar 10", tags: ["Security"] },
        { id: 4, title: "User Interview Analysis", priority: "Low", date: "Mar 08", tags: ["Research"] },
      ]
    },
    { 
      id: "completed", 
      title: "Completed", 
      color: "bg-green-500",
      tasks: [
        { id: 5, title: "Initial Project Setup", priority: "Medium", date: "Feb 28", tags: ["System"] },
        { id: 6, title: "Domain Registration", priority: "Low", date: "Feb 26", tags: ["Web"] },
      ]
    },
  ];
}

export async function getTeamActivity() {
  return [
    { id: 1, user: "Alice", action: "uploaded a new document", project: "Project Alpha", time: "10m ago", avatar: "https://i.pravatar.cc/150?u=Alice" },
    { id: 2, user: "Bob", action: "set a deadline for tomorrow", project: "Project Beta", time: "25m ago", avatar: "https://i.pravatar.cc/150?u=Bob" },
    { id: 3, user: "Charlie", action: "approved the design of", project: "Landing Page", time: "1h ago", avatar: "https://i.pravatar.cc/150?u=Charlie" },
    { id: 4, user: "David", action: "started a new sprint", project: "Q1 Roadmap", time: "2h ago", avatar: "https://i.pravatar.cc/150?u=David" },
    { id: 5, user: "Alice", action: "invited 3 members to", project: "Nexus UI", time: "4h ago", avatar: "https://i.pravatar.cc/150?u=Alice" },
  ];
}
