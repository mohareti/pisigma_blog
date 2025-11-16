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
    <section className="border border-green-500/30 p-3 sm:p-4 bg-green-500/5 mb-6 sm:mb-8">
      <Link href={`/posts/${slug}`} className="flex flex-col sm:flex-row gap-3 sm:gap-4 hover:bg-green-500/10 transition-colors rounded">
        <div className="flex-shrink-0 w-full sm:w-48 md:w-56 lg:w-64 h-36 sm:h-40 md:h-44 lg:h-48 overflow-hidden bg-green-500/10">
          <Image
            src={coverImage}
            alt={title}
            width={256}
            height={192}
            className="w-full h-full object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 192px, (max-width: 1024px) 224px, 256px"
          />
        </div>
        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="min-w-0">
            <h3 className="mb-2 text-base sm:text-lg md:text-xl leading-snug text-green-400 hover:text-green-300 transition-colors line-clamp-2">
              <span className="text-green-500 mr-2">>></span>
              {title}
            </h3>
            <div className="mb-2 sm:mb-3 text-xs sm:text-sm text-green-500/70">
              <DateFormatter dateString={date} />
            </div>
            <p className="text-sm sm:text-base leading-relaxed text-green-500/80 line-clamp-2 sm:line-clamp-3 mb-3">
              {excerpt}
            </p>
          </div>
          <div className="mt-auto pt-2 border-t border-green-500/20">
            <Avatar name={author.name} picture={author.picture} />
          </div>
        </div>
      </Link>
    </section>
  );
}
