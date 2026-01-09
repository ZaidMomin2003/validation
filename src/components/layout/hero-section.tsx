
'use client'
import React from 'react';
import { ArrowRight, CheckCircle, ShieldAlert, ShieldX } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const DashboardPreview = () => {
    const data = [
        { email: 'hello@example.com', status: 'Good', notes: 'Valid MX Record', category: 'Business' },
        { email: 'info@company.co', status: 'Risky', notes: 'Role-based email', category: 'Business' },
        { email: 'test@gmail.com', status: 'Good', notes: 'Valid MX Record', category: 'Free' },
        { email: 'fake@disposable.net', status: 'Bad', notes: 'Disposable domain', category: 'Invalid' },
        { email: 'user@domain.xyz', status: 'Bad', notes: 'No MX Record', category: 'Invalid' },
        { email: 'contact@website.org', status: 'Risky', notes: 'Role-based email', category: 'Business' },
    ];
    return (
        <div className="aspect-video w-full overflow-hidden rounded-lg border-2 border-white/10 bg-black shadow-2xl shadow-purple-500/10">
            <div className="h-full w-full bg-grid-white/[0.05] p-4 md:p-6 flex flex-col">
                <div className="flex-shrink-0 grid grid-cols-1 md:grid-cols-3 gap-4">
                     <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-green-200">Good</p>
                            <CheckCircle className="h-4 w-4 text-green-300" />
                        </div>
                        <p className="text-xl font-bold text-white mt-1">1,234</p>
                    </div>
                     <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-yellow-200">Risky</p>
                            <ShieldAlert className="h-4 w-4 text-yellow-300" />
                        </div>
                        <p className="text-xl font-bold text-white mt-1">210</p>
                    </div>
                     <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-medium text-red-200">Bad</p>
                            <ShieldX className="h-4 w-4 text-red-300" />
                        </div>
                        <p className="text-xl font-bold text-white mt-1">56</p>
                    </div>
                </div>
                 <div className="flex-grow mt-4 overflow-hidden rounded-lg border border-white/10 bg-white/5">
                    <div className="h-full overflow-auto">
                        <table className="w-full text-xs">
                            <thead>
                                <tr className="text-left text-white/50">
                                    <th className="p-2 font-normal">Email Address</th>
                                    <th className="p-2 font-normal">Status</th>
                                    <th className="p-2 font-normal">Notes</th>
                                    <th className="p-2 font-normal">Category</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => (
                                    <tr key={i} className="border-t border-white/10">
                                        <td className="p-2 text-white">{row.email}</td>
                                        <td className="p-2">
                                            {row.status === 'Good' && <Badge variant="default" className="bg-green-500/20 text-green-300 border-green-500/30">Good</Badge>}
                                            {row.status === 'Risky' && <Badge variant="default" className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30">Risky</Badge>}
                                            {row.status === 'Bad' && <Badge variant="destructive" className="bg-red-500/20 text-red-300 border-red-500/30">Bad</Badge>}
                                        </td>
                                        <td className="p-2 text-white/70">{row.notes}</td>
                                        <td className="p-2 text-white/70">{row.category}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


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
                    href="/email-validation"
                    className="group border-input inline-flex w-full items-center justify-center rounded-full border-[1px] bg-gradient-to-tr from-zinc-300/5 via-purple-400/20 to-transparent px-10 py-4 text-center text-white transition-colors hover:bg-transparent/90 sm:w-auto"
                  >
                    Start Validating for Free
                  </a>
                </div>
              </span>
            </div>
          </div>
          <div className="mx-10 mt-32">
            <DashboardPreview />
          </div>
        </div>
      </section>
    </div>
  );
}
