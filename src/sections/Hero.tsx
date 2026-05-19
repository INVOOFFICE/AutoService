import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import Container from '../components/Container';

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();

  const MotionDiv = shouldReduceMotion ? 'div' : motion.div;
  const MotionH1 = shouldReduceMotion ? 'h1' : motion.h1;
  const MotionP = shouldReduceMotion ? 'p' : motion.p;

  const fadeInLeft = (delay: number) =>
    shouldReduceMotion
      ? {}
      : { initial: { opacity: 0, x: -30 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' as const } };

  const fadeInUp = (delay: number) =>
    shouldReduceMotion
      ? {}
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6, delay, ease: 'easeOut' as const } };

  const bgScale = shouldReduceMotion
    ? {}
    : { initial: { scale: 1.05 }, animate: { scale: 1 }, transition: { duration: 1.5, ease: 'easeOut' as const } };

  return (
    <section id="hero" className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-center overflow-hidden">
      {/* Background Image */}
      <MotionDiv
        {...bgScale}
        className="absolute inset-0"
      >
        <img
          src="/assets/hero-bg.jpg"
          alt="Mécanicien travaillant sur un moteur de voiture"
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/50 to-transparent" />
        {/* Red diagonal accent */}
        <div
          className="absolute inset-0 bg-fixturbo-primary/90"
          style={{
            clipPath: 'polygon(0 0, 45% 0, 25% 100%, 0 100%)',
          }}
        />
      </MotionDiv>

      {/* Content */}
      <Container className="relative z-10 py-20">
        <div className="max-w-2xl">
          {/* Label */}
          <MotionDiv
            {...fadeInLeft(0.3)}
            className="flex items-center gap-4 mb-6"
          >
            <span className="h-[2px] w-10 bg-white" />
            <span className="text-[13px] font-semibold tracking-[0.12em] uppercase text-white/90">
              VOTRE EXPERT AUTO À MEKNÈS
            </span>
          </MotionDiv>

          {/* Heading */}
          <MotionH1
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0, x: -40 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.8, delay: 0.5, ease: 'easeOut' } })}
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6"
          >
            Auto Service<br />
            El Bakkali<br />
            <span className="text-3xl md:text-4xl lg:text-5xl font-bold">Meknès</span>
          </MotionH1>

          {/* Body */}
          <MotionP
            {...(shouldReduceMotion ? {} : { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.6, delay: 0.7 } })}
            className="text-base md:text-lg text-white/80 leading-relaxed mb-8 max-w-xl"
          >
            Diagnostic auto, électricité, réparation, vidange, climatisation et nettoyage FAP sans démontage. Votre garage de confiance à El Menzah, Meknès.
          </MotionP>

          {/* CTA Row */}
          <MotionDiv
            {...fadeInUp(0.9)}
            className="flex items-center gap-6 flex-wrap"
          >
            <a
              href="#services"
              className="inline-block px-8 py-4 bg-fixturbo-primary text-white text-sm font-semibold tracking-[0.08em] uppercase rounded hover:bg-fixturbo-primary-dark hover:-translate-y-0.5 hover:shadow-button transition-all duration-300"
            >
              Nos Services
            </a>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-fixturbo-primary flex items-center justify-center">
                <Phone className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-white/60 text-xs block">Appelez-nous :</span>
                <a href="tel:0609052144" className="text-white font-semibold text-lg hover:text-fixturbo-primary transition-colors">
                  06 09 05 21 44
                </a>
              </div>
            </div>
          </MotionDiv>
        </div>
      </Container>
    </section>
  );
}
