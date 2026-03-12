const RADAR_DB_NAME = "reggie-radar";
const RADAR_STORE_NAME = "results";
const RADAR_DB_VERSION = 1;

export const CLASSIFICATION_OPTIONS = [
  "news",
  "regulatory-change",
  "proposed-rule",
  "enforcement-action",
  "guidance",
  "public-comment",
] as const;

export type RadarClassification = (typeof CLASSIFICATION_OPTIONS)[number];

export const SEVERITY_OPTIONS = [
  "critical",
  "high",
  "medium",
  "low",
  "informational",
] as const;

export type RadarSeverity = (typeof SEVERITY_OPTIONS)[number];

export type RadarResult = {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedDate: string;
  classification: RadarClassification;
  agency: string;
  jurisdiction: string;
  severity: RadarSeverity;
  complianceDomains: string[];
  isRead: boolean;
  fetchedAt: string;
};

export const CLASSIFICATION_META: Record<
  RadarClassification,
  { label: string; color: string; bg: string }
> = {
  news: { label: "News", color: "text-blue-700", bg: "bg-blue-100" },
  "regulatory-change": {
    label: "Regulatory Change",
    color: "text-red-700",
    bg: "bg-red-100",
  },
  "proposed-rule": {
    label: "Proposed Rule",
    color: "text-amber-700",
    bg: "bg-amber-100",
  },
  "enforcement-action": {
    label: "Enforcement Action",
    color: "text-rose-700",
    bg: "bg-rose-100",
  },
  guidance: {
    label: "Guidance",
    color: "text-emerald-700",
    bg: "bg-emerald-100",
  },
  "public-comment": {
    label: "Public Comment",
    color: "text-violet-700",
    bg: "bg-violet-100",
  },
};

export const SEVERITY_META: Record<
  RadarSeverity,
  { label: string; dot: string }
> = {
  critical: { label: "Critical", dot: "bg-red-500" },
  high: { label: "High", dot: "bg-orange-500" },
  medium: { label: "Medium", dot: "bg-yellow-500" },
  low: { label: "Low", dot: "bg-blue-400" },
  informational: { label: "Info", dot: "bg-gray-400" },
};

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

function openRadarDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(RADAR_DB_NAME, RADAR_DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(RADAR_STORE_NAME)) {
        database.createObjectStore(RADAR_STORE_NAME, { keyPath: "id" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Unable to open radar database."));
  });
}

export async function saveRadarResults(results: RadarResult[]) {
  if (!canUseBrowserStorage()) {
    throw new Error("IndexedDB is not available in this browser.");
  }

  const database = await openRadarDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(RADAR_STORE_NAME, "readwrite");
    const store = transaction.objectStore(RADAR_STORE_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(
        transaction.error ?? new Error("Unable to save radar results.")
      );

    for (const result of results) {
      store.put(result);
    }
  });

  database.close();
}

export async function getRadarResults(): Promise<RadarResult[]> {
  if (!canUseBrowserStorage()) {
    return [];
  }

  const database = await openRadarDatabase();

  const results = await new Promise<RadarResult[]>((resolve, reject) => {
    const transaction = database.transaction(RADAR_STORE_NAME, "readonly");
    const store = transaction.objectStore(RADAR_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve((request.result as RadarResult[]) ?? []);
    };
    request.onerror = () =>
      reject(
        request.error ?? new Error("Unable to read radar results.")
      );
  });

  database.close();
  return results;
}

export async function markRadarResultRead(id: string) {
  if (!canUseBrowserStorage()) {
    return;
  }

  const database = await openRadarDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(RADAR_STORE_NAME, "readwrite");
    const store = transaction.objectStore(RADAR_STORE_NAME);
    const getRequest = store.get(id);

    getRequest.onsuccess = () => {
      const existing = getRequest.result as RadarResult | undefined;
      if (!existing) {
        resolve();
        return;
      }
      store.put({ ...existing, isRead: true });
    };

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(
        transaction.error ??
          new Error("Unable to mark radar result as read.")
      );
  });

  database.close();
}
