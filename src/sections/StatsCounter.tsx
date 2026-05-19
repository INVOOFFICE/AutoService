import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Container from '../components/Container';

const stats = [
  { value: 1500, suffix: '+', label: 'Véhicules Réparés' },
  { value: 1000, suffix: '+', label: 'Clients Satisfaits' },
  { value: 10, suffix: '+', label: "Années d'Expérience" },
  { value: 6, suffix: '', label: 'Spécialités' },
];

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const duration = 2500;
    const startTime = Date.now();
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsCounter() {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = shouldReduceMotion ? 'div' : motion.div;

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={`${import.meta.env.BASE_URL}assets/project-1.jpg`}
          alt="Atelier mécanique"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <MotionDiv
              key={stat.label}
              {...(shouldReduceMotion ? {} : { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay: i * 0.2 } })}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-bold text-white mb-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)' }}>
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm text-white/60 uppercase tracking-wider">{stat.label}</div>
            </MotionDiv>
          ))}
        </div>
      </Container>
    </section>
  );
}
