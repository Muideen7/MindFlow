"use client";

import { useState } from "react";
import { Plus, X, ChevronRight, Flag } from "lucide-react";
import { updateTaskStatus } from "@/app/dashboard/actions";

interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate?: string;
}

const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design new dashboard layout",
    description: "Create mockups for the updated dashboard with glassmorphism",
    status: "done",
    priority: "high",
    dueDate: "2024-04-20",
  },
  {
    id: "2",
    title: "Implement authentication",
    description: "Set up NextAuth with email verification",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-04-18",
  },
  {
    id: "3",
    title: "Add task management feature",
    description: "Build task creation and tracking system",
    status: "todo",
    priority: "high",
    dueDate: "2024-04-25",
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "done":
        return "bg-green-500/20 text-green-600 dark:text-green-400";
      case "in-progress":
        return "bg-blue-500/20 text-blue-600 dark:text-blue-400";
      case "todo":
        return "bg-gray-500/20 text-gray-600 dark:text-gray-400";
      default:
        return "";
    }
  };

  const getPriorityIcon = (priority: string) => {
    return (
      <Flag
        size={16}
        className={
          priority === "high"
            ? "text-red-500"
            : priority === "medium"
              ? "text-yellow-500"
              : "text-green-500"
        }
      />
    );
  };

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus as any } : t
      )
    );
    await updateTaskStatus(taskId, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-light-text dark:text-dark-text">
            Tasks
          </h1>
          <p className="text-light-text/60 dark:text-dark-text/60">
            Manage and track your work
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-light-accent dark:bg-dark-accent text-white rounded-lg hover:opacity-90 transition">
          <Plus size={18} />
          New Task
        </button>
      </div>

      {/* Task Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-light-bg-secondary dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4">
          <p className="text-light-text/60 dark:text-dark-text/60 text-sm">
            To-Do
          </p>
          <p className="text-2xl font-bold text-light-text dark:text-dark-text mt-1">
            {tasks.filter((t) => t.status === "todo").length}
          </p>
        </div>
        <div className="bg-light-bg-secondary dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4">
          <p className="text-light-text/60 dark:text-dark-text/60 text-sm">
            In Progress
          </p>
          <p className="text-2xl font-bold text-light-text dark:text-dark-text mt-1">
            {tasks.filter((t) => t.status === "in-progress").length}
          </p>
        </div>
        <div className="bg-light-bg-secondary dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4">
          <p className="text-light-text/60 dark:text-dark-text/60 text-sm">
            Done
          </p>
          <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-1">
            {tasks.filter((t) => t.status === "done").length}
          </p>
        </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-light-bg-secondary dark:bg-dark-bg-card border border-light-border dark:border-dark-border rounded-lg p-4 hover:border-light-accent/50 dark:hover:border-dark-accent/50 cursor-pointer transition group"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-semibold text-light-text dark:text-dark-text group-hover:text-light-accent dark:group-hover:text-dark-accent transition">
                  {task.title}
                </h3>
                <p className="text-sm text-light-text/60 dark:text-dark-text/60 mt-1">
                  {task.description}
                </p>
                <div className="flex gap-2 mt-3">
                  <span className={`text-xs px-2 py-1 rounded ${getStatusColor(task.status)}`}>
                    {task.status.replace("-", " ")}
                  </span>
                  <div className="flex items-center gap-1">
                    {getPriorityIcon(task.priority)}
                    <span className="text-xs text-light-text/60 dark:text-dark-text/60">
                      {task.priority}
                    </span>
                  </div>
                </div>
              </div>
              <ChevronRight className="text-light-text/40 dark:text-dark-text/40 group-hover:text-light-accent dark:group-hover:text-dark-accent transition" />
            </div>
          </div>
        ))}
      </div>

      {/* Slide-over Panel */}
      {selectedTask && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setSelectedTask(null)}
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-96 bg-light-bg dark:bg-dark-bg border-l border-light-border dark:border-dark-border shadow-xl overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-light-text dark:text-dark-text">
                  Task Details
                </h2>
                <button
                  onClick={() => setSelectedTask(null)}
                  className="p-2 hover:bg-light-accent/10 dark:hover:bg-dark-accent/10 rounded-lg transition"
                >
                  <X size={20} className="text-light-text dark:text-dark-text" />
                </button>
              </div>

              {/* Task Title */}
              <div>
                <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
                  {selectedTask.title}
                </h3>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-light-text/60 dark:text-dark-text/60 mb-2">
                  Status
                </label>
                <select
                  value={selectedTask.status}
                  onChange={(e) =>
                    handleStatusChange(selectedTask.id, e.target.value)
                  }
                  className={`w-full px-3 py-2 rounded-lg border ${getStatusColor(selectedTask.status)} bg-light-bg dark:bg-dark-bg border-light-border dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent`}
                >
                  <option value="todo">To-Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>

              {/* Priority */}
              <div>
                <label className="block text-sm font-medium text-light-text/60 dark:text-dark-text/60 mb-2">
                  Priority
                </label>
                <select
                  defaultValue={selectedTask.priority}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-light-text/60 dark:text-dark-text/60 mb-2">
                  Description
                </label>
                <textarea
                  defaultValue={selectedTask.description}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text placeholder-light-text/50 dark:placeholder-dark-text/50 focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent resize-none"
                  rows={4}
                />
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-sm font-medium text-light-text/60 dark:text-dark-text/60 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  defaultValue={selectedTask.dueDate}
                  className="w-full px-3 py-2 rounded-lg bg-light-bg dark:bg-dark-bg border border-light-border dark:border-dark-border text-light-text dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-light-accent dark:focus:ring-dark-accent"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
