// src/pages/Blog.tsx
import { ArrowRight, Clock } from "lucide-react";
import { blogVariants } from "../modules/Onboarding/styles/blog";
import { posts } from "../lib/data/blog";

const Blog: React.FC = () => {
  const styles = blogVariants();
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