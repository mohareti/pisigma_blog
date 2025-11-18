"use client";

import { Post } from "@/interfaces/post";
import { PostPreview } from "./post-preview";

type Props = {
  posts: Post[];
};

export function PartitionedPosts({ posts }: Props) {
  // Split posts into two partitions
  const midPoint = Math.ceil(posts.length / 2);
  const leftPartition = posts.slice(0, midPoint);
  const rightPartition = posts.slice(midPoint);

  // Group by category if available
  const categorizedPosts = posts.reduce((acc, post) => {
    const category = post.category || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  const categories = Object.keys(categorizedPosts);
  const hasCategories = categories.length > 1;

  if (hasCategories) {
    // Show categorized view
    const categoryList = Object.entries(categorizedPosts);
    const midCategory = Math.ceil(categoryList.length / 2);
    const leftCategories = categoryList.slice(0, midCategory);
    const rightCategories = categoryList.slice(midCategory);

    return (
      <section className="mb-16">
        <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-green-400">
          <span className="text-green-500">$ cat</span> All Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="space-y-12">
            {leftCategories.map(([category, categoryPosts]) => (
              <CategorySection key={category} category={category} posts={categoryPosts} />
            ))}
          </div>
          <div className="space-y-12">
            {rightCategories.map(([category, categoryPosts]) => (
              <CategorySection key={category} category={category} posts={categoryPosts} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Show simple two-column partition
  return (
    <section className="mb-16">
      <h2 className="mb-8 text-2xl md:text-3xl font-bold tracking-tighter leading-tight text-green-400">
        <span className="text-green-500">$ cat</span> All Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        <div className="space-y-8">
          {leftPartition.map((post) => (
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
        <div className="space-y-8">
          {rightPartition.map((post) => (
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
      </div>
    </section>
  );
}

function CategorySection({ category, posts }: { category: string; posts: Post[] }) {
  return (
    <div>
      <h3 className="text-xl mb-6 font-bold text-green-400 border-b border-green-500/30 pb-2">
        <span className="text-green-500">$</span> {category}
      </h3>
      <div className="space-y-6">
        {posts.map((post) => (
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
    </div>
  );
}

