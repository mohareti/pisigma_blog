"use client";

import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";
import Link from "next/link";

type Props = {
  posts: Post[];
};

export function PostsGrid({ posts }: Props) {
  // Show only first 9 posts in 3x3 grid
  const displayPosts = posts.slice(0, 9);
  const hasMore = posts.length > 9;

  return (
    <section className="mb-16">
      <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-green-400">
        <span className="text-green-500">$ ls</span> All Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {displayPosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </div>
      {hasMore && (
        <div className="flex justify-center">
          <Link
            href="/posts"
            className="px-6 py-3 border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-400 hover:text-green-300 transition-all font-mono"
          >
            <span className="text-green-500 mr-2">$</span>More Posts
          </Link>
        </div>
      )}
    </section>
  );
}

