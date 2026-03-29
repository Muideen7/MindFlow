"use client";

import { UserAvatar } from "@/components/ui/user-avatar";

const ACTIVITIES = [
  { id: 1, user: "Alice", action: "uploaded a new document", project: "Project Alpha", time: "10m ago", avatar: "https://i.pravatar.cc/150?u=Alice" },
  { id: 2, user: "Bob", action: "set a deadline for tomorrow", project: "Project Beta", time: "25m ago", avatar: "https://i.pravatar.cc/150?u=Bob" },
  { id: 3, user: "Charlie", action: "approved the design of", project: "Landing Page", time: "1h ago", avatar: "https://i.pravatar.cc/150?u=Charlie" },
  { id: 4, user: "David", action: "started a new sprint", project: "Q1 Roadmap", time: "2h ago", avatar: "https://i.pravatar.cc/150?u=David" },
  { id: 5, user: "Alice", action: "invited 3 members to", project: "MindFlow UI", time: "4h ago", avatar: "https://i.pravatar.cc/150?u=Alice" },
];

export function ActivityFeed({ data }: { data: any[] }) {
  return (
    <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm h-full">
      <h3 className="text-sm font-bold text-neutral-900 dark:text-white uppercase tracking-wider mb-6">
        Team Activity
      </h3>
      <div className="space-y-6">
        {data.map((activity: any) => (
          <div key={activity.id} className="flex gap-3 items-start group cursor-pointer">
            <div className="relative shrink-0">
              <UserAvatar 
                name={activity.user}
                image={activity.avatar}
                size="sm"
                className="ring-2 ring-transparent group-hover:ring-violet-500/20"
              />
              <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-neutral-900 shadow-sm" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-neutral-500 leading-snug">
                <span className="font-bold text-neutral-900 dark:text-white group-hover:text-violet-500 transition-colors">
                  {activity.user}
                </span>{" "}
                {activity.action}{" "}
                <span className="font-bold text-neutral-700 dark:text-neutral-300">
                  {activity.project}
                </span>
              </p>
              <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight mt-1">
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-8 py-2 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white border-t border-gray-50 dark:border-neutral-800 transition-colors uppercase tracking-widest">
        View All Activity
      </button>
    </div>
  );
}
