import { 
  getDashboardStats, 
  getProjectProgress, 
  getDeadlines, 
  getKanbanData, 
  getTeamActivity 
} from "@/app/actions/dashboard";
import { StatCards, ProjectProgress, UpcomingDeadlines } from "@/components/dashboard/dashboard-widgets";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import Link from "next/link";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  
  // Fetch data on the server
  const [
    stats,
    progressData,
    deadlines,
    kanbanData,
    activityData
  ] = await Promise.all([
    getDashboardStats(),
    getProjectProgress(),
    getDeadlines(),
    getKanbanData(),
    getTeamActivity(),
  ]);

  return (
    <div className="space-y-8 pb-12">
      {/* Heading */}
      <div>
        <h1 className="text-3xl font-black text-black dark:text-white tracking-tightest">Project Dashboard</h1>
        <p className="text-[10px] uppercase font-bold text-black/40 dark:text-white/40 tracking-widest mt-2">Monitor your team productivity and project health in real-time.</p>
      </div>

      {/* Top Section: Stat Cards */}
      <StatCards stats={stats} />

      {/* Main Dashboard Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
        {/* Left Column: Progress & Kanban */}
        <div className="xl:col-span-3 space-y-8">
          <ProjectProgress data={progressData} />
          
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b border-black/5 dark:border-white/5 pb-4">
              <h3 className="text-sm font-bold text-black dark:text-white uppercase tracking-widest">
                Project Board
              </h3>
              <Link 
                href="/dashboard/tasks"
                className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase tracking-widest hover:text-black dark:hover:text-white transition-colors"
              >
                 View All Tasks
              </Link>
            </div>
            <KanbanBoard data={kanbanData} />
          </div>
        </div>

        {/* Right Column: Deadlines & Activity */}
        <div className="xl:col-span-1 space-y-6 lg:sticky lg:top-24">
          <UpcomingDeadlines data={deadlines} />
          <ActivityFeed data={activityData} />
        </div>
      </div>
    </div>
  );
}
