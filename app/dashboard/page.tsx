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

export default async function DashboardPage() {
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
        <h1 className="text-3xl font-black text-black tracking-tightest">Project Dashboard</h1>
        <p className="text-[10px] uppercase font-bold text-black/40 tracking-widest mt-2">Monitor your team productivity and project health in real-time.</p>
      </div>

      {/* Top Section: Stat Cards */}
      <StatCards stats={stats} />

      {/* Middle Section: Charts & Deadlines */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3">
          <ProjectProgress data={progressData} />
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingDeadlines data={deadlines} />
        </div>
      </div>

      {/* Bottom Section: Kanban & Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        <div className="xl:col-span-3 space-y-6">
          <div className="flex justify-between items-center border-b border-black/5 pb-4">
            <h3 className="text-sm font-bold text-black uppercase tracking-widest">
              Project Board
            </h3>
            <button className="text-[10px] font-bold text-black/40 uppercase tracking-widest hover:text-black transition-colors">
              View All Tasks
            </button>
          </div>
          <KanbanBoard data={kanbanData} />
        </div>
        <div className="xl:col-span-1 h-full">
          <ActivityFeed data={activityData} />
        </div>
      </div>
    </div>
  );
}
