"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Loader2, AlertCircle } from "lucide-react";
import {
  getTasks,
  createTask,
  updateTaskStatus,
  deleteTask,
} from "@/app/actions/tasks";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    refreshTasks();
  }, []);

  async function refreshTasks() {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusUpdate = async (taskId: string, newStatus: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t)),
    );
    await updateTaskStatus(taskId, newStatus);
  };

  async function handleDelete(id: string) {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      await deleteTask(id);
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500/10 text-red-600 border-red-200";
      case "medium":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-200";
      default:
        return "bg-blue-500/10 text-blue-600 border-blue-200";
    }
  };

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center p-20 space-y-4">
        <Loader2 className="animate-spin text-orange-600" size={40} />
        <p className="text-sm opacity-60">Loading your workspace...</p>
      </div>
    );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-sm opacity-60">Manage your objectives</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md active:scale-95"
        >
          <Plus size={18} /> New Task
        </button>
      </div>

      <div className="grid gap-4">
        {tasks.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-[hsl(var(--border))] rounded-2xl">
            <AlertCircle className="mx-auto mb-4 opacity-20" size={48} />
            <p className="opacity-50">
              No tasks found. Create one to get started!
            </p>
          </div>
        ) : (
          tasks.map((task) => (
            <div
              key={task.id}
              className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-4 rounded-xl flex justify-between items-center group hover:shadow-lg transition-all"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-semibold">{task.title}</h3>
                  <span
                    className={`text-[10px] uppercase font-bold px-2 py-0.5 border rounded-full ${getPriorityClass(task.priority)}`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p className="text-sm opacity-60 max-w-md">
                  {task.description}
                </p>
              </div>

              {/* Status & Actions - This is the part that was missing from your cards! */}
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-bold opacity-40 uppercase ml-1">
                    Status
                  </label>
                  <select
                    value={task.status}
                    onChange={(e) =>
                      handleStatusUpdate(task.id, e.target.value)
                    }
                    className="bg-transparent border border-[hsl(var(--border))] text-xs rounded-lg p-2 outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
                  >
                    <option value="todo">🎯 To-Do</option>
                    <option value="in-progress">⚡ In Progress</option>
                    <option value="done">✅ Done</option>
                  </select>
                </div>

                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-red-500 opacity-0 group-hover:opacity-100 p-2 hover:bg-red-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <form
            action={async (fd) => {
              setIsPending(true);
              await createTask(fd);
              setIsModalOpen(false);
              await refreshTasks();
              setIsPending(false);
            }}
            className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] p-8 rounded-3xl w-full max-w-md space-y-5 shadow-2xl"
          >
            <h2 className="text-xl font-bold">Create Task</h2>
            <div className="space-y-4">
              <input
                name="title"
                placeholder="Title"
                required
                className="w-full p-3 bg-transparent border rounded-xl outline-none"
              />
              <textarea
                name="description"
                placeholder="Description"
                className="w-full p-3 bg-transparent border rounded-xl outline-none min-h-[100px]"
              />
              <select
                name="priority"
                className="w-full p-3 bg-transparent border rounded-xl outline-none"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 opacity-60"
              >
                Cancel
              </button>
              <button
                disabled={isPending}
                type="submit"
                className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Task"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
