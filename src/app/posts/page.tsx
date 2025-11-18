import Container from "@/app/_components/container";
import { PostsGrid } from "@/app/_components/posts-grid";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";

export default function PostsPage() {
  const allPosts = getAllPosts();
  
  // Add categories to posts
  const categorizedPosts = allPosts.map((post, index) => ({
    ...post,
    category: index % 3 === 0 ? "Security Operations" : index % 3 === 1 ? "Threat Intelligence" : "Security Engineering",
  }));

  return (
    <main>
      <Header />
      <Container>
        <div className="mt-16 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter leading-tight text-green-400">
            <span className="text-green-500">root@pisigma:~$</span> cat all-posts
          </h1>
        </div>
        <PostsGrid posts={categorizedPosts} />
      </Container>
    </main>
  );
}

