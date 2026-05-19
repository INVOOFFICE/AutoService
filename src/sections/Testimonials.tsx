import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const testimonials = [
  {
    name: 'Ahmed B.',
    role: 'Client régulier',
    avatar: 'AB',
    text: 'Excellente prestation ! Mon FAP était encrassé et le voyant moteur ne s\'éteignait plus. En une heure, tout était réglé. Tarif très correct et service rapide.',
  },
  {
    name: 'Fatima L.',
    role: 'Cliente Meknès',
    avatar: 'FL',
    text: 'Je fais confiance à Auto Service El Bakkali depuis des années pour l\'entretien de ma voiture. Ils sont honnêtes, compétents et ne facturent que le nécessaire.',
  },
  {
    name: 'Karim T.',
    role: 'Chauffeur VTC',
    avatar: 'KT',
    text: 'En tant que chauffeur, ma voiture est mon outil de travail. L\'équipe d\'El Bakkali comprend ça et me dépanne toujours rapidement. Le nettoyage FAP est top !',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  const currentTestimonial = testimonials[current];

  return (
    <section className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Image */}
        <ScrollReveal direction="left" className="relative min-h-[400px] lg:min-h-[550px]">
          <img
            src="assets/testimonial-bg.jpg"
            alt="Atelier mécanique"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </ScrollReveal>

        {/* Right - Testimonial Content */}
        <div className="bg-fixturbo-primary py-16 lg:py-24 px-6 lg:px-16 xl:px-20 flex items-center">
          <div className="w-full">
            <ScrollReveal direction="right">
              <SectionLabel text="AVIS CLIENTS" light centered={false} />
              <h2 className="text-4xl font-bold text-white tracking-tight mb-10">
                CE QUE DISENT<br />NOS CLIENTS
              </h2>
            </ScrollReveal>

            {/* Testimonial Carousel */}
            <div className="relative min-h-[200px]">
              {shouldReduceMotion ? (
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                      {currentTestimonial.avatar}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{currentTestimonial.name}</h4>
                      <p className="text-white/70 text-sm">{currentTestimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-white text-white" />
                    ))}
                  </div>
                  <p className="text-white/85 leading-relaxed text-base">
                    {currentTestimonial.text}
                  </p>
                </div>
              ) : (
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-lg">
                        {currentTestimonial.avatar}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">{currentTestimonial.name}</h4>
                        <p className="text-white/70 text-sm">{currentTestimonial.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-white text-white" />
                      ))}
                    </div>
                    <p className="text-white/85 leading-relaxed text-base">
                      {currentTestimonial.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3 mt-8">
              <button
                type="button"
                onClick={prev}
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-fixturbo-primary transition-all duration-300"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-fixturbo-primary transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
