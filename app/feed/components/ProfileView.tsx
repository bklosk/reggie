import { motion } from "motion/react";
import {
  COMPLIANCE_DOMAIN_OPTIONS,
  type OnboardingPreferences,
} from "@/lib/onboarding";

export function ProfileView({
  profile,
}: {
  profile: OnboardingPreferences | null;
}) {
  const selectedDomainLabels =
    profile?.complianceDomains.map(
      (domain) =>
        COMPLIANCE_DOMAIN_OPTIONS.find((option) => option.id === domain)?.label ??
        domain
    ) ?? [];

  return (
    <motion.div
      key="profile"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="h-full flex flex-col"
    >
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-medium mb-2">Profile & Settings</h1>
        <p className="text-gray-500">
          Manage your onboarding context and the preferences guiding your feed.
        </p>
      </div>
      <div className="max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-[#111827] text-white mb-4 flex items-center justify-center font-serif text-3xl">
              {profile?.name?.slice(0, 1) || "R"}
            </div>
            <div className="text-2xl font-serif text-[#111827] mb-1">
              {profile?.name || "Reggie user"}
            </div>
            <div className="text-sm text-gray-500 mb-6">
              {profile?.companyName || "Company not set"}
            </div>
            <div className="w-full rounded-xl bg-[#f4f4f0] px-4 py-3 text-sm text-gray-600">
              Monitoring {profile?.industry || "your industry"}
            </div>
          </div>
        </div>
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-2xl text-[#111827] mb-6">Company profile</h2>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-2">Company name</div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-[#111827]">
                  {profile?.companyName || "Not provided"}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-2">Industry</div>
                <div className="rounded-lg border border-gray-100 bg-gray-50 px-4 py-3 text-[#111827]">
                  {profile?.industry || "Not provided"}
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="font-serif text-2xl text-[#111827] mb-6">Preferences</h2>
            <div className="space-y-6">
              <div>
                <div className="text-sm text-gray-500 mb-3">Compliance domains</div>
                <div className="flex flex-wrap gap-2">
                  {selectedDomainLabels.length > 0 ? (
                    selectedDomainLabels.map((domain) => (
                      <span
                        key={domain}
                        className="rounded-full bg-[#111827] px-3 py-2 text-sm text-white"
                      >
                        {domain}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">No domains selected.</span>
                  )}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500 mb-3">Jurisdictions</div>
                <div className="flex flex-wrap gap-2">
                  {profile?.jurisdictions.length ? (
                    profile.jurisdictions.map((jurisdiction) => (
                      <span
                        key={jurisdiction}
                        className="rounded-full bg-[#f4f4f0] px-3 py-2 text-sm text-gray-600"
                      >
                        {jurisdiction}
                      </span>
                    ))
                  ) : (
                    <span className="text-sm text-gray-400">
                      No jurisdictions selected.
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
