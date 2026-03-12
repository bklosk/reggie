import Image from "next/image";

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

        <div className="mx-auto grid md:grid-cols-2 gap-16 items-end w-full">
          <div className="max-w-2xl">
            <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] tracking-tight mb-6">
              We know it&apos;s hard to scale compliance
            </h1>
            <p className="font-serif text-2xl text-gray-600 mb-8 leading-relaxed max-w-md">
              That&apos;s why reggie does it for you, powered by Exa.
            </p>
          </div>

          <div className="flex justify-end">
            <div className="bg-gradient-to-br from-[#2CA58D] to-[#208672] p-12 rounded-3xl shadow-lg max-w-lg text-white">
              <h3 className="font-serif text-3xl mb-4">
                Want to find rules before they find you?
              </h3>
              <p className="mb-8 text-teal-50 text-lg font-serif">
                Just ask reggie.
              </p>
              <a
                href="/radar"
                className="inline-flex items-center justify-center bg-[#0f141e] text-white px-8 py-4 rounded-full font-medium hover:bg-black transition w-full"
              >
                Get started
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* How it works Section */}
      <section className="bg-[#0f141e] text-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              How do we do it?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              We stay on the hunt across the regulatory landscape.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#151b28] rounded-2xl overflow-hidden border border-gray-800/60 flex flex-col">
              <div className="h-48 bg-[#1a2130] relative flex items-center justify-center overflow-hidden">
                {/* Abstract grid/isometric visual */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px] [transform:rotateX(60deg)_rotateZ(45deg)_scale(1.5)]"></div>
                <div className="relative z-10 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-lg shadow-2xl [transform:rotateX(60deg)_rotateZ(45deg)]">
                  <div className="w-16 h-2 bg-white/20 rounded-full mb-2"></div>
                  <div className="w-24 h-2 bg-white/20 rounded-full"></div>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="font-bold text-lg mb-3 text-white">Automate compliance discovery</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Manual searches are slow, and you'll inevitably miss something. We automate the search for you, so you can focus on the hard parts.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#151b28] rounded-2xl overflow-hidden border border-gray-800/60 flex flex-col">
              <div className="h-48 bg-[#1a2130] relative flex items-center justify-center overflow-hidden">
                {/* Radiating lines visual */}
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  {[...Array(8)].map((_, i) => (
                    <div key={i} className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-white to-transparent" style={{ transform: `rotate(${i * 22.5}deg)` }}></div>
                  ))}
                </div>
                <div className="relative z-10 bg-white px-6 py-4 rounded-xl shadow-[0_0_30px_rgba(255,255,255,0.1)] flex items-center gap-2">
                  <span className="font-bold text-black tracking-tight">reggie</span>
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-pink-400"></div>
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-400"></div>
                  </div>
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="font-bold text-lg mb-3 text-white">One system = Reduced cost</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  When your systems aren&apos;t connected, compliance risks can go unnoticed and your costs can skyrocket. Reduce your compliance cost - go with reggie.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#151b28] rounded-2xl overflow-hidden border border-gray-800/60 flex flex-col">
              <div className="h-48 bg-[#1a2130] relative flex items-center justify-center overflow-hidden">
                {/* Connected nodes visual */}
                <div className="flex flex-col gap-3 relative z-10 w-full px-12">
                  <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2"></div>
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-[#222b3d] border border-gray-700/50 rounded-lg p-3 flex items-center gap-3 relative z-10">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-white/40"></div>
                      </div>
                      <div>
                        <div className="w-16 h-2 bg-white/30 rounded-full mb-1.5"></div>
                        <div className="w-24 h-1.5 bg-white/10 rounded-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="font-bold text-lg mb-3 text-white">Cut false positives, clear backlogs</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  False positives slow down and divert attention from real risks. Smart alerts help you reduce the backlog and focus on what requires immediate action.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlight Section */}
      <section className="bg-[#0f141e] text-white py-24 px-8">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden bg-[#151b28] border border-gray-800/60 flex items-center justify-center">
            {/* Abstract visual placeholder matching the design language */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
            <div className="relative z-10 w-3/4 h-3/4 bg-[#1a2130] rounded-xl border border-gray-700/50 shadow-2xl flex flex-col overflow-hidden">
              <div className="h-10 border-b border-gray-700/50 flex items-center px-4 gap-2 bg-[#151b28]">
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              </div>
              <div className="p-6 flex-grow flex flex-col gap-3">
                <div className="flex justify-between items-center mb-2">
                  <div className="w-1/3 h-4 bg-gray-700/50 rounded-full"></div>
                </div>
                
                {/* Alert Item 1 - Critical */}
                <div className="w-full bg-red-500/5 rounded-lg border border-red-500/20 p-3 flex gap-3 items-start relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
                  <div className="w-2 h-2 mt-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]"></div>
                  <div className="flex-grow flex flex-col gap-2">
                    <div className="w-3/4 h-2.5 bg-gray-300/90 rounded-full"></div>
                    <div className="w-1/2 h-1.5 bg-gray-500/70 rounded-full"></div>
                  </div>
                </div>

                {/* Alert Item 2 - Warning */}
                <div className="w-full bg-gray-800/30 rounded-lg border border-gray-700/50 p-3 flex gap-3 items-start">
                  <div className="w-2 h-2 mt-1 rounded-full bg-yellow-400 shadow-[0_0_8px_rgba(250,204,21,0.6)]"></div>
                  <div className="flex-grow flex flex-col gap-2">
                    <div className="w-2/3 h-2.5 bg-gray-400/80 rounded-full"></div>
                    <div className="w-1/3 h-1.5 bg-gray-600/60 rounded-full"></div>
                  </div>
                </div>

                {/* Alert Item 3 - Info */}
                <div className="w-full bg-gray-800/30 rounded-lg border border-gray-700/50 p-3 flex gap-3 items-start">
                  <div className="w-2 h-2 mt-1 rounded-full bg-[#2CA58D] shadow-[0_0_8px_rgba(44,165,141,0.6)]"></div>
                  <div className="flex-grow flex flex-col gap-2">
                    <div className="w-4/5 h-2.5 bg-gray-400/80 rounded-full"></div>
                    <div className="w-2/5 h-1.5 bg-gray-600/60 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>

          </div>
          
          {/* Text Side */}
          <div>
            <div className="inline-block border border-gray-700 text-gray-300 rounded-full px-4 py-1.5 text-xs font-medium tracking-widest uppercase mb-6">
              Continuous Monitoring
            </div>
            <h2 className="font-serif text-4xl md:text-5xl mb-6 leading-tight">
              Never miss a regulatory update
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Compliance isn&apos;t a one-time check. Our platform continuously scans for regulatory changes and automatically flags risks before they become liabilities. Keep your team focused on growth, not manual research.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#0f141e] text-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl mb-12">
            Loved by real people, with real stakes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">
                  OC
                </span>
                OpenCompany
              </div>
              <p className="text-[15px] leading-relaxed mb-12 flex-grow">
                I am a real person and I love reggie!!! Reggie is able to find proposed rules that my analysts would never track down on their own. #reggieisthebest  #iamarealhumanperson
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face"
                  alt="Alex Atallah"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-sm">Human Personson</div>
                  <div className="text-xs text-gray-500">CEO, OpenCompany</div>
                </div>
              </div>
            </div>

            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">
                  GF
                </span>
                My Girlfriend
              </div>
              <p className="text-[15px] leading-relaxed mb-12 flex-grow">
                Uh, cool, I guess? You want me to say "hashtag reggie rocks?" Why would I do that?
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&crop=face"
                  alt="Sarah Sachs"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-sm">Kelsey Hall</div>
                  <div className="text-xs text-gray-500">
                    Actual girlfriend
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">
                  EM
                </span>
                Friend from improv class
              </div>
              <p className="text-[15px] leading-relaxed mb-12 flex-grow">
                Oh, yo, that's actually cool, I've spent the past year searching for laws and news...
              </p>
              <div className="flex items-center gap-3">
                <Image
                  src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&h=80&fit=crop&crop=face"
                  alt="Guillermo Rauch"
                  width={40}
                  height={40}
                  className="w-10 h-10 rounded object-cover flex-shrink-0"
                />
                <div>
                  <div className="font-bold text-sm">Emily</div>
                  <div className="text-xs text-gray-500">Friend who works in risk management</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer / Certifications */}
      <footer className="bg-[#0f141e] text-white pt-12 pb-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-gray-800 text-sm text-gray-500">
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
