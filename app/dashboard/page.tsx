"use client";

import { useTheme } from "next-themes";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 50000, profit: 30000 },
  { month: "Feb", revenue: 65000, profit: 40000 },
  { month: "Mar", revenue: 75000, profit: 45000 },
  { month: "Apr", revenue: 85000, profit: 50000 },
  { month: "May", revenue: 95000, profit: 55000 },
  { month: "Jun", revenue: 110000, profit: 65000 },
  { month: "Jul", revenue: 120000, profit: 70000 },
  { month: "Aug", revenue: 130000, profit: 75000 },
];

const projects = [
  { name: "Orion", revenue: "$32,580", profit: "$12,300", grossProfit: "$12,300", status: "Completed" },
  { name: "Zenith", revenue: "$28,640", profit: "$10,250", grossProfit: "$10,250", status: "Ongoing" },
  { name: "Helios", revenue: "$19,480", profit: "$7,920", grossProfit: "$7,920", status: "Pending" },
];

export default function DashboardPage() {
  const { theme } = useTheme();
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-light-text dark:text-white">Dashboard</h1>
        <p className="text-light-text/60 dark:text-white/60">Check your tasks and progress here.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-yellow-500/10 dark:bg-yellow-500/5 backdrop-blur-md border-2 border-yellow-400 dark:border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light-text/60 dark:text-white/60 text-sm">Active Projects</p>
              <p className="text-3xl font-bold text-light-text dark:text-white mt-2">7</p>
              <p className="text-light-text/40 dark:text-white/40 text-xs mt-1">Projects</p>
            </div>
            <span className="text-2xl">📁</span>
          </div>
        </div>

        <div className="bg-yellow-500/10 dark:bg-yellow-500/5 backdrop-blur-md border-2 border-yellow-400 dark:border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light-text/60 dark:text-white/60 text-sm">Total Tasks</p>
              <p className="text-3xl font-bold text-light-text dark:text-white mt-2">49</p>
              <p className="text-light-text/40 dark:text-white/40 text-xs mt-1">Tasks</p>
            </div>
            <span className="text-2xl">✓</span>
          </div>
        </div>

        <div className="bg-yellow-500/10 dark:bg-yellow-500/5 backdrop-blur-md border-2 border-yellow-400 dark:border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light-text/60 dark:text-white/60 text-sm">My Assigned Tasks</p>
              <p className="text-3xl font-bold text-light-text dark:text-white mt-2">12</p>
              <p className="text-light-text/40 dark:text-white/40 text-xs mt-1">Tasks</p>
            </div>
            <span className="text-2xl">👤</span>
          </div>
        </div>

        <div className="bg-yellow-500/10 dark:bg-yellow-500/5 backdrop-blur-md border-2 border-yellow-400 dark:border-yellow-500/30 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-light-text/60 dark:text-white/60 text-sm">Completed Tasks</p>
              <p className="text-3xl font-bold text-light-text dark:text-white mt-2">6</p>
              <p className="text-light-text/40 dark:text-white/40 text-xs mt-1">Tasks</p>
            </div>
            <span className="text-2xl">✅</span>
          </div>
        </div>
      </div>

      {/* Charts and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Chart */}
        <div className="lg:col-span-2 bg-light-bg-secondary dark:bg-white/5 backdrop-blur-md border border-light-border dark:border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-light-text dark:text-white">Weekly Revenue</h3>
              <p className="text-light-text/60 dark:text-white/60 text-sm">Income earned this week, showing steady growth.</p>
            </div>
            <button className="text-light-text/60 dark:text-white/60 hover:text-light-text dark:hover:text-white">⋯</button>
          </div>

          <div className="mb-4">
            <p className="text-light-text/60 dark:text-white/60 text-sm">Last update: 04.16.25 at 7:00 PM</p>
            <div className="flex gap-4 mt-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-light-text/60 dark:text-white/60 text-xs">Revenue Growth</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <span className="text-light-text/60 dark:text-white/60 text-xs">Projected Profit</span>
              </div>
            </div>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} />
              <XAxis dataKey="month" stroke={theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"} />
              <YAxis stroke={theme === "dark" ? "rgba(255,255,255,0.8)" : "rgba(0,0,0,0.6)"} />
              <Tooltip contentStyle={{ backgroundColor: theme === "dark" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.9)", border: theme === "dark" ? "1px solid rgba(255,255,255,0.2)" : "1px solid rgba(0,0,0,0.2)", color: theme === "dark" ? "white" : "black" }} />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="profit" stroke="#eab308" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 text-right">
            <p className="text-light-text dark:text-white font-semibold">Income: <span className="text-green-400">$32,780</span></p>
            <p className="text-light-text/60 dark:text-white/60 text-sm">This week</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-light-bg-secondary dark:bg-white/5 backdrop-blur-md border border-light-border dark:border-white/10 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-light-text dark:text-white">Schedule</h3>
            <button className="text-light-text/60 dark:text-white/60 hover:text-light-text dark:hover:text-white">⋯</button>
          </div>

          <div className="space-y-4">
            <div className="border-b border-light-border dark:border-white/10 pb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-light-text dark:text-white font-medium">Team Standup</p>
                <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded">Starting Soon</span>
              </div>
              <p className="text-light-text/60 dark:text-white/60 text-sm">Start at 09:00 AM - 09:30 AM</p>
              <p className="text-light-text/40 dark:text-white/40 text-xs mt-1">🔗 Zoom Meeting</p>
            </div>

            <div className="border-b border-light-border dark:border-white/10 pb-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-light-text dark:text-white font-medium">Design Review</p>
                <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-1 rounded">Starting Soon</span>
              </div>
              <p className="text-light-text/60 dark:text-white/60 text-sm">Start at 11:30 AM - 12:15 PM</p>
              <p className="text-light-text/40 dark:text-white/40 text-xs mt-1">🔗 Zoom Meeting</p>
            </div>

            <div className="text-right">
              <button className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 text-sm font-medium">View Detail →</button>
            </div>
          </div>
        </div>
      </div>

      {/* Project Progress Summary */}
      <div className="bg-light-bg-secondary dark:bg-white/5 backdrop-blur-md border border-light-border dark:border-white/10 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-light-text dark:text-white">Project Progress Summary</h3>
          <div className="flex items-center gap-2 text-light-text/60 dark:text-white/60 text-sm">
            <span>📅 Updated: Apr 16, 2025</span>
            <span>This Quarter ▼</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-light-border dark:border-white/10">
                <th className="text-left py-3 px-4 text-light-text/60 dark:text-white/60 text-sm font-medium">Project Name</th>
                <th className="text-left py-3 px-4 text-light-text/60 dark:text-white/60 text-sm font-medium">Total Revenue</th>
                <th className="text-left py-3 px-4 text-light-text/60 dark:text-white/60 text-sm font-medium">Net Profit</th>
                <th className="text-left py-3 px-4 text-light-text/60 dark:text-white/60 text-sm font-medium">Gross Profit</th>
                <th className="text-left py-3 px-4 text-light-text/60 dark:text-white/60 text-sm font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.name} className="border-b border-light-border dark:border-white/10 hover:bg-light-accent/5 dark:hover:bg-white/5 transition">
                  <td className="py-3 px-4 text-light-text dark:text-white">{project.name}</td>
                  <td className="py-3 px-4 text-light-text dark:text-white">{project.revenue}</td>
                  <td className="py-3 px-4 text-light-text dark:text-white">{project.profit}</td>
                  <td className="py-3 px-4 text-light-text dark:text-white">{project.grossProfit}</td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${
                      project.status === "Completed" ? "bg-green-500/20 text-green-600 dark:text-green-400" :
                      project.status === "Ongoing" ? "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400" :
                      "bg-gray-500/20 text-gray-600 dark:text-gray-400"
                    }`}>
                      {project.status === "Completed" ? "✓" : project.status === "Ongoing" ? "⏳" : "⊘"} {project.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
