import { FileText, Download, Share2 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Reports</h1>
          <p className="text-sm text-neutral-500 mt-1">Generate and export detailed project summaries.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-violet-500/20 hover:bg-violet-600 transition-all active:scale-95">
          <Plus className="hidden" />
          Generate Report
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm">
          <FileText className="text-violet-500 mb-6" size={40} />
          <h3 className="text-lg font-bold">Monthly Summary</h3>
          <p className="text-sm text-neutral-500 mt-2 mb-6">Detailed overview of last month&apos;s productivity and task completion rates.</p>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <Download size={14} /> Download PDF
            </button>
            <button className="flex items-center gap-2 text-xs font-bold text-neutral-400 hover:text-neutral-900 dark:hover:text-white">
              <Share2 size={14} /> Share
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-900 p-8 rounded-2xl border border-gray-100 dark:border-neutral-800 shadow-sm opacity-50">
          <FileText className="text-neutral-300 mb-6" size={40} />
          <h3 className="text-lg font-bold text-neutral-300">Custom Report</h3>
          <p className="text-sm text-neutral-300 mt-2">Generate tailored insights by selecting specific metrics and dates.</p>
        </div>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      className={className}
      width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
