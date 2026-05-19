import { User, MessageCircle, ArrowRight } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const posts = [
  {
    image: '/assets/about-secondary.jpg',
    day: '17',
    month: 'Feb',
    author: 'admin',
    comments: '05',
    title: 'Strategic Solutions for Sustainable Success',
  },
  {
    image: '/assets/project-2.jpg',
    day: '17',
    month: 'Feb',
    author: 'admin',
    comments: '05',
    title: 'Empowering Businesses Fueling Growth',
  },
  {
    image: '/assets/project-3.jpg',
    day: '17',
    month: 'Feb',
    author: 'admin',
    comments: '05',
    title: 'Strategic guidance for your business success',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <Container>
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <SectionLabel text="BLOG" />
          <h2 className="text-4xl md:text-5xl font-bold text-fixturbo-dark tracking-tight">
            Strategic Solutions For<br />A Thriving Future
          </h2>
        </ScrollReveal>

        {/* Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.title} delay={i * 0.15}>
              <article tabIndex={0} className="group bg-white rounded-lg overflow-hidden border border-fixturbo-border-light hover:shadow-card-hover transition-all duration-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fixturbo-primary focus-visible:ring-offset-2">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 bg-fixturbo-primary text-white px-4 py-2 rounded text-center">
                    <div className="text-xl font-bold leading-none">{post.day}</div>
                    <div className="text-[11px] uppercase tracking-wider">{post.month}</div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-4 mb-3 text-xs text-fixturbo-text-secondary">
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-fixturbo-primary" />
                      By {post.author}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle className="w-3.5 h-3.5 text-fixturbo-primary" />
                      Comments ({post.comments})
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-bold text-fixturbo-dark mb-4 leading-snug">
                    {post.title}
                  </h4>

                  {/* Read More */}
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-fixturbo-primary text-sm font-semibold uppercase tracking-wider hover:gap-3 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fixturbo-primary focus-visible:ring-offset-2"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
