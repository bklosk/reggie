export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-[#0f141e] flex flex-col">
      {/* Hero Section */}
      <section className="relative m-4 pt-40 pb-16 px-8 overflow-hidden bg-[#f4f4f0] text-[#111827] bg-dot-pattern rounded-3xl min-h-[calc(100vh-2rem)] flex items-end">
        {/* Navigation */}
        <nav className="absolute top-0 left-0 w-full px-8 py-6 flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <span className="font-bold text-2xl tracking-tight">reggie</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-teal-400"></div>
              <div className="w-2 h-2 rounded-full bg-pink-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            </div>
          </div>
          <div className="hidden md:flex flex-col gap-3 text-sm font-medium text-right">
            <a href="#" className="hover:text-gray-600">
              Blog
            </a>
            <a href="#" className="hover:text-gray-600">
              About us
            </a>
            <a href="#" className="hover:text-gray-600">
              Contact
            </a>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-end w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
              We know it&apos;s hard to scale compliance
            </h1>
            <p className="font-serif text-2xl text-gray-600 mb-8 leading-relaxed max-w-md">
              That&apos;s why reggie does it for you, powered by Exa.
            </p>
          </div>

          <div className="flex justify-end">
            <div className="bg-gradient-to-br from-teal-400 to-emerald-600 p-10 rounded-3xl shadow-xl max-w-md text-white">
              <h3 className="font-serif text-3xl mb-4">
                Want to find rules before they find you?
              </h3>
              <p className="mb-8 text-teal-50 text-lg font-serif">
                Just ask reggie.
              </p>
              <button className="bg-[#0f141e] text-white px-8 py-4 rounded-full font-medium hover:bg-black transition w-full">
                Book a demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#0f141e] text-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 flex justify-between items-end">
            <h2 className="font-serif text-4xl md:text-5xl">
              Trusted by world-class teams
            </h2>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-white transition flex items-center gap-2"
            >
              View all customer stories <span className="text-lg">→</span>
            </a>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">
                  OR
                </span>
                OpenRouter
              </div>
              <p className="text-[15px] leading-relaxed mb-12 flex-grow">
                OpenRouter has a laser focus on bringing a great developer
                experience to all language models, and reggie is the best way
                we&apos;ve found for grounding AI in the real world in a
                model-agnostic way.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-sm">Alex Atallah</div>
                  <div className="text-xs text-gray-500">CEO, OpenRouter</div>
                </div>
              </div>
            </div>

            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">
                  N
                </span>
                Notion
              </div>
              <p className="text-[15px] leading-relaxed mb-12 flex-grow">
                reggie&apos;s powerful search capabilities have been
                instrumental in delivering the high-quality, relevant web
                content our users need while maintaining our commitment to
                privacy and user control.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-sm">Sarah Sachs</div>
                  <div className="text-xs text-gray-500">
                    AI Engineering Lead, Notion
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs">
                  ▲
                </span>
                Vercel
              </div>
              <p className="text-[15px] leading-relaxed mb-12 flex-grow">
                This is so powerful. reggie is like Perplexity-as-a-service. The
                infrastructure to ground your AI products on real world data and
                facts.
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-gray-200 flex-shrink-0"></div>
                <div>
                  <div className="font-bold text-sm">Guillermo Rauch</div>
                  <div className="text-xs text-gray-500">CEO, Vercel</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Certifications */}
      <footer className="bg-[#0f141e] text-white py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800 text-sm text-gray-500">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="font-bold text-xl tracking-tight text-white">
                reggie
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
              </div>
            </div>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
