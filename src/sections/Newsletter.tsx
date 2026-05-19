import { ArrowRight } from 'lucide-react';
import Container from '../components/Container';
import ScrollReveal from '../components/ScrollReveal';

export default function Newsletter() {
  return (
    <section className="relative py-20 bg-fixturbo-primary diagonal-stripes overflow-hidden">
      <Container className="relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <ScrollReveal direction="left" className="lg:max-w-xl">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Road-Ready With Our Tips
            </h3>
            <p className="text-white/80 leading-relaxed">
              Subscribe to our newsletter for seasonal maintenance reminders, exclusive offers, and expert advice to keep your vehicle in peak condition.
            </p>
          </ScrollReveal>

          {/* Right Form */}
          <ScrollReveal direction="right" delay={0.2} className="w-full lg:w-auto">
            <form className="flex w-full lg:w-[420px]" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your Email Address"
                className="flex-1 px-5 py-4 bg-white text-fixturbo-dark placeholder:text-gray-400 rounded-l focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-4 bg-fixturbo-dark text-white rounded-r hover:bg-black transition-colors flex items-center gap-2"
              >
                SUBSCRIBE
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
