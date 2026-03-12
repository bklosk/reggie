export default function OnboardingLoading() {
  return (
    <main className="min-h-screen bg-[#05070b]">
      <div className="mx-auto grid min-h-screen max-w-7xl bg-[#05070b] lg:grid-cols-[0.78fr_1.22fr]">
        <section className="bg-[#05070b] px-6 py-8 md:px-10 md:py-10">
          <div className="flex h-full flex-col">
            <div className="mb-16">
              <div className="h-8 w-32 rounded-full bg-white/10 skeleton-shimmer" />
            </div>

            <div className="mt-auto space-y-4 pt-12">
              <div className="h-3 w-full rounded-full bg-white/10 skeleton-shimmer" />
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex gap-3">
                  <div className="h-7 w-7 rounded-full bg-white/10 skeleton-shimmer" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/2 rounded-full bg-white/10 skeleton-shimmer" />
                    <div className="h-3 w-2/3 rounded-full bg-white/10 skeleton-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#f4f4f0] bg-dot-pattern px-6 py-8 md:px-10 md:py-10">
          <div className="space-y-6">
            <div className="h-4 w-24 rounded-full bg-gray-200 skeleton-shimmer" />
            <div className="h-16 max-w-xl rounded-3xl bg-gray-200 skeleton-shimmer" />
            <div className="h-8 max-w-2xl rounded-3xl bg-gray-100 skeleton-shimmer" />
          </div>

          <div className="mt-10 grid gap-6">
            <div className="bg-transparent">
              <div className="mb-4 h-4 w-28 rounded-full bg-gray-200 skeleton-shimmer" />
              <div className="h-14 w-full rounded-md bg-gray-100 skeleton-shimmer" />
            </div>
            <div className="bg-transparent">
              <div className="mb-4 h-4 w-36 rounded-full bg-gray-200 skeleton-shimmer" />
              <div className="h-14 w-full rounded-md bg-gray-100 skeleton-shimmer" />
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between border-t border-gray-200/80 pt-6">
            <div className="h-12 w-28 rounded-full bg-gray-200 skeleton-shimmer" />
            <div className="h-12 w-40 rounded-full bg-gray-300 skeleton-shimmer" />
          </div>
        </section>
      </div>
    </main>
  );
}
