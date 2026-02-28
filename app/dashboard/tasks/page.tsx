"use client";

import { useState, useEffect } from "react";
import { getTasks, deleteTask } from "@/app/actions/tasks";
import { Plus, Search, Filter, MoreHorizontal, Trash2, Edit3, Loader2 } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { TaskForm } from "@/components/dashboard/task-form";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"create" | "edit" | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = () => {
    setSelectedTask(null);
    setModalMode("create");
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setModalMode("edit");
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Project Tasks</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage, track, and assign tasks to your team members.</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all"
        >
          <Plus size={20} />
          Create Task
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-orange-500 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-xs font-bold text-neutral-500">
            <Filter size={16} />
            Status
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-xs font-bold text-neutral-500">
            Priority
          </button>
        </div>
      </div>

      {/* Task Table */}
      <div className="bg-white dark:bg-neutral-900 rounded-3xl border border-gray-100 dark:border-neutral-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-50 dark:border-neutral-800">
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Task Details</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">Assignees</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">Priority</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-neutral-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-neutral-800">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center">
                    <Loader2 className="mx-auto animate-spin text-orange-500" size={32} />
                  </td>
                </tr>
              ) : tasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-neutral-500">
                    No tasks found. Create one to get started!
                  </td>
                </tr>
              ) : (
                tasks.map((task) => (
                  <tr key={task.id} className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                    <td className="px-8 py-5">
                      <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{task.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-1">{task.description}</p>
                    </td>
                     <td className="px-8 py-5">
                       <div className="flex -space-x-2 items-center justify-center">
                         <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900">
                           <Image src={`https://i.pravatar.cc/150?u=${task.id}`} fill className="object-cover" alt="Avatar" />
                         </div>
                         <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-white dark:border-neutral-900">
                           <Image src={`https://i.pravatar.cc/150?u=${task.id}2`} fill className="object-cover" alt="Avatar" />
                         </div>
                       </div>
                     </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter
                        ${task.priority === "high" ? "bg-red-50 text-red-500 dark:bg-red-950/20" : 
                          task.priority === "medium" ? "bg-orange-50 text-orange-500 dark:bg-orange-950/20" : 
                          "bg-blue-50 text-blue-500 dark:bg-blue-950/20"}`}>
                        {task.priority || "Medium"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase
                        ${task.status === "completed" ? "bg-green-500 text-white" : 
                          task.status === "in-progress" ? "bg-orange-500 text-white" : 
                          "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"}`}>
                        {task.status || "todo"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => handleEdit(task)}
                          className="p-2 text-neutral-400 hover:text-orange-500 bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(task.id)}
                          className="p-2 text-neutral-400 hover:text-red-500 bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Task Modal */}
      <Modal
        isOpen={!!modalMode}
        onClose={() => setModalMode(null)}
        title={modalMode === "create" ? "Create New Task" : "Edit Task"}
      >
        <TaskForm 
          initialData={selectedTask} 
          onSuccess={() => {
            setModalMode(null);
            fetchTasks();
          }} 
        />
      </Modal>
    </div>
  );
}
