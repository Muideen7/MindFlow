"use client";

import { useState, useEffect } from "react";
import { getTasks, createTask, deleteTask } from "@/app/actions/tasks"; // Added deleteTask
import { Plus, X, Loader2, Trash2 } from "lucide-react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("medium");
  const [status, setStatus] = useState("todo");

  const fetchTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;

    setIsDeleting(id);
    try {
      await deleteTask(id);
      await fetchTasks(); // Refresh list
    } catch (error) {
      console.error("Delete failed", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createTask({ title, description, priority, status });
      setIsModalOpen(false);
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Project Tasks</h1>
          <p className="opacity-60 text-sm">
            Manage and track your team's progress.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-500/20"
        >
          <Plus size={20} />
          Create Task
        </button>
      </div>

      <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[10px] uppercase font-bold opacity-50 bg-[hsl(var(--muted))] tracking-widest">
              <tr>
                <th className="px-6 py-4">Task Name</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-12 text-center opacity-40 italic"
                  >
                    No tasks found.
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-orange-50/30 dark:hover:bg-orange-950/10 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <p className="font-bold text-sm">{task.title}</p>
                      <p className="text-xs opacity-50 truncate max-w-[200px]">
                        {task.description}
                      </p>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-[10px] uppercase font-black px-2 py-0.5 border rounded-md ${
                          task.priority === "high"
                            ? "border-red-200 bg-red-50 text-red-600"
                            : task.priority === "medium"
                              ? "border-amber-200 bg-amber-50 text-amber-600"
                              : "border-emerald-200 bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                          task.status === "done"
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 dark:bg-slate-800"
                        }`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        onClick={() => handleDelete(task.id)}
                        disabled={isDeleting === task.id}
                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                      >
                        {isDeleting === task.id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Task Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-[hsl(var(--border))] flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
              <h2 className="font-bold text-xl">New Task</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="opacity-40 hover:opacity-100 transition-opacity"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase opacity-50 ml-1">
                  Task Title
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Design System Update"
                  className="w-full bg-[hsl(var(--muted))] border-none rounded-2xl p-4 focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase opacity-50 ml-1">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="What needs to be done?"
                  className="w-full bg-[hsl(var(--muted))] border-none rounded-2xl p-4 min-h-[100px] focus:ring-2 focus:ring-orange-500 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase opacity-50 ml-1">
                    Priority
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-[hsl(var(--muted))] border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase opacity-50 ml-1">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full bg-[hsl(var(--muted))] border-none rounded-xl p-3 focus:ring-2 focus:ring-orange-500 font-bold text-sm"
                  >
                    <option value="todo">To Do</option>
                    <option value="in-progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-2xl transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  "Add Task to Workspace"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
