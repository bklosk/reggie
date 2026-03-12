import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus,
  ArrowLeft,
  ExternalLink,
  Loader2,
  Search,
  RefreshCw,
} from "lucide-react";
import {
  type Monitor,
  type WatchlistResult,
  getMonitors,
  addMonitor,
  getMonitorResults,
  saveMonitorResults,
} from "@/lib/watchlist";

function formatRelativeDate(iso: string): string {
  const date = new Date(iso);
  if (isNaN(date.getTime())) return iso;

  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  });
}

function SpreadsheetView({
  monitor,
  onBack,
}: {
  monitor: Monitor;
  onBack: () => void;
}) {
  const [results, setResults] = useState<WatchlistResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchResults = useCallback(
    async (forceRefresh = false) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!forceRefresh) {
          const cached = await getMonitorResults(monitor.id);
          if (cached && cached.results.length > 0) {
            setResults(cached.results);
            setIsLoading(false);
            return;
          }
        }

        const response = await fetch("/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: monitor.query }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(
            (data as { error?: string })?.error ??
              `Request failed (${response.status})`
          );
        }

        const data = (await response.json()) as {
          results: Record<string, unknown>[];
        };

        const normalized: WatchlistResult[] = data.results.map((raw) => ({
          id:
            typeof raw.url === "string" && raw.url
              ? raw.url
              : `${raw.title}-${Date.now()}-${Math.random()}`,
          title: String(raw.title ?? "Untitled"),
          summary: String(raw.summary ?? ""),
          url: String(raw.url ?? ""),
          publishedDate: String(raw.publishedDate ?? new Date().toISOString()),
          agency: String(raw.agency ?? "Unknown"),
          status: String(raw.status ?? "Unknown"),
        }));

        await saveMonitorResults(monitor.id, normalized);
        setResults(normalized);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch results");
      } finally {
        setIsLoading(false);
      }
    },
    [monitor.id, monitor.query]
  );

  useEffect(() => {
    fetchResults();
  }, [fetchResults]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-lg hover:bg-gray-200/50 text-gray-500 transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h2 className="font-serif text-2xl font-medium text-[#111827]">
              {monitor.query}
            </h2>
            <p className="text-sm text-gray-500">
              Created {formatRelativeDate(monitor.createdAt)}
            </p>
          </div>
        </div>
        <button
          onClick={() => fetchResults(true)}
          disabled={isLoading}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={14} className={isLoading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex-1 min-h-0 bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="overflow-auto flex-1">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="text-xs text-gray-500 uppercase bg-gray-50 sticky top-0 z-10 shadow-sm">
              <tr>
                <th className="px-4 py-3 font-medium w-32">Date</th>
                <th className="px-4 py-3 font-medium w-48">Agency</th>
                <th className="px-4 py-3 font-medium w-32">Status</th>
                <th className="px-4 py-3 font-medium">Title & Summary</th>
                <th className="px-4 py-3 font-medium w-24 text-right">Link</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading && results.length === 0 ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-20"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
                    <td className="px-4 py-4"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
                    <td className="px-4 py-4">
                      <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-4 bg-gray-100 rounded w-full"></div>
                    </td>
                    <td className="px-4 py-4 text-right"><div className="h-8 w-8 bg-gray-200 rounded ml-auto"></div></td>
                  </tr>
                ))
              ) : results.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-12 text-center text-gray-500">
                    No results found for this monitor.
                  </td>
                </tr>
              ) : (
                results.map((result) => (
                  <tr key={result.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-4 py-4 whitespace-nowrap align-top">
                      {formatRelativeDate(result.publishedDate)}
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
                        {result.agency}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 border border-blue-100">
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium text-gray-900 mb-1 leading-snug">
                        {result.title}
                      </div>
                      <div className="text-gray-500 line-clamp-2 text-xs leading-relaxed">
                        {result.summary}
                      </div>
                    </td>
                    <td className="px-4 py-4 align-top text-right">
                      {result.url && (
                        <a
                          href={result.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex p-2 text-gray-400 hover:text-[#111827] hover:bg-gray-100 rounded-lg transition-colors"
                          title="Open source"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

export function WatchlistView() {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [activeMonitor, setActiveMonitor] = useState<Monitor | null>(null);
  const [newQuery, setNewQuery] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    getMonitors().then((m) => {
      setMonitors(m);
      setHasLoaded(true);
    });
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuery.trim() || isCreating) return;

    setIsCreating(true);
    try {
      const monitor = await addMonitor(newQuery.trim());
      setMonitors((prev) => [monitor, ...prev]);
      setNewQuery("");
      setActiveMonitor(monitor);
    } catch (error) {
      console.error("Failed to create monitor", error);
    } finally {
      setIsCreating(false);
    }
  };

  if (activeMonitor) {
    return (
      <SpreadsheetView
        monitor={activeMonitor}
        onBack={() => setActiveMonitor(null)}
      />
    );
  }

  return (
    <motion.div
      key="watchlist"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col max-w-5xl mx-auto w-full"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium mb-2">Watchlist</h1>
        <p className="text-gray-500">
          Create webset monitors to keep a continuous eye on specific topics, agencies, or rules.
        </p>
      </div>

      <form onSubmit={handleCreate} className="mb-8 relative">
        <div className="relative flex items-center">
          <div className="absolute left-4 text-gray-400">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={newQuery}
            onChange={(e) => setNewQuery(e.target.value)}
            placeholder='e.g. "proposed rules on forest management in Illinois"'
            className="w-full pl-12 pr-32 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400 transition-all text-[#111827] placeholder:text-gray-400"
            disabled={isCreating}
          />
          <button
            type="submit"
            disabled={!newQuery.trim() || isCreating}
            className="absolute right-2 top-2 bottom-2 px-4 bg-[#111827] text-white rounded-xl font-medium text-sm hover:bg-[#1f2937] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isCreating ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Plus size={16} />
            )}
            Monitor
          </button>
        </div>
      </form>

      <div className="flex-1 min-h-0 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
        <div className="p-5 border-b border-gray-100 bg-gray-50/50">
          <h3 className="font-medium text-gray-700">Your Monitors</h3>
        </div>
        
        <div className="overflow-y-auto flex-1">
          {!hasLoaded ? (
            <div className="divide-y divide-gray-100">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-6 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-100 animate-pulse"></div>
                    <div>
                      <div className="h-5 w-48 bg-gray-200 rounded mb-2 animate-pulse"></div>
                      <div className="h-4 w-32 bg-gray-100 rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : monitors.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center px-4">
              <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <Search className="text-gray-300" size={24} />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-1">No monitors yet</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Type a topic above to start tracking regulatory developments automatically.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              <AnimatePresence initial={false}>
                {monitors.map((monitor) => (
                  <motion.button
                    key={monitor.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    onClick={() => setActiveMonitor(monitor)}
                    className="w-full p-5 flex items-center justify-between hover:bg-gray-50 transition-colors text-left group"
                  >
                    <div className="flex items-center gap-4 pr-4">
                      <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                        <Search size={18} />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900 text-lg mb-0.5 line-clamp-1">
                          {monitor.query}
                        </div>
                        <div className="text-sm text-gray-500">
                          Created {formatRelativeDate(monitor.createdAt)}
                        </div>
                      </div>
                    </div>
                    <div className="shrink-0 text-gray-400 group-hover:text-gray-600 transition-colors bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-medium flex items-center gap-2">
                      View Results
                      <ArrowLeft size={14} className="rotate-180" />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
