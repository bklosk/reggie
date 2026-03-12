import { useCallback, useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Radar,
  ExternalLink,
  CheckCircle2,
  ChevronDown,
  Loader2,
  AlertTriangle,
} from "lucide-react";
import type { OnboardingPreferences } from "@/lib/onboarding";
import {
  type RadarResult,
  type RadarClassification,
  type RadarSeverity,
  CLASSIFICATION_META,
  SEVERITY_META,
  CLASSIFICATION_OPTIONS,
  SEVERITY_OPTIONS,
  getRadarResults,
  saveRadarResults,
  markRadarResultRead,
} from "@/lib/radar";

function normalizeApiResult(
  raw: Record<string, unknown>,
  fetchedAt: string
): RadarResult {
  const id =
    typeof raw.url === "string" && raw.url
      ? raw.url
      : `${raw.title}-${raw.agency}-${Date.now()}-${Math.random()}`;

  const classification = CLASSIFICATION_OPTIONS.includes(
    raw.classification as RadarClassification
  )
    ? (raw.classification as RadarClassification)
    : "news";

  const severity = SEVERITY_OPTIONS.includes(raw.severity as RadarSeverity)
    ? (raw.severity as RadarSeverity)
    : "informational";

  const domains =
    typeof raw.domains === "string"
      ? raw.domains
          .split(",")
          .map((s: string) => s.trim())
          .filter(Boolean)
      : [];

  return {
    id,
    title: String(raw.title ?? "Untitled"),
    summary: String(raw.summary ?? ""),
    url: String(raw.url ?? ""),
    publishedDate: String(raw.publishedDate ?? fetchedAt),
    classification,
    agency: String(raw.agency ?? "Unknown"),
    jurisdiction: String(raw.jurisdiction ?? "Unknown"),
    severity,
    complianceDomains: domains,
    isRead: false,
    fetchedAt,
  };
}

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

