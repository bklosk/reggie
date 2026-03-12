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
            <div className="bg-gradient-to-br from-[#4f8079] to-[#4f7a69] p-12 rounded-3xl shadow-lg max-w-lg text-white">
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

      {/* Testimonials Section */}
      <section className="bg-[#0f141e] text-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl mb-12">
            Trusted by world-class teams
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
                  <div className="font-bold text-sm">Human Person</div>
                  <div className="text-xs text-gray-500">CEO, OpenCompany</div>
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
                    My actual girlfriend
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white text-[#111827] p-8 rounded-xl shadow-lg flex flex-col h-full">
              <div className="flex items-center gap-2 mb-6 font-bold text-lg">
                <span className="w-6 h-6 bg-black rounded flex items-center justify-center text-white text-xs">
                  EM
                </span>
                Emily
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
