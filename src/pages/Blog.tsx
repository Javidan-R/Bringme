// src/pages/Blog.tsx
import { ArrowRight, Clock } from "lucide-react";
import { blogVariants } from "../lib/styles/blog";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const Blog: React.FC = () => {
  const styles = blogVariants();

  const posts: BlogPost[] = [
    {
      id: "1",
      title: "Complete Guide to Digital Nomad Visas in Europe 2025",
      excerpt: "Everything you need to know about obtaining a digital nomad visa in Europe, including requirements, costs, and application processes.",
      category: "Visa Guides",
      author: "Sarah Johnson",
      date: "Mar 15, 2024",
      readTime: "8 min",
      featured: true,
    },
    {
      id: "2",
      title: "Top 10 Countries for Remote Workers",
      excerpt: "Discover the best destinations for remote work based on cost of living, internet speed, and quality of life.",
      category: "Destinations",
      author: "Mike Chen",
      date: "Mar 12, 2024",
      readTime: "6 min",
    },
    {
      id: "3",
      title: "How to Navigate Portuguese D7 Visa Requirements",
      excerpt: "Step-by-step guide to applying for Portugal's popular passive income visa program.",
      category: "Visa Guides",
      author: "Ana Silva",
      date: "Mar 10, 2024",
      readTime: "10 min",
    },
    {
      id: "4",
      title: "Cost of Living Comparison: Berlin vs Lisbon",
      excerpt: "A detailed breakdown of monthly expenses in two of Europe's most popular digital nomad cities.",
      category: "Cost of Living",
      author: "David Weber",
      date: "Mar 8, 2024",
      readTime: "5 min",
    },
    {
      id: "5",
      title: "Essential Documents for EU Visa Applications",
      excerpt: "Complete checklist of required documents when applying for European work and residency visas.",
      category: "Visa Guides",
      author: "Emma Thompson",
      date: "Mar 5, 2024",
      readTime: "7 min",
    },
    {
      id: "6",
      title: "Healthcare Systems in Popular Expat Destinations",
      excerpt: "Understanding healthcare options and insurance requirements for expats in Europe.",
      category: "Living Abroad",
      author: "Dr. James Parker",
      date: "Mar 3, 2024",
      readTime: "9 min",
    },
  ];

  const featuredPost = posts.find(p => p.featured);
  const regularPosts = posts.filter(p => !p.featured);

  return (
    <div className={styles.container()}>
      <div className={styles.header()}>
        <h1 className={styles.title()}>Blog & Resources</h1>
        <p className={styles.subtitle()}>
          Expert guides, tips, and insights for your international move
        </p>
      </div>

      {/* Featured Post */}
      {featuredPost && (
        <div className={styles.featuredCard()}>
          <div className={styles.featuredImage()} />
          <div className={styles.featuredContent()}>
            <span className={styles.category()}>{featuredPost.category}</span>
            <h2 className={styles.featuredTitle()}>{featuredPost.title}</h2>
            <p className={styles.featuredExcerpt()}>{featuredPost.excerpt}</p>
            <div className={styles.meta()}>
              <div className={styles.author()}>
                <div className={styles.avatar()} />
                <span>{featuredPost.author}</span>
              </div>
              <span>•</span>
              <span>{featuredPost.date}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{featuredPost.readTime}</span>
              </div>
            </div>
            <button className={styles.readMore()}>
              Read full article
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Regular Posts Grid */}
      <div className={styles.grid()}>
        {regularPosts.map((post) => (
          <article key={post.id} className={styles.card()}>
            <div className={styles.imageWrapper()}>
              <div className={styles.image()} />
            </div>
            <div className={styles.content()}>
              <span className={styles.category()}>{post.category}</span>
              <h3 className={styles.cardTitle()}>{post.title}</h3>
              <p className={styles.excerpt()}>{post.excerpt}</p>
              <div className={styles.meta()}>
                <div className={styles.author()}>
                  <div className={styles.avatar()} />
                  <span>{post.author}</span>
                </div>
                <span>•</span>
                <span>{post.date}</span>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;