function RadarCard({
  result,
  onMarkRead,
}: {
  result: RadarResult;
  onMarkRead: (id: string) => void;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const cls = CLASSIFICATION_META[result.classification];
  const sev = SEVERITY_META[result.severity];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.25 }}
      className={`bg-white rounded-2xl shadow-sm border border-gray-100 transition-colors h-full flex flex-col ${
        result.isRead ? "opacity-60" : ""
      }`}
    >
      <button
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (!isExpanded && !result.isRead) {
            onMarkRead(result.id);
          }
        }}
        className="w-full text-left p-5 pb-4 flex-1 flex flex-col"
      >
        <div className="flex items-start gap-3 w-full">
          <div className="pt-2 w-2 shrink-0 flex justify-center">
            {!result.isRead && (
              <div className="h-2 w-2 rounded-full bg-red-500" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls.bg} ${cls.color}`}
                  >
                    {cls.label}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-gray-500">
                    <span className={`h-1.5 w-1.5 rounded-full ${sev.dot}`} />
                    {sev.label}
                  </span>
                  <span className="text-xs text-gray-400">
                    {formatRelativeDate(result.publishedDate)}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-medium text-[#111827] leading-snug">
                  {result.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-500">
                  <span>{result.agency}</span>
                  <span className="h-3 w-px bg-gray-200" />
                  <span>{result.jurisdiction}</span>
                </div>
              </div>
              <ChevronDown
                size={18}
                className={`shrink-0 text-gray-400 transition-transform mt-1 ${
                  isExpanded ? "rotate-180" : ""
                }`}
              />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="pl-10 pr-5 pb-5 space-y-4">
              <div className="h-px bg-gray-100" />
              <p className="text-sm text-gray-600 leading-relaxed">
                {result.summary}
              </p>
              {result.complianceDomains.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {result.complianceDomains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-3 pt-1">
                {result.url && (
                  <a
                    href={result.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#111827] px-3.5 py-2 text-xs font-medium text-white transition hover:bg-[#1f2937]"
                  >
                    Read source
                    <ExternalLink size={12} />
                  </a>
                )}
                {!result.isRead && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkRead(result.id);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3.5 py-2 text-xs font-medium text-gray-600 transition hover:bg-gray-50"
                  >
                    <CheckCircle2 size={12} />
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ScanSkeletons() {
  return (
    <div className="flex flex-col gap-4 pb-8 w-full lg:w-3/4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 h-full"
        >
          <div className="flex items-center gap-2 mb-3 pl-5">
            <div className="h-5 w-24 rounded-full skeleton-shimmer" />
            <div className="h-4 w-14 rounded-full skeleton-shimmer" />
          </div>
          <div className="h-5 w-3/4 rounded-md skeleton-shimmer mb-2 pl-5" />
          <div className="flex gap-3 pl-5">
            <div className="h-3 w-20 rounded skeleton-shimmer" />
            <div className="h-3 w-24 rounded skeleton-shimmer" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function RadarView({
  profile,
}: {
  profile: OnboardingPreferences | null;
}) {
  const [results, setResults] = useState<RadarResult[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  const [classificationFilter, setClassificationFilter] = useState<RadarClassification | "all">("all");
  const [severityFilter, setSeverityFilter] = useState<RadarSeverity | "all">("all");

  const hasScannedRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    getRadarResults().then((cached) => {
      if (cancelled) return;
      setResults(cached);
      setHasLoaded(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const runScan = useCallback(async () => {
    if (!profile || isScanning) return;

    setIsScanning(true);
    setError(null);

    try {
      const response = await fetch("/api/radar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          industry: profile.industry,
          companyName: profile.companyName,
          complianceDomains: profile.complianceDomains,
          jurisdictions: profile.jurisdictions,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(
          (data as { error?: string })?.error ?? `Request failed (${response.status})`
        );
      }

      const data = (await response.json()) as {
        results: Record<string, unknown>[];
      };

      const fetchedAt = new Date().toISOString();
      const normalized = data.results.map((r) =>
        normalizeApiResult(r, fetchedAt)
      );

      const existingById = new Map(results.map((r) => [r.id, r]));
      const merged = normalized.map((r) => {
        const existing = existingById.get(r.id);
        return existing ? { ...r, isRead: existing.isRead } : r;
      });

      // Also keep existing results that weren't returned in this scan
      const newIds = new Set(merged.map((r) => r.id));
      const oldToKeep = results.filter((r) => !newIds.has(r.id));
      
      const finalResults = [...merged, ...oldToKeep];

      await saveRadarResults(finalResults);
      setResults(finalResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Scan failed");
    } finally {
      setIsScanning(false);
    }
  }, [profile, isScanning, results]);

  useEffect(() => {
    if (profile && hasLoaded && !hasScannedRef.current) {
      hasScannedRef.current = true;
      runScan();
    }
  }, [profile, hasLoaded, runScan]);

  const handleMarkRead = useCallback(
    async (id: string) => {
      await markRadarResultRead(id);
      setResults((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isRead: true } : r))
      );
    },
    []
  );

  const filteredResults = results.filter((r) => {
    if (classificationFilter !== "all" && r.classification !== classificationFilter) return false;
    if (severityFilter !== "all" && r.severity !== severityFilter) return false;
    return true;
  });

  const sortedResults = [...filteredResults].sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() -
      new Date(a.publishedDate).getTime()
  );

  const unreadCount = results.filter((r) => !r.isRead).length;
  const unreadHighImportanceCount = results.filter(
    (r) => !r.isRead && (r.severity === "critical" || r.severity === "high")
  ).length;

  return (
    <motion.div
      key="radar"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="mb-6 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          <h1 className="font-serif text-3xl font-medium mb-1">Radar</h1>
          <p className="text-gray-500 text-sm flex items-center gap-2">
            {results.length > 0
              ? `${results.length} developments found${unreadCount > 0 ? ` \u00b7 ${unreadCount} unread` : ""}`
              : "Monitoring your regulatory landscape."}
            {isScanning && (
              <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full ml-2">
                <Loader2 size={10} className="animate-spin" />
                Scanning
              </span>
            )}
          </p>

          {results.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              <select
                value={classificationFilter}
                onChange={(e) => setClassificationFilter(e.target.value as RadarClassification | "all")}
                className="text-sm rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                <option value="all">All Categories</option>
                {CLASSIFICATION_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {CLASSIFICATION_META[opt].label}
                  </option>
                ))}
              </select>

              <select
                value={severityFilter}
                onChange={(e) => setSeverityFilter(e.target.value as RadarSeverity | "all")}
                className="text-sm rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-gray-700 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              >
                <option value="all">All Severities</option>
                {SEVERITY_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {SEVERITY_META[opt].label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="flex-1 min-h-0">
        {isScanning && results.length === 0 ? (
          <ScanSkeletons />
        ) : hasLoaded && results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              <Radar size={32} className="text-gray-400" />
            </div>
            <h2 className="font-serif text-xl font-medium text-[#111827] mb-2">
              No developments yet
            </h2>
            <p className="text-sm text-gray-500 max-w-sm">
              Run your first scan to discover regulatory developments tailored
              to your compliance profile.
            </p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-6 pb-8 items-start">
            <div className="flex flex-col gap-4 w-full lg:w-3/4">
              <AnimatePresence initial={false}>
                {sortedResults.map((result) => (
                  <RadarCard
                    key={result.id}
                    result={result}
                    onMarkRead={handleMarkRead}
                  />
                ))}
              </AnimatePresence>
              {sortedResults.length === 0 && results.length > 0 && (
                <div className="text-center text-sm text-gray-400 py-12">
                  No items match your filters.
                </div>
              )}
            </div>

            <div className="w-full lg:w-1/4 sticky top-6">
              {results.length > 0 && (
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-red-100 flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <AlertTriangle className="text-red-500" size={24} />
                  </div>
                  <div className="flex flex-col">
                    <div className="font-serif text-3xl text-red-600 leading-none mb-1">
                      {unreadHighImportanceCount}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Unread Urgent Alerts</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
