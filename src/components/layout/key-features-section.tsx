
import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

const features = [
    {
        title: "Extract Emails from Text",
        description: "Simply paste any block of text—a document, an article, or raw data. Our smart parser instantly finds and extracts all email addresses for you.",
        badge: "Extract",
        cardText: "Parse"
    },
    {
        title: "Validate & Verify",
        description: "Our multi-layered process checks syntax, verifies domains, and blocks disposable addresses to ensure your list is clean and your deliverability is high.",
        badge: "Verify",
        cardText: "Clean"
    },
    {
        title: "Store & Download",
        description: "Your validated lists are securely stored in your account. Access and download your clean, ready-to-use lists anytime you need them.",
        badge: "Store",
        cardText: "Export"
    }
]

export default function KeyFeaturesSection() {
  return (
    <section className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                Powerful Features, Simplified
            </h2>
            <p className="text-muted-foreground mt-4 text-balance">
                From raw text to validated lists, our tools are designed for speed and accuracy.
            </p>
        </div>
        <div className="mt-12 grid gap-36 md:grid-cols-3 justify-center">
            {features.map((feature, index) => (
                 <div key={index} className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
                    <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
                    <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
                    <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
            
                    <EvervaultCard text={feature.cardText} />
            
                    <h2 className="text-white mt-4 text-lg font-semibold">
                        {feature.title}
                    </h2>
                    <p className="text-sm font-light text-muted-foreground mt-2">
                        {feature.description}
                    </p>
                 </div>
            ))}
        </div>
      </div>
    </section>
  );
}
