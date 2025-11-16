"use client";

import Avatar from "@/app/_components/avatar";
import { type Author } from "@/interfaces/author";
import Link from "next/link";
import Image from "next/image";
import DateFormatter from "./date-formatter";

type Props = {
  title: string;
  coverImage: string;
  date: string;
  excerpt: string;
  author: Author;
  slug: string;
};

export function HeroPost({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) {
  return (
    <section className="border border-green-500/30 p-4 bg-green-500/5 mb-8">
      <Link href={`/posts/${slug}`} className="flex flex-col md:flex-row gap-4 hover:bg-green-500/10 transition-colors">
        <div className="flex-shrink-0 w-full md:w-64 h-40 md:h-48 overflow-hidden bg-green-500/10">
          <Image
            src={coverImage}
            alt={title}
            width={256}
            height={192}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <h3 className="mb-2 text-lg md:text-xl leading-snug text-green-400 hover:text-green-300 transition-colors">
              <span className="text-green-500 mr-2">>></span>
              {title}
            </h3>
            <div className="mb-3 text-sm text-green-500/70">
              <DateFormatter dateString={date} />
            </div>
            <p className="text-base leading-relaxed text-green-500/80 line-clamp-2 mb-3">
              {excerpt}
            </p>
          </div>
          <Avatar name={author.name} picture={author.picture} />
        </div>
      </Link>
    </section>
  );
}
