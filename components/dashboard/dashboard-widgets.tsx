"use client";

import { motion } from "framer-motion";
import { 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from "recharts";

// --- Icon Resolver ---
const IconMap: { [key: string]: any } = {
  CheckCircle2,
  TrendingUp,
  Users,
  Clock,
};

// --- Components ---

export function StatCards({ stats }: { stats: any[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, i) => {
        const Icon = IconMap[stat.iconName] || MoreHorizontal;
        return (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg text-neutral-500">
                <Icon size={20} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.isUp ? "text-green-500" : "text-red-500"}`}>
                {stat.isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                {stat.value}
              </h3>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

const DONUT_DATA = [
  { name: "Completed", value: 75, color: "#f97316" },
  { name: "Remaining", value: 25, color: "#fca5a5" },
];

const DONUT_DATA_2 = [
  { name: "On Track", value: 60, color: "#10b981" },
  { name: "At Risk", value: 40, color: "#ec4899" },
];

export function ProjectProgress({ data }: { data: any[] }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Large Line Chart Card */}
      <div className="lg:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Project Progress</h3>
            <p className="text-sm text-neutral-400">Weekly efficiency overview</p>
          </div>
          <select className="bg-neutral-100 dark:bg-neutral-800 border-none rounded-lg text-xs font-bold px-3 py-1.5 outline-none">
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="h-[300px] flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#9CA3AF" }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: "#9CA3AF" }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: "#ffffff", 
                    borderRadius: "12px", 
                    border: "none", 
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" 
                  }} 
                />
                <Line 
                  type="monotone" 
                  dataKey="progress" 
                  stroke="#f97316" 
                  strokeWidth={3} 
                  dot={{ r: 4, fill: "#f97316", strokeWidth: 2, stroke: "#fff" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[300px] w-full md:w-[150px] shrink-0 flex flex-col justify-end pb-4">
            <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-4">Volume</p>
            <ResponsiveContainer width="100%" height="60%">
              <BarChart data={data}>
                <Bar dataKey="tasks" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Donut & circular charts */}
      <div className="flex flex-col gap-6">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex-1">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Focus Rate</h3>
          <div className="flex items-center justify-between">
            <div className="h-24 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DONUT_DATA}
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DONUT_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">75%</p>
              <p className="text-xs text-neutral-400">Achieved</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm flex-1">
          <h3 className="text-sm font-bold text-neutral-900 dark:text-white mb-4">Team Health</h3>
          <div className="flex items-center justify-between">
            <div className="h-24 w-24">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DONUT_DATA_2}
                    innerRadius={30}
                    outerRadius={45}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {DONUT_DATA_2.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">8.4</p>
              <p className="text-xs text-neutral-400">Engagement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function UpcomingDeadlines({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Upcoming Deadlines</h3>
        <button className="text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <div className="space-y-4">
        <div className="h-24 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <Bar dataKey="value" fill="#fca5a5" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-neutral-400">Milestones reaching</span>
          <span className="text-sm font-bold text-orange-500">3/4 Done</span>
        </div>
      </div>
    </div>
  );
}
