"use client";

import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import Link from "next/link";
import Image from "next/image";

type Props = {
  posts: Post[];
};

export function Highlights({ posts }: Props) {
  // Filter highlights or use first 3 posts as highlights
  const highlightPosts = posts.filter(p => p.highlight).slice(0, 3);
  const displayPosts = highlightPosts.length >= 3 ? highlightPosts : posts.slice(0, 3);

  return (
    <section className="mb-12 md:mb-16">
      <h2 className="mb-6 md:mb-8 text-xl md:text-2xl lg:text-3xl font-bold tracking-tighter leading-tight text-green-400">
        <span className="text-green-500">$ ls -a</span> Highlights
      </h2>
      <div className="overflow-x-auto pb-4 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0">
        <div className="flex gap-4 md:gap-6 snap-x snap-mandatory scroll-smooth">
          {displayPosts.map((post) => (
            <HighlightCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HighlightCard({ post }: { post: Post }) {
  return (
    <Link 
      href={`/posts/${post.slug}`}
      className="flex-shrink-0 w-[280px] sm:w-80 md:w-96 snap-start border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-all hover:border-green-500/50 group"
    >
      <div className="relative h-40 sm:h-48 w-full overflow-hidden bg-green-500/10">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 384px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-green-500/30">
            <span className="text-4xl">📄</span>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg md:text-xl mb-2 leading-snug text-green-400 group-hover:text-green-300 transition-colors line-clamp-2">
          <span className="text-green-500 mr-2">$</span>
          {post.title}
        </h3>
        <p className="text-xs sm:text-sm mb-2 sm:mb-3 text-green-500/70">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="text-sm sm:text-base leading-relaxed text-green-500/80 line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

