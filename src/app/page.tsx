import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { Highlights } from "@/app/_components/highlights";
import { PostsGrid } from "@/app/_components/posts-grid";
import Header from "@/app/_components/header";
import { getAllPosts } from "@/lib/api";
import { Post } from "@/interfaces/post";

// Create dummy highlight posts
function createDummyHighlights(posts: Post[]): Post[] {
  const dummyPosts: Post[] = [
    {
      slug: "dummy-1",
      title: "Advanced Threat Detection: Machine Learning in Cybersecurity",
      date: new Date().toISOString(),
      coverImage: "/assets/blog/preview/cover.jpg",
      author: {
        name: "Pi Sigma Team",
        picture: "/assets/blog/authors/jj.jpeg",
      },
      excerpt: "Exploring how machine learning algorithms are revolutionizing threat detection and incident response in modern security operations centers.",
      ogImage: { url: "/assets/blog/preview/cover.jpg" },
      content: "",
      highlight: true,
      category: "Security Operations",
    },
    {
      slug: "dummy-2",
      title: "Zero-Day Exploits: Understanding and Mitigating Unknown Vulnerabilities",
      date: new Date(Date.now() - 86400000).toISOString(),
      coverImage: "/assets/blog/dynamic-routing/cover.jpg",
      author: {
        name: "Pi Sigma Team",
        picture: "/assets/blog/authors/joe.jpeg",
      },
      excerpt: "A deep dive into zero-day vulnerabilities, their lifecycle, and proactive defense strategies to protect your infrastructure.",
      ogImage: { url: "/assets/blog/dynamic-routing/cover.jpg" },
      content: "",
      highlight: true,
      category: "Threat Intelligence",
    },
    {
      slug: "dummy-3",
      title: "Cloud Security Architecture: Building Resilient Multi-Cloud Infrastructures",
      date: new Date(Date.now() - 172800000).toISOString(),
      coverImage: "/assets/blog/hello-world/cover.jpg",
      author: {
        name: "Pi Sigma Team",
        picture: "/assets/blog/authors/tim.jpeg",
      },
      excerpt: "Best practices for designing and implementing secure cloud architectures that span multiple providers and services.",
      ogImage: { url: "/assets/blog/hello-world/cover.jpg" },
      content: "",
      highlight: true,
      category: "Security Engineering",
    },
  ];

  return dummyPosts;
}

export default function Index() {
  const allPosts = getAllPosts();
  
  // Add dummy highlights
  const dummyHighlights = createDummyHighlights(allPosts);
  
  // Combine and add categories to existing posts
  const categorizedPosts = allPosts.map((post, index) => ({
    ...post,
    category: index % 3 === 0 ? "Security Operations" : index % 3 === 1 ? "Threat Intelligence" : "Security Engineering",
  }));

  const heroPost = categorizedPosts[0] || allPosts[0];
  const morePosts = categorizedPosts.slice(1);

  return (
    <main>
      <Header />
      <Container>
        <Intro />
        <HeroPost
          title={heroPost.title}
          coverImage={heroPost.coverImage}
          date={heroPost.date}
          author={heroPost.author}
          slug={heroPost.slug}
          excerpt={heroPost.excerpt}
        />
        <Highlights posts={[...dummyHighlights, ...categorizedPosts]} />
        {morePosts.length > 0 && <PostsGrid posts={morePosts} />}
      </Container>
    </main>
  );
}
