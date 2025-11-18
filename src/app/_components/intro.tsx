"use client";

import { TypingAnimation } from "./typing-animation";

export function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-12 sm:mt-16 mb-12 sm:mb-16 md:mb-12">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tighter leading-tight md:pr-8 text-green-400 break-words">
        <span className="text-green-500">root@pisigma:~$</span> Welcome to
        <TypingAnimation text=" pisigma" speed={100} />
      </h1>
    </section>
  );
}
