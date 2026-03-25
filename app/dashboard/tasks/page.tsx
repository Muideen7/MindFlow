"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { getTasks, deleteTask } from "@/app/actions/tasks";
import { Plus, Search, Filter, MoreHorizontal, Trash2, Edit3, Loader2 } from "lucide-react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { TaskForm } from "@/components/dashboard/task-form";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalMode, setModalMode] = useState<"create" | "edit" | "view" | null>(null);
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const data = await getTasks();
      setTasks(data);
    } finally {
      setIsLoading(false);
    }
  };

  const searchParams = useSearchParams();

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    const taskId = searchParams.get("taskId");
    if (taskId && tasks.length > 0) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        setSelectedTask(task);
        setModalMode("view");
      }
    }
  }, [searchParams, tasks]);

  const handleCreate = () => {
    setSelectedTask(null);
    setModalMode("create");
  };

  const handleEdit = (task: any) => {
    setSelectedTask(task);
    setModalMode("edit");
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this task?")) return;
    await deleteTask(id);
    fetchTasks();
  };

  const handleRowClick = (task: any) => {
    setSelectedTask(task);
    setModalMode("view");
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || task.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Project Tasks</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage, track, and assign tasks to your team members.</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-5 py-2.5 bg-violet-500 text-white rounded-xl font-bold shadow-lg shadow-violet-500/20 hover:bg-violet-600 transition-all active:scale-95"
        >
          <Plus size={20} />
          Create Task
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-violet-500 transition-colors" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks by title or content..."
            className="w-full pl-12 pr-4 py-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-violet-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-xs font-bold text-neutral-500 outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="all">Status: All</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <select 
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-4 py-3 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-2xl text-xs font-bold text-neutral-500 outline-none focus:ring-2 focus:ring-violet-500/20"
          >
            <option value="all">Priority: All</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
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
                    <Loader2 className="mx-auto animate-spin text-violet-500" size={32} />
                  </td>
                </tr>
              ) : filteredTasks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-neutral-500">
                    No results found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredTasks.map((task) => (
                  <tr 
                    key={task.id} 
                    onClick={() => handleRowClick(task)}
                    className="group hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer"
                  >
                    <td className="px-8 py-5">
                      <h4 className="font-bold text-neutral-900 dark:text-white mb-1">{task.title}</h4>
                      <p className="text-xs text-neutral-400 line-clamp-1">{task.description}</p>
                    </td>
                     <td className="px-8 py-5 text-center">
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
                          task.priority === "medium" ? "bg-violet-50 text-violet-500 dark:bg-violet-950/20" : 
                          "bg-blue-50 text-blue-500 dark:bg-blue-950/20"}`}>
                        {task.priority || "Medium"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase
                        ${task.status === "completed" ? "bg-green-500 text-white" : 
                          task.status === "in-progress" ? "bg-violet-500 text-white" : 
                          "bg-neutral-100 dark:bg-neutral-800 text-neutral-400"}`}>
                        {task.status || "todo"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-1 group-hover:translate-x-0">
                        <button 
                          onClick={(e) => { e.stopPropagation(); handleEdit(task); }}
                          className="p-2 text-neutral-400 hover:text-violet-500 bg-neutral-100 dark:bg-neutral-800 rounded-lg transition-all"
                        >
                          <Edit3 size={16} />
                        </button>
                        <button 
                          onClick={(e) => handleDelete(task.id, e)}
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
        title={
          modalMode === "create" ? "Create New Task" : 
          modalMode === "edit" ? "Edit Task" : 
          "Task Overview"
        }
      >
        {modalMode === "view" && selectedTask ? (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter 
                  ${selectedTask.priority === "high" ? "bg-red-50 text-red-500" : "bg-violet-50 text-violet-500"}`}>
                  {selectedTask.priority} Priority
                </span>
                <span className="text-[10px] font-bold text-neutral-400 uppercase">
                  Created: {new Date(selectedTask.createdAt || Date.now()).toLocaleDateString()}
                </span>
              </div>
              <h2 className="text-xl font-bold text-neutral-900 dark:text-white uppercase tracking-tight">
                {selectedTask.title}
              </h2>
            </div>
            
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-2xl border border-black/5 dark:border-white/5">
               <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-2">Description</p>
               <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                 {selectedTask.description || "No detailed description provided for this task."}
               </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="p-3 bg-violet-50 dark:bg-violet-950/20 rounded-xl">
                  <p className="text-[10px] font-bold text-violet-400 uppercase tracking-widest mb-1">Status</p>
                  <p className="text-sm font-bold text-violet-700 dark:text-violet-300 capitalize">{selectedTask.status}</p>
               </div>
               <div className="p-3 bg-neutral-100 dark:bg-neutral-900 rounded-xl">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Assigned Team</p>
                  <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">Design & Dev</p>
               </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button 
                onClick={() => setModalMode("edit")}
                className="flex-1 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-bold text-xs hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors uppercase tracking-widest"
              >
                Modify
              </button>
              <button 
                onClick={() => setModalMode(null)}
                className="flex-1 py-3 bg-violet-500 text-white rounded-xl font-bold text-xs hover:bg-violet-600 transition-all shadow-lg shadow-violet-500/20 uppercase tracking-widest"
              >
                Got it
              </button>
            </div>
          </div>
        ) : (
          <TaskForm 
            initialData={selectedTask} 
            onSuccess={() => {
              setModalMode(null);
              fetchTasks();
            }} 
          />
        )}
      </Modal>
    </div>
  );
}
