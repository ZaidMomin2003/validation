"use client";
import React from "react";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <div className="flex justify-center items-center h-[20rem] flex-col px-4">
      <div className="text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto mb-10">
        <LinkPreview url="https://wisdomis.fun" className="font-bold">
          Wisdom is fun
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview url="https://talxify.space" className="font-bold">
          Talxify
        </LinkPreview>{" "}
        use our fast and reliable platform.
      </div>
      <div className="text-neutral-400 text-xl md:text-3xl max-w-3xl mx-auto">
        Hosted and secured by{" "}
        <LinkPreview
          url="https://firebase.google.com/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-amber-500 to-orange-500"
        >
          Firebase
        </LinkPreview>{" "}
        for reliable and fast performance.
      </div>
    </div>
  );
}
