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
    <section className="mb-16">
      <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-green-400">
        <span className="text-green-500">$ ls -a</span> Highlights
      </h2>
      <div className="overflow-x-auto pb-4 -mx-4 px-4">
        <div className="flex gap-6 min-w-max">
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
      className="flex-shrink-0 w-80 md:w-96 border border-green-500/30 bg-green-500/5 hover:bg-green-500/10 transition-all hover:border-green-500/50 group"
    >
      <div className="relative h-48 w-full overflow-hidden bg-green-500/10">
        {post.coverImage ? (
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-green-500/30">
            <span className="text-4xl">📄</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl mb-2 leading-snug text-green-400 group-hover:text-green-300 transition-colors">
          <span className="text-green-500 mr-2">$</span>
          {post.title}
        </h3>
        <p className="text-sm mb-3 text-green-500/70">
          {new Date(post.date).toLocaleDateString()}
        </p>
        <p className="text-base leading-relaxed text-green-500/80 line-clamp-3">
          {post.excerpt}
        </p>
      </div>
    </Link>
  );
}

