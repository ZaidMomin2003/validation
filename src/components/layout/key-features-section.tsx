
'use client';

import { EvervaultCard, Icon } from "../ui/evervault-card";

export function KeyFeaturesSection() {
  const features = [
    {
      title: "Extract Emails from Text",
      description: "Simply paste any block of text—a document, an article, or raw data. Our smart parser instantly finds and extracts all email addresses for you.",
      badge: "Extract"
    },
    {
      title: "Validate with Precision",
      description: "Our multi-layered validation process checks syntax, verifies domains, and flags disposable or role-based addresses to ensure your list is clean and effective.",
      badge: "Validate"
    },
    {
      title: "Store & Download Anytime",
      description: "Your cleaned and validated lists are securely stored in your account. Access and download your data as a clean CSV file whenever you need it.",
      badge: "Store"
    }
  ];

  return (
    <section className="py-16 md:py-24 text-white">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            A Powerful, Simple Workflow
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            From raw text to a validated email list in just a few clicks.
          </p>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
             <div key={index} className="border border-white/[0.2] flex flex-col items-start max-w-sm mx-auto p-4 relative h-[30rem]">
                <Icon className="absolute h-6 w-6 -top-3 -left-3 text-white" />
                <Icon className="absolute h-6 w-6 -bottom-3 -left-3 text-white" />
                <Icon className="absolute h-6 w-6 -top-3 -right-3 text-white" />
                <Icon className="absolute h-6 w-6 -bottom-3 -right-3 text-white" />
        
                <EvervaultCard text={feature.title} />
        
                <h2 className="text-white mt-4 text-lg font-semibold">
                  {feature.title}
                </h2>
                <p className="text-sm font-light text-muted-foreground mt-4">
                  {feature.description}
                </p>
                <p className="text-sm border font-light border-white/[0.2] rounded-full mt-4 text-white px-2 py-0.5">
                  {feature.badge}
                </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
