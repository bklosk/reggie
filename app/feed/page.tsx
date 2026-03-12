import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ONBOARDING_COOKIE_NAME } from "@/lib/onboarding";
import { FeedApp } from "./FeedApp";

export default async function FeedPage() {
  const cookieStore = await cookies();

  if (cookieStore.get(ONBOARDING_COOKIE_NAME)?.value !== "true") {
    redirect("/onboarding");
  }

  return <FeedApp />;
}
