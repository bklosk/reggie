"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";
import {
  COMPLIANCE_DOMAIN_OPTIONS,
  INDUSTRY_SUGGESTIONS,
  JURISDICTION_SUGGESTIONS,
  dedupeValues,
  saveOnboardingPreferences,
  setOnboardingCompletionCookie,
  type ComplianceDomain,
} from "@/lib/onboarding";

type FormState = {
  name: string;
  industry: string;
  companyName: string;
  complianceDomains: ComplianceDomain[];
  jurisdictions: string[];
};

const stepMetadata = [
  {
    eyebrow: "Step 01",
    title: "Who should reggie work for?",
    description:
      "Tell us who you are and which company should anchor your compliance radar.",
  },
  {
    eyebrow: "Step 02",
    title: "Where do you operate?",
    description:
      "Set the industry and jurisdictions that shape the rules worth watching.",
  },
  {
    eyebrow: "Step 03",
    title: "Which domains matter most?",
    description:
      "Choose the compliance programs you want reggie to prioritize from day one.",
  },
  {
    eyebrow: "Step 04",
    title: "Ready to launch your feed?",
    description:
      "Review your profile and create a tailored monitoring workspace in one click.",
  },
] as const;

const initialFormState: FormState = {
  name: "",
  industry: "",
  companyName: "",
  complianceDomains: [],
  jurisdictions: [],
};

function normalizeValue(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function DomainCard({
  description,
  isSelected,
  label,
  onClick,
}: {
  description: string;
  isSelected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`rounded-3xl border p-5 text-left transition ${
        isSelected
          ? "border-[#2CA58D] bg-[#102925] shadow-[0_18px_40px_rgba(44,165,141,0.18)]"
          : "border-gray-200 bg-white hover:border-gray-300"
      }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium tracking-[0.18em] uppercase ${
            isSelected
              ? "bg-[#2CA58D]/20 text-teal-100"
              : "bg-[#f3f3f1] text-gray-500"
          }`}
        >
          Priority
        </div>
        <div
          className={`mt-1 h-4 w-4 rounded-full border ${
            isSelected
              ? "border-[#6DE8D0] bg-[#6DE8D0]"
              : "border-gray-300 bg-transparent"
          }`}
        />
      </div>
      <h3
        className={`mb-3 font-serif text-2xl leading-tight ${
          isSelected ? "text-white" : "text-[#111827]"
        }`}
      >
        {label}
      </h3>
      <p className={isSelected ? "text-teal-50/85" : "text-gray-500"}>
        {description}
      </p>
    </motion.button>
  );
}

