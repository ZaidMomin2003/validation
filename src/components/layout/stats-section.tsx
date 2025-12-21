
'use client';

export default function StatsSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl text-white">Verilist in numbers</h2>
                    <p className="text-muted-foreground">Our platform is trusted by users to clean and validate millions of emails, ensuring higher deliverability and better campaign results.</p>
                </div>

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0 text-white *:divide-border">
                    <div className="space-y-4 pt-12 md:pt-0">
                        <div className="text-5xl font-bold">120+</div>
                        <p className="text-muted-foreground">Active Users</p>
                    </div>
                    <div className="space-y-4 pt-12 md:pt-0">
                        <div className="text-5xl font-bold">1.5 Million+</div>
                        <p className="text-muted-foreground">Leads Validated</p>
                    </div>
                    <div className="space-y-4 pt-12 md:pt-0">
                        <div className="text-5xl font-bold">99%</div>
                        <p className="text-muted-foreground">Accuracy Rate</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
