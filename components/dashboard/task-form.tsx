"use client";

import { useState } from "react";
import { createTask, updateTask } from "@/app/actions/tasks";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

interface TaskFormProps {
  initialData?: any;
  onSuccess: () => void;
}

export function TaskForm({ initialData, onSuccess }: TaskFormProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    priority: initialData?.priority || "Medium",
    status: initialData?.status || "todo",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        priority: formData.priority.toLowerCase(),
        status: formData.status.toLowerCase().replace(" ", "-"),
      };

      if (initialData?.id) {
        await updateTask(initialData.id, payload);
      } else {
        await createTask(payload);
      }
      onSuccess();
      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Title</label>
        <input
          required
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none transition-all"
          placeholder="What needs to be done?"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Description</label>
        <textarea
          rows={3}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none transition-all resize-none"
          placeholder="Add more details..."
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Priority</label>
          <select
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Status</label>
          <select
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            className="w-full px-4 py-3 bg-neutral-100 dark:bg-neutral-800 border-none rounded-xl text-sm font-semibold focus:ring-2 focus:ring-orange-500 outline-none transition-all appearance-none"
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </div>
      </div>

      <div className="flex gap-4 pt-4">
        <button
          disabled={loading}
          type="submit"
          className="flex-1 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading && <Loader2 size={16} className="animate-spin" />}
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </div>
    </form>
  );
}
