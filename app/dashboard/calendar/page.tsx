import { Calendar as CalendarIcon, Clock, Filter } from "lucide-react";

export default function CalendarPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Calendar</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your team schedule and project milestones.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-900 rounded-xl text-sm font-bold text-neutral-600 dark:text-neutral-400 border border-gray-200 dark:border-neutral-800">
          <Filter size={16} />
          Filters
        </button>
      </div>

      <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm p-8 min-h-[600px] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-950/20 text-blue-700 rounded-full flex items-center justify-center mb-6">
          <CalendarIcon size={32} />
        </div>
        <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Interactive Calendar View</h2>
        <p className="text-neutral-500 max-w-sm mt-2">
          We&apos;re building a high-performance interactive calendar for your team. Stay tuned!
        </p>
      </div>
    </div>
  );
}
