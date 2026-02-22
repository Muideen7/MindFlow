import { getTasks } from "@/app/actions/tasks";
import { TaskChart } from "@/components/dashboard/Charts";
import {
  Folder,
  CheckSquare,
  Users,
  CheckCircle,
  Calendar,
  MoreHorizontal,
  Video,
} from "lucide-react";

export default async function DashboardHome() {
  // 1. Single fetch call
  const allTasks = await getTasks();

  // 2. Derive all stats from the single fetch
  const totalTasks = allTasks.length;
  const completedTasks = allTasks.filter((t) => t.status === "done").length;
  const inProgress = allTasks.filter((t) => t.status === "in-progress").length;

  const stats = [
    { label: "Active Projects", value: 3, icon: Folder },
    { label: "Total Tasks", value: totalTasks, icon: CheckSquare },
    { label: "Assigned Tasks", value: inProgress, icon: Users },
    { label: "Completed Tasks", value: completedTasks, icon: CheckCircle },
  ];

  const chartData = [
    { name: "Mon", tasks: 4 },
    { name: "Tue", tasks: 7 },
    { name: "Wed", tasks: 5 },
    { name: "Thu", tasks: 8 },
    { name: "Fri", tasks: 12 },
  ];

  // 3. Single return statement for the entire UI
  return (
    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
      {/* LEFT & MIDDLE SECTION */}
      <div className="xl:col-span-3 space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="opacity-60 text-sm">
            Welcome back to your Nexus workspace.
          </p>
        </div>

        {/* The 4 Nexus Orange Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-orange-50 dark:bg-orange-950/20 border border-orange-100 dark:border-orange-900/50 p-5 rounded-2xl flex justify-between items-start"
            >
              <div>
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest text-orange-700 dark:text-orange-400">
                  {stat.label}
                </p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
              </div>
              <stat.icon className="text-orange-600" size={20} />
            </div>
          ))}
        </div>

        {/* Task Velocity Chart */}
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl p-8">
          <h2 className="font-bold text-xl mb-6">Task Velocity</h2>
          <TaskChart data={chartData} />
        </div>

        {/* Project Table */}
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[hsl(var(--border))]">
            <h2 className="font-bold text-lg">Project Progress Summary</h2>
          </div>
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-[10px] uppercase opacity-50 font-bold">
              <tr>
                <th className="px-6 py-4">Project Name</th>
                <th className="px-6 py-4">Priority</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {allTasks.slice(0, 5).map((task) => (
                <tr
                  key={task.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium">{task.title}</td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full border border-orange-200 text-orange-700 bg-orange-50 dark:bg-orange-950 dark:text-orange-300 uppercase font-bold">
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right italic opacity-60 uppercase text-[10px] font-bold">
                    {task.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT SIDEBAR (Schedule) */}
      <div className="xl:col-span-1">
        <div className="bg-[hsl(var(--card))] border border-[hsl(var(--border))] rounded-3xl p-6 sticky top-24">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold text-lg">Schedule</h2>
            <MoreHorizontal size={18} className="opacity-30" />
          </div>

          <div className="space-y-6">
            <ScheduleItem title="Team Standup" time="09:00 AM" tag="Soon" />
            <ScheduleItem
              title="Design Review"
              time="11:30 AM"
              tag="Upcoming"
            />
          </div>

          <div className="mt-10 pt-10 border-t border-[hsl(var(--border))]">
            <p className="text-[10px] font-bold opacity-40 uppercase mb-4 text-center">
              Calendar
            </p>
            <div className="grid grid-cols-7 gap-2 text-center text-[10px]">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <div key={`${d}-${i}`} className="opacity-30 font-bold">
                  {d}
                </div>
              ))}
              {Array.from({ length: 28 }).map((_, i) => (
                <div
                  key={i}
                  className={`p-1 rounded-md ${i === 21 ? "bg-orange-600 text-white font-bold" : "opacity-60"}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScheduleItem({
  title,
  time,
  tag,
}: {
  title: string;
  time: string;
  tag: string;
}) {
  return (
    <div className="group cursor-pointer">
      <div className="flex justify-between items-start mb-1">
        <h3 className="font-semibold text-sm group-hover:text-orange-600 transition-colors">
          {title}
        </h3>
        <span className="text-[8px] bg-orange-100 text-orange-700 dark:bg-orange-900/40 dark:text-orange-400 px-2 py-0.5 rounded font-bold uppercase">
          {tag}
        </span>
      </div>
      <p className="text-xs opacity-50">{time}</p>
      <div className="flex items-center gap-2 text-[10px] opacity-40 mt-2">
        <Video size={12} />
        <span>Nexus Meet</span>
      </div>
    </div>
  );
}
