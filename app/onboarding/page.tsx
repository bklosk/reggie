import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { OnboardingFlow } from "./OnboardingFlow";
import { ONBOARDING_COOKIE_NAME } from "@/lib/onboarding";

export default async function OnboardingPage() {
  const cookieStore = await cookies();

  if (cookieStore.get(ONBOARDING_COOKIE_NAME)?.value === "true") {
    redirect("/feed");
  }

  return <OnboardingFlow />;
}
