import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const team = [
  {
    name: 'M. El Bakkali',
    role: 'Chef d\'Atelier',
    image: '/assets/team-1.jpg',
  },
  {
    name: 'Équipe El Bakkali',
    role: 'Mécaniciens Experts',
    image: '/assets/team-2.jpg',
  },
];

export default function Team() {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  const next = () => setCurrent((prev) => (prev + 1) % team.length);
  const prev = () => setCurrent((prev) => (prev - 1 + team.length) % team.length);

  const member = team[current];

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          {/* Left - Header */}
          <ScrollReveal direction="left">
            <SectionLabel text="NOTRE ÉQUIPE" centered={false} />
            <h2 className="text-4xl font-bold text-fixturbo-dark tracking-tight mb-4">
              Des Professionnels à Votre Service
            </h2>
            <p className="text-fixturbo-text-secondary leading-relaxed mb-8">
              Notre équipe de mécaniciens qualifiés et passionnés met son savoir-faire au service de votre véhicule. Formation continue et matériel de pointe garantissent un travail irréprochable à chaque intervention.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={prev}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-fixturbo-dark hover:bg-fixturbo-primary hover:border-fixturbo-primary hover:text-white transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-fixturbo-dark hover:bg-fixturbo-primary hover:border-fixturbo-primary hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-2 mt-4">
              {team.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === current ? 'bg-fixturbo-primary w-6' : 'bg-gray-300 hover:bg-gray-400 w-2.5'
                  }`}
                  aria-label={`Aller au membre ${i + 1}`}
                />
              ))}
            </div>
          </ScrollReveal>

          {/* Right - Carousel */}
          <ScrollReveal direction="right" className="lg:col-span-2">
            <div className="relative flex items-center justify-center">
              {shouldReduceMotion ? (
                <div className="w-full max-w-sm mx-auto">
                  <div className="group relative">
                    <div className="relative rounded-lg overflow-hidden bg-fixturbo-bg-light aspect-[3/4]">
                      <img
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-4 text-center">
                      <h4 className="text-lg font-bold text-fixturbo-dark">{member.name}</h4>
                      <p className="text-fixturbo-text-secondary text-sm">{member.role}</p>
                    </div>
                  </div>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={member.name}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="w-full max-w-sm mx-auto"
                  >
                    <div className="group relative">
                      <div className="relative rounded-lg overflow-hidden bg-fixturbo-bg-light aspect-[3/4]">
                        <img
                          src={member.image}
                          alt={member.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="mt-4 text-center">
                        <h4 className="text-lg font-bold text-fixturbo-dark">{member.name}</h4>
                        <p className="text-fixturbo-text-secondary text-sm">{member.role}</p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
