
'use client'
import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  return (
    <div className="relative w-full bg-neutral-950">
      <div className="absolute top-0 z-[0] h-full w-full bg-neutral-900/10 bg-[radial-gradient(ellipse_20%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <section className="relative z-1 mx-auto max-w-full">
        <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
          <div className="absolute inset-0 [transform:rotateX(35deg)]">
            <div className="animate-grid [inset:0%_0px] [margin-left:-50%] [height:300vh] [width:600vw] [transform-origin:100%_0_0] [background-image:linear-gradient(to_right,rgba(255,255,255,0.25)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.2)_1px,transparent_0)] [background-size:120px_120px] [background-repeat:repeat]"></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent to-90%"></div>
        </div>

        <div className="z-10 mx-auto max-w-screen-xl gap-12 px-4 py-28 text-gray-600 md:px-8">
          <div className="mx-auto max-w-3xl space-y-5 text-center leading-0 lg:leading-5">
            <a href="#" className="group inline-flex items-center justify-center gap-x-2 rounded-full border border-white/20 bg-white/5 px-2.5 py-1.5 text-sm text-white/80 transition-colors hover:bg-white/10">
              <span className="mr-1.5 inline-block rounded-full bg-red-500/30 px-2 py-0.5 text-xs font-medium text-red-300 ring-1 ring-inset ring-red-500/40">
                NEW
              </span>
              <span className="text-white">Clean lists, better deliverability</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <h2 className="font-geist mx-auto bg-[linear-gradient(180deg,_#FFF_0%,_rgba(255,_255,_255,_0.00)_202.08%)] bg-clip-text text-4xl tracking-tighter text-transparent md:text-6xl">
              Never send to a bad email again.
              <span className="bg-gradient-to-r from-purple-300 to-orange-200 bg-clip-text text-transparent">
                 Validate, clean, and verify with precision.
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-gray-300">
              Cleanmails provides robust, fast, and affordable email validation.
              Stop bounces, remove disposable addresses, and protect your sender reputation in minutes.
            </p>
            <div className="items-center justify-center space-y-3 gap-x-3 sm:flex sm:space-y-0">
              <span className="relative inline-block overflow-hidden rounded-full p-[1.5px]">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <div className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-gray-950 text-xs font-medium text-gray-50 backdrop-blur-3xl">
                  <a
                    href="/bulk-validate"
                    className="group border-input inline-flex w-full items-center justify-center rounded-full border-[1px] bg-gradient-to-tr from-zinc-300/5 via-purple-400/20 to-transparent px-10 py-4 text-center text-white transition-colors hover:bg-transparent/90 sm:w-auto"
                  >
                    Start Validating for Free
                  </a>
                </div>
              </span>
            </div>
          </div>
          <div className="mx-10 mt-32">
             <div className="aspect-video w-full overflow-hidden rounded-lg border shadow-lg">
                <iframe
                    src="https://player.vimeo.com/video/76979871?badge=0&autopause=0&player_id=0&app_id=58479"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                    className="h-full w-full"
                    title="Placeholder Video"
                ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
