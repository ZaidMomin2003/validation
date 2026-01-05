
'use client';

export default function StatsSection() {
    return (
        <section className="py-12 md:py-20">
            <div className="mx-auto max-w-5xl space-y-8 px-6 md:space-y-16">
                <div className="relative z-10 mx-auto max-w-xl space-y-6 text-center">
                    <h2 className="text-4xl font-medium lg:text-5xl text-white">Cleanmails in numbers</h2>
                    <p className="text-muted-foreground">Our platform is trusted by users to clean and organize messy email data, saving them hours of manual work.</p>
                </div>

                <div className="grid gap-12 divide-y *:text-center md:grid-cols-3 md:gap-2 md:divide-x md:divide-y-0 text-white *:divide-border">
                    <div className="space-y-4 pt-12 md:pt-0">
                        <div className="text-5xl font-bold">1.5M+</div>
                        <p className="text-muted-foreground">Emails Processed</p>
                    </div>
                    <div className="space-y-4 pt-12 md:pt-0">
                        <div className="text-5xl font-bold">10k+</div>
                        <p className="text-muted-foreground">Leads Generated</p>
                    </div>
                    <div className="space-y-4 pt-12 md:pt-0">
                        <div className="text-5xl font-bold">99%</div>
                        <p className="text-muted-foreground">Customer Satisfaction</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
