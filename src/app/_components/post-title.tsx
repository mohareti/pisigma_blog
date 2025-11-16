"use client";

import { ReactNode } from "react";
import { TypingAnimation } from "./typing-animation";

type Props = {
  children?: ReactNode;
};

export function PostTitle({ children }: Props) {
  const text = typeof children === "string" ? children : String(children ?? "");
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight md:leading-none mb-8 text-center md:text-left text-green-400">
      <span className="text-green-500 mr-3">>></span>
      <TypingAnimation text={text} speed={35} />
    </h1>
  );
}
