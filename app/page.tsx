export default function Home() {
  return (
    <main className="min-h-screen font-sans bg-[#0f141e] flex flex-col">
      {/* Hero Section */}
      <section className="relative m-4 pt-40 pb-32 px-8 overflow-hidden bg-[#f4f4f0] text-[#111827] bg-dot-pattern rounded-3xl min-h-[calc(100vh-2rem)] flex items-center">
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

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center w-full">
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
              We know it&apos;s hard to scale compliance
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-md">
              That&apos;s why reggie helps you automate scans, monitoring, and
              everything in between
            </p>
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
