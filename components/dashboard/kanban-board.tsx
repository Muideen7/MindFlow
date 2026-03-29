"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { motion } from "framer-motion";
import { MoreHorizontal, Plus, Calendar, Tag, Clock, User as UserIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { TaskForm } from "@/components/dashboard/task-form";
import { UserAvatar } from "@/components/ui/user-avatar";

const COLUMNS = [
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
    color: "bg-violet-500",
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

export function KanbanBoard({ data }: { data: any[] }) {
  const { data: session } = useSession();
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  const closeModal = () => {
    setSelectedTask(null);
    setIsEditing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {data.map((column: any, i: number) => (
        <div key={column.id} className="flex flex-col h-full min-h-[500px]">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${column.color}`} />
              <h4 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
                {column.title}
              </h4>
              <span className="text-xs text-neutral-400 bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full">
                {column.tasks.length}
              </span>
            </div>
            <button className="p-1 text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <Plus size={18} />
            </button>
          </div>

          <div className="space-y-4 flex-1">
            {column.tasks.map((task: any) => (
              <motion.div
                key={task.id}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedTask(task)}
                className="bg-white dark:bg-neutral-900 p-4 rounded-xl border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter
                    ${task.priority === "High" ? "bg-red-50 text-red-500 dark:bg-red-950/20" : 
                      task.priority === "Medium" ? "bg-violet-50 text-violet-500 dark:bg-violet-950/20" : 
                      "bg-blue-50 text-blue-500 dark:bg-blue-950/20"}`}>
                    {task.priority}
                  </span>
                  <button className="text-neutral-300 group-hover:text-neutral-600 transition-colors">
                    <MoreHorizontal size={14} />
                  </button>
                </div>
                
                <h5 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3 group-hover:text-violet-500 transition-colors">
                  {task.title}
                </h5>

                <div className="flex flex-wrap gap-2 mb-4">
                  {task.tags.map((tag: string) => (
                    <span key={tag} className="flex items-center gap-1 text-[10px] font-bold text-neutral-400">
                      <Tag size={10} />
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-50 dark:border-neutral-800">
                  <div className="flex items-center gap-1 text-[10px] text-neutral-400 font-bold">
                    <Calendar size={12} />
                    {task.date}
                  </div>
                  <div className="flex -space-x-1.5">
                    <UserAvatar 
                      name={session?.user?.name}
                      image={session?.user?.image}
                      size="sm"
                      className="w-5 h-5 border border-white dark:border-neutral-950"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      <Modal
        isOpen={!!selectedTask}
        onClose={closeModal}
        title={isEditing ? "Edit Task" : "Task Details"}
      >
        {selectedTask && (
          <div className="space-y-6">
            {isEditing ? (
              <TaskForm 
                initialData={selectedTask} 
                onSuccess={() => {
                  setIsEditing(false);
                  // Optionally refresh selectedTask here if needed, 
                  // but router.refresh in TaskForm handles global state
                }} 
              />
            ) : (
              <>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter
                      ${selectedTask.priority === "High" ? "bg-red-50 text-red-500 dark:bg-red-950/20" : 
                        selectedTask.priority === "Medium" ? "bg-violet-50 text-violet-500 dark:bg-violet-950/20" : 
                        "bg-blue-50 text-blue-500 dark:bg-blue-950/20"}`}>
                      {selectedTask.priority} Priority
                    </span>
                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-tighter">
                      ID: MIN-{selectedTask.id}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-neutral-900 dark:text-white">
                    {selectedTask.title}
                  </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100 dark:border-neutral-800">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Due Date</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                      <Calendar size={14} className="text-violet-500" />
                      {selectedTask.date}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Estimate</p>
                    <div className="flex items-center gap-2 text-sm font-semibold text-neutral-900 dark:text-white">
                      <Clock size={14} className="text-violet-500" />
                      4-6 hours
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Assignees</p>
                  <div className="flex items-center gap-2">
                    <UserAvatar 
                      name={session?.user?.name}
                      image={session?.user?.image}
                      size="md"
                    />
                    <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">Assign To Me</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Description</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {selectedTask.description || "No description provided."}
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="flex-1 py-2.5 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white rounded-xl font-bold text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                  >
                    Edit Task
                  </button>
                  <button 
                    onClick={closeModal}
                    className="flex-1 py-2.5 bg-violet-500 text-white rounded-xl font-bold text-sm hover:bg-violet-600 transition-all shadow-lg shadow-violet-500/20"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}
