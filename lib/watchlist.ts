const WATCHLIST_DB_NAME = "reggie-watchlist";
const MONITORS_STORE_NAME = "monitors";
const RESULTS_STORE_NAME = "monitor_results";
const WATCHLIST_DB_VERSION = 1;

export type Monitor = {
  id: string;
  query: string;
  createdAt: string;
};

export type WatchlistResult = {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedDate: string;
  agency: string;
  status: string;
};

export type MonitorResults = {
  monitorId: string;
  results: WatchlistResult[];
  fetchedAt: string;
};

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

function openWatchlistDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(WATCHLIST_DB_NAME, WATCHLIST_DB_VERSION);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(MONITORS_STORE_NAME)) {
        database.createObjectStore(MONITORS_STORE_NAME, { keyPath: "id" });
      }

      if (!database.objectStoreNames.contains(RESULTS_STORE_NAME)) {
        database.createObjectStore(RESULTS_STORE_NAME, { keyPath: "monitorId" });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Unable to open watchlist database."));
  });
}

export async function getMonitors(): Promise<Monitor[]> {
  if (!canUseBrowserStorage()) {
    return [];
  }

  const database = await openWatchlistDatabase();

  const results = await new Promise<Monitor[]>((resolve, reject) => {
    const transaction = database.transaction(MONITORS_STORE_NAME, "readonly");
    const store = transaction.objectStore(MONITORS_STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      resolve((request.result as Monitor[]) ?? []);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Unable to read monitors."));
  });

  database.close();
  return results.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export async function addMonitor(query: string): Promise<Monitor> {
  if (!canUseBrowserStorage()) {
    throw new Error("IndexedDB is not available in this browser.");
  }

  const database = await openWatchlistDatabase();
  const monitor: Monitor = {
    id: crypto.randomUUID(),
    query,
    createdAt: new Date().toISOString(),
  };

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(MONITORS_STORE_NAME, "readwrite");
    const store = transaction.objectStore(MONITORS_STORE_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Unable to save monitor."));

    store.put(monitor);
  });

  database.close();
  return monitor;
}

export async function getMonitorResults(monitorId: string): Promise<MonitorResults | null> {
  if (!canUseBrowserStorage()) {
    return null;
  }

  const database = await openWatchlistDatabase();

  const result = await new Promise<MonitorResults | null>((resolve, reject) => {
    const transaction = database.transaction(RESULTS_STORE_NAME, "readonly");
    const store = transaction.objectStore(RESULTS_STORE_NAME);
    const request = store.get(monitorId);

    request.onsuccess = () => {
      resolve((request.result as MonitorResults) ?? null);
    };
    request.onerror = () =>
      reject(request.error ?? new Error("Unable to read monitor results."));
  });

  database.close();
  return result;
}

export async function saveMonitorResults(monitorId: string, results: WatchlistResult[]) {
  if (!canUseBrowserStorage()) {
    throw new Error("IndexedDB is not available in this browser.");
  }

  const database = await openWatchlistDatabase();
  const monitorResults: MonitorResults = {
    monitorId,
    results,
    fetchedAt: new Date().toISOString(),
  };

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(RESULTS_STORE_NAME, "readwrite");
    const store = transaction.objectStore(RESULTS_STORE_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Unable to save monitor results."));

    store.put(monitorResults);
  });

  database.close();
}
