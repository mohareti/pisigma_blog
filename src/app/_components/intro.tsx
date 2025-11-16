"use client";

import { TypingAnimation } from "./typing-animation";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8 text-green-400">
        <span className="text-green-500">root@pisigma:~$</span> Blog_
        <TypingAnimation text=" pisigma" speed={100} />
      </h1>
    </section>
  );
}
