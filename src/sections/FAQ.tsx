import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const faqs = [
  {
    question: 'What is the purpose of a business plan?',
    answer: 'Some essential steps to start a business include conducting market research, creating Some essential steps to start a business. A well-crafted business plan helps you define your goals, identify your target market, and secure funding.',
  },
  {
    question: 'How can I register my business name?',
    answer: 'To register your business name, you will need to check availability with your local business registration office, choose a business structure, and file the appropriate paperwork with your state or local government.',
  },
  {
    question: 'How can I protect my intellectual property?',
    answer: 'You can protect your intellectual property through patents, trademarks, copyrights, and trade secrets. Consulting with an intellectual property attorney is recommended for comprehensive protection.',
  },
];

function AccordionItem({ question, answer, isOpen, onClick }: {
  question: string; answer: string; isOpen: boolean; onClick: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="rounded overflow-hidden">
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between px-6 py-5 text-left transition-all duration-300 ${
          isOpen
            ? 'bg-fixturbo-primary text-white'
            : 'bg-fixturbo-bg-light text-fixturbo-dark hover:bg-gray-100'
        }`}
      >
        <span className="font-semibold text-sm md:text-base pr-4">{question}</span>
        <ChevronDown
          className={`w-5 h-5 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        shouldReduceMotion ? (
          <div className="px-6 py-5 bg-white border border-fixturbo-border-light border-t-0">
            <p className="text-fixturbo-text-secondary text-sm leading-relaxed">{answer}</p>
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-6 py-5 bg-white border border-fixturbo-border-light border-t-0">
                <p className="text-fixturbo-text-secondary text-sm leading-relaxed">{answer}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        )
      )}
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Accordion */}
          <div>
            <ScrollReveal direction="left">
              <SectionLabel text="ASK ANYTHING" centered={false} />
              <h2 className="text-3xl md:text-4xl font-bold text-fixturbo-dark tracking-tight mb-10">
                Empowering businesses<br />For A Brighter Future
              </h2>
            </ScrollReveal>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <ScrollReveal key={faq.question} direction="left" delay={i * 0.15}>
                  <AccordionItem
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openIndex === i}
                    onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
                  />
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right - Image */}
          <ScrollReveal direction="right" className="relative">
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="assets/faq-mechanic.jpg"
                alt="Female mechanic"
                loading="lazy"
                decoding="async"
                className="w-full h-[450px] lg:h-[520px] object-cover rounded-lg"
              />
              {/* Floating Stat Card */}
              <div className="absolute left-4 lg:-left-4 bottom-8 bg-white shadow-xl p-5 rounded-lg flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-fixturbo-primary flex items-center justify-center text-white font-bold text-lg">
                  +
                </div>
                <div>
                  <div className="text-2xl font-bold text-fixturbo-dark">250+</div>
                  <div className="text-xs text-fixturbo-text-secondary">Services we provide</div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
