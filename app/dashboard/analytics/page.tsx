import { BarChart3, TrendingUp, Target, Zap } from "lucide-react";

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Deep dive into your project performance and team efficiency.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/20 text-blue-700 rounded-xl w-fit mb-4">
            <BarChart3 size={24} />
          </div>
          <h3 className="text-lg font-bold">Performance Data</h3>
          <p className="text-sm text-neutral-500 mt-2">Comprehensive analytics visualization coming soon.</p>
        </div>
        
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="p-3 bg-green-100 dark:bg-green-950/20 text-green-600 rounded-xl w-fit mb-4">
            <TrendingUp size={24} />
          </div>
          <h3 className="text-lg font-bold">Growth Trends</h3>
          <p className="text-sm text-neutral-500 mt-2">Historical growth and projection models.</p>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <div className="p-3 bg-blue-100 dark:bg-blue-950/20 text-blue-600 rounded-xl w-fit mb-4">
            <Zap size={24} />
          </div>
          <h3 className="text-lg font-bold">Real-time Insights</h3>
          <p className="text-sm text-neutral-500 mt-2">Live stream of productivity metrics.</p>
        </div>
      </div>
    </div>
  );
}