export function OnboardingFlow() {
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialFormState);
  const [jurisdictionInput, setJurisdictionInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentStep = stepMetadata[step];
  const domainLabels = useMemo(
    () =>
      Object.fromEntries(
        COMPLIANCE_DOMAIN_OPTIONS.map((domain) => [domain.id, domain.label])
      ) as Record<ComplianceDomain, string>,
    []
  );

  const isCurrentStepValid = useMemo(() => {
    switch (step) {
      case 0:
        return Boolean(normalizeValue(form.name) && normalizeValue(form.companyName));
      case 1:
        return Boolean(normalizeValue(form.industry) && form.jurisdictions.length > 0);
      case 2:
        return form.complianceDomains.length > 0;
      default:
        return true;
    }
  }, [form.companyName, form.complianceDomains.length, form.industry, form.jurisdictions.length, form.name, step]);

  function updateField<Key extends keyof FormState>(key: Key, value: FormState[Key]) {
    setForm((current) => ({ ...current, [key]: value }));
    setError(null);
  }

  function addJurisdiction(value: string) {
    const nextValues = dedupeValues([...form.jurisdictions, value]);
    updateField("jurisdictions", nextValues);
    setJurisdictionInput("");
  }

  function removeJurisdiction(value: string) {
    updateField(
      "jurisdictions",
      form.jurisdictions.filter((entry) => entry !== value)
    );
  }

  function toggleDomain(domain: ComplianceDomain) {
    const nextDomains = form.complianceDomains.includes(domain)
      ? form.complianceDomains.filter((entry) => entry !== domain)
      : [...form.complianceDomains, domain];

    updateField("complianceDomains", nextDomains);
  }

  function handleJurisdictionKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" && event.key !== ",") {
      return;
    }

    event.preventDefault();

    const normalized = normalizeValue(jurisdictionInput);

    if (!normalized) {
      return;
    }

    addJurisdiction(normalized);
  }

  function goToNextStep() {
    if (!isCurrentStepValid || step === stepMetadata.length - 1) {
      return;
    }

    setStep((current) => current + 1);
  }

  function goToPreviousStep() {
    if (step === 0) {
      return;
    }

    setStep((current) => current - 1);
  }

  async function handleSubmit() {
    setError(null);
    setIsSubmitting(true);

    try {
      await saveOnboardingPreferences({
        name: normalizeValue(form.name),
        industry: normalizeValue(form.industry),
        companyName: normalizeValue(form.companyName),
        complianceDomains: form.complianceDomains,
        jurisdictions: dedupeValues(form.jurisdictions),
        completedAt: new Date().toISOString(),
      });

      setOnboardingCompletionCookie();
      router.replace("/feed");
    } catch {
      setError("We couldn't save your onboarding profile. Please try again.");
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#05070b] text-[#111827]">
      <div className="mx-auto grid min-h-screen max-w-7xl bg-[#05070b] lg:grid-cols-[0.78fr_1.22fr]">
        <section className="bg-[#05070b] px-6 py-8 text-white md:px-10 md:py-10">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex h-full flex-col"
          >
            <div className="mb-16">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold tracking-tight">reggie</span>
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-teal-400" />
                  <div className="h-2 w-2 rounded-full bg-pink-400" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400" />
                </div>
              </div>
            </div>

            <div className="flex flex-1 items-center">
              <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-sm text-white/70">
                  <span>Progress</span>
                  <span>
                    {step + 1} / {stepMetadata.length}
                  </span>
                </div>
                <div className="flex gap-3">
                  {stepMetadata.map((item, index) => {
                    const isActive = index === step;
                    const isComplete = index < step;

                    return (
                      <motion.div
                        key={item.title}
                        className={`h-2 flex-1 rounded-full ${
                          isActive || isComplete ? "bg-white" : "bg-white/15"
                        }`}
                        animate={{ opacity: isActive || isComplete ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                      />
                    );
                  })}
                </div>
                <div className="grid gap-3">
                  {stepMetadata.map((item, index) => (
                    <motion.div
                      key={item.title}
                      animate={{
                        opacity: index === step ? 1 : 0.45,
                        x: index === step ? 0 : 6,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex items-start gap-3"
                    >
                      <div
                        className={`mt-1 flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                          index < step
                            ? "bg-[#2CA58D] text-white"
                            : index === step
                              ? "bg-white text-[#111827]"
                              : "bg-white/10 text-white/60"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-white">{item.title}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <section className="m-6 flex min-h-[calc(100vh-3rem)] flex-col rounded-[2rem] bg-[#f4f4f0] bg-dot-pattern px-6 py-8 text-[#111827] md:m-8 md:px-10 md:py-10">
          <div className="flex flex-1 flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-10"
            >
              <div>
                <h2 className="max-w-xl font-serif text-4xl leading-tight text-[#111827] md:text-[2.8rem]">
                  {currentStep.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-7 text-gray-500">
                  {currentStep.description}
                </p>
              </div>
            </motion.div>

            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="space-y-6"
                >
                {step === 0 ? (
                  <div className="grid gap-6">
                    <div className="bg-transparent">
                      <label className="mb-3 block text-sm font-medium text-gray-500">
                        Your name
                      </label>
                      <input
                        value={form.name}
                        onChange={(event) => updateField("name", event.target.value)}
                        placeholder="e.g. Maya Patel"
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-4 text-lg text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#111827]"
                      />
                    </div>

                    <div className="bg-transparent">
                      <label className="mb-3 block text-sm font-medium text-gray-500">
                        Company name
                      </label>
                      <input
                        value={form.companyName}
                        onChange={(event) =>
                          updateField("companyName", event.target.value)
                        }
                        placeholder="e.g. Northstar Industrial"
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-4 text-lg text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#111827]"
                      />
                    </div>
                  </div>
                ) : null}

                {step === 1 ? (
                  <div className="grid gap-6">
                    <div className="bg-transparent">
                      <label className="mb-3 block text-sm font-medium text-gray-500">
                        Industry
                      </label>
                      <input
                        list="industry-suggestions"
                        value={form.industry}
                        onChange={(event) => updateField("industry", event.target.value)}
                        placeholder="Choose one or type your own"
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-4 text-lg text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#111827]"
                      />
                      <datalist id="industry-suggestions">
                        {INDUSTRY_SUGGESTIONS.map((industry) => (
                          <option key={industry} value={industry} />
                        ))}
                      </datalist>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {INDUSTRY_SUGGESTIONS.map((industry) => (
                          <motion.button
                            key={industry}
                            type="button"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => updateField("industry", industry)}
                            className={`rounded-full px-4 py-2 text-sm transition ${
                              form.industry === industry
                                ? "bg-[#111827] text-white"
                                : "bg-black/5 text-gray-600 hover:bg-black/10"
                            }`}
                          >
                            {industry}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-transparent">
                      <label className="mb-3 block text-sm font-medium text-gray-500">
                        Jurisdictions
                      </label>
                      <input
                        value={jurisdictionInput}
                        onChange={(event) => setJurisdictionInput(event.target.value)}
                        onKeyDown={handleJurisdictionKeyDown}
                        onBlur={() => {
                          const normalized = normalizeValue(jurisdictionInput);
                          if (normalized) {
                            addJurisdiction(normalized);
                          }
                        }}
                        placeholder="Type a country, state, or market and press Enter"
                        className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-4 text-lg text-[#111827] outline-none transition placeholder:text-gray-400 focus:border-[#111827]"
                      />
                      <div className="mt-4 space-y-2">
                        <AnimatePresence>
                          {form.jurisdictions.map((jurisdiction) => (
                            <motion.div
                              key={jurisdiction}
                              layout
                              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
                              className="flex items-center justify-between border-b border-gray-200 py-3"
                            >
                              <span className="text-base text-[#111827]">{jurisdiction}</span>
                              <button
                                type="button"
                                onClick={() => removeJurisdiction(jurisdiction)}
                                className="text-sm text-gray-400 transition hover:text-[#111827]"
                                aria-label={`Remove ${jurisdiction}`}
                              >
                                <span className="inline-flex items-center gap-1">
                                  <X size={14} />
                                  Remove
                                </span>
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {JURISDICTION_SUGGESTIONS.map((jurisdiction) => {
                          const isSelected = form.jurisdictions.includes(jurisdiction);

                          return (
                            <motion.button
                              key={jurisdiction}
                              type="button"
                              whileHover={{ y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              disabled={isSelected}
                              onClick={() => addJurisdiction(jurisdiction)}
                              className={`rounded-full px-4 py-2 text-sm transition ${
                                isSelected
                                  ? "bg-[#2CA58D] text-white"
                                  : "bg-black/5 text-gray-600 hover:bg-black/10"
                              }`}
                            >
                              {jurisdiction}
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ) : null}

                {step === 2 ? (
                  <div className="grid gap-4 md:grid-cols-2">
                    {COMPLIANCE_DOMAIN_OPTIONS.map((domain, index) => (
                      <motion.div
                        key={domain.id}
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <DomainCard
                          label={domain.label}
                          description={domain.description}
                          isSelected={form.complianceDomains.includes(domain.id)}
                          onClick={() => toggleDomain(domain.id)}
                        />
                      </motion.div>
                    ))}
                  </div>
                ) : null}

                {step === 3 ? (
                  <div className="grid gap-6">
                    <div className="rounded-2xl bg-[#111827] p-7 text-white shadow-[0_20px_50px_rgba(0,0,0,0.24)]">
                      <h3 className="font-serif text-4xl leading-tight">
                        Your feed will open with signals tuned to {form.companyName}.
                      </h3>
                      <p className="mt-4 max-w-2xl text-white/80">
                        We’ll emphasize {form.industry || "your industry"} updates across{" "}
                        {form.jurisdictions.join(", ")} with extra attention on{" "}
                        {form.complianceDomains
                          .map((domain) => domainLabels[domain])
                          .join(", ")}
                        .
                      </p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-2">
                      <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
                          Account
                        </div>
                        <div className="space-y-4">
                          <div>
                            <div className="text-sm text-gray-400">Name</div>
                            <div className="font-serif text-2xl text-[#111827]">
                              {form.name}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Company</div>
                            <div className="font-serif text-2xl text-[#111827]">
                              {form.companyName}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-400">Industry</div>
                            <div className="font-serif text-2xl text-[#111827]">
                              {form.industry}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-[2rem] border border-gray-200 bg-white p-6 shadow-sm">
                        <div className="mb-4 text-xs font-medium uppercase tracking-[0.24em] text-gray-400">
                          Monitoring scope
                        </div>
                        <div className="mb-5 flex flex-wrap gap-2">
                          {form.complianceDomains.map((domain) => (
                            <span
                              key={domain}
                              className="rounded-full bg-[#111827] px-3 py-2 text-sm text-white"
                            >
                              {domainLabels[domain]}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {form.jurisdictions.map((jurisdiction) => (
                            <span
                              key={jurisdiction}
                              className="rounded-full bg-black/5 px-3 py-2 text-sm text-gray-600"
                            >
                              {jurisdiction}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-8 border-t border-gray-200 pt-6">
              {error ? (
                <div className="mb-4 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={goToPreviousStep}
                  disabled={step === 0 || isSubmitting}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-gray-300 px-5 py-3 text-sm font-medium text-gray-500 transition hover:border-gray-400 hover:text-[#111827] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>

                {step < stepMetadata.length - 1 ? (
                  <motion.button
                    type="button"
                    onClick={goToNextStep}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    disabled={!isCurrentStepValid}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#111827] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#1f2937] disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
                  >
                    Continue
                    <ArrowRight size={16} />
                  </motion.button>
                ) : (
                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    whileHover={{ scale: isSubmitting ? 1 : 1.01 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.99 }}
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#2CA58D] to-[#208672] px-6 py-3 text-sm font-medium text-white shadow-[0_16px_32px_rgba(44,165,141,0.24)] transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? "Opening your feed..." : "Launch reggie"}
                    <ArrowRight size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
