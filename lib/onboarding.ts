export const ONBOARDING_COOKIE_NAME = "reggie-onboarding-complete";
const ONBOARDING_COOKIE_VALUE = "true";
const ONBOARDING_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const ONBOARDING_DB_NAME = "reggie-onboarding";
const ONBOARDING_STORE_NAME = "preferences";
const ONBOARDING_RECORD_KEY = "profile";

export const INDUSTRY_SUGGESTIONS = [
  "Financial services",
  "Healthcare",
  "Manufacturing",
  "Technology",
  "Retail",
  "Energy",
  "Logistics",
  "Food and beverage",
  "Construction",
  "Life sciences",
] as const;

export const JURISDICTION_SUGGESTIONS = [
  "United States",
  "California",
  "New York",
  "Texas",
  "European Union",
  "United Kingdom",
  "Canada",
  "Australia",
] as const;

export const COMPLIANCE_DOMAIN_OPTIONS = [
  {
    id: "environmental-epa",
    label: "Environmental / EPA",
    description: "Air, water, hazardous materials, emissions, and permitting.",
  },
  {
    id: "data-privacy-pii",
    label: "Data privacy / PII",
    description: "Consumer privacy, retention, consent, and breach response.",
  },
  {
    id: "workplace-safety-osha",
    label: "Workplace safety / OSHA",
    description: "Operational safety requirements, inspections, and training.",
  },
  {
    id: "financial-reporting-sox",
    label: "Financial reporting / SOX",
    description: "Controls, audit readiness, disclosures, and governance.",
  },
  {
    id: "esg-sustainability",
    label: "ESG / Sustainability",
    description: "Climate disclosures, sustainability reporting, and related claims.",
  },
  {
    id: "supply-chain-forced-labor",
    label: "Supply chain / Forced labor",
    description: "Vendor diligence, sourcing risk, and import restrictions.",
  },
] as const;

export type ComplianceDomain = (typeof COMPLIANCE_DOMAIN_OPTIONS)[number]["id"];

export type OnboardingPreferences = {
  name: string;
  industry: string;
  companyName: string;
  complianceDomains: ComplianceDomain[];
  jurisdictions: string[];
  completedAt: string;
};

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof indexedDB !== "undefined";
}

function normalizeToken(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

export function dedupeValues(values: string[]) {
  const seen = new Set<string>();
  return values.reduce<string[]>((accumulator, value) => {
    const normalized = normalizeToken(value);

    if (!normalized) {
      return accumulator;
    }

    const lowered = normalized.toLowerCase();

    if (seen.has(lowered)) {
      return accumulator;
    }

    seen.add(lowered);
    accumulator.push(normalized);
    return accumulator;
  }, []);
}

export function setOnboardingCompletionCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ONBOARDING_COOKIE_NAME}=${ONBOARDING_COOKIE_VALUE}; Path=/; Max-Age=${ONBOARDING_COOKIE_MAX_AGE}; SameSite=Lax`;
}

export function clearOnboardingCompletionCookie() {
  if (typeof document === "undefined") {
    return;
  }

  document.cookie = `${ONBOARDING_COOKIE_NAME}=; Path=/; Max-Age=0; SameSite=Lax`;
}

export function hasOnboardingCompletionCookie() {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie
    .split("; ")
    .some((cookie) => cookie === `${ONBOARDING_COOKIE_NAME}=${ONBOARDING_COOKIE_VALUE}`);
}

function openOnboardingDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(ONBOARDING_DB_NAME, 1);

    request.onupgradeneeded = () => {
      const database = request.result;

      if (!database.objectStoreNames.contains(ONBOARDING_STORE_NAME)) {
        database.createObjectStore(ONBOARDING_STORE_NAME);
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () =>
      reject(request.error ?? new Error("Unable to open onboarding database."));
  });
}

export async function saveOnboardingPreferences(
  preferences: OnboardingPreferences
) {
  if (!canUseBrowserStorage()) {
    throw new Error("IndexedDB is not available in this browser.");
  }

  const database = await openOnboardingDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(ONBOARDING_STORE_NAME, "readwrite");
    const store = transaction.objectStore(ONBOARDING_STORE_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Unable to save onboarding preferences."));

    store.put(preferences, ONBOARDING_RECORD_KEY);
  });

  database.close();
}

export async function getOnboardingPreferences() {
  if (!canUseBrowserStorage()) {
    return null;
  }

  const database = await openOnboardingDatabase();

  const preferences = await new Promise<OnboardingPreferences | null>(
    (resolve, reject) => {
      const transaction = database.transaction(ONBOARDING_STORE_NAME, "readonly");
      const store = transaction.objectStore(ONBOARDING_STORE_NAME);
      const request = store.get(ONBOARDING_RECORD_KEY);

      request.onsuccess = () => {
        resolve((request.result as OnboardingPreferences | undefined) ?? null);
      };
      request.onerror = () =>
        reject(
          request.error ?? new Error("Unable to read onboarding preferences.")
        );
    }
  );

  database.close();
  return preferences;
}

export async function clearOnboardingPreferences() {
  if (!canUseBrowserStorage()) {
    return;
  }

  const database = await openOnboardingDatabase();

  await new Promise<void>((resolve, reject) => {
    const transaction = database.transaction(ONBOARDING_STORE_NAME, "readwrite");
    const store = transaction.objectStore(ONBOARDING_STORE_NAME);

    transaction.oncomplete = () => resolve();
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("Unable to clear onboarding preferences."));

    store.delete(ONBOARDING_RECORD_KEY);
  });

  database.close();
}

export async function hasCompletedOnboarding() {
  if (!hasOnboardingCompletionCookie()) {
    return false;
  }

  const preferences = await getOnboardingPreferences();
  return Boolean(preferences);
}
