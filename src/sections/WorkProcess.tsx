import { ArrowRight, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const steps = [
  {
    step: 'ÉTAPE 1',
    title: 'Diagnostic',
    description: 'Nous effectuons un diagnostic complet de votre véhicule pour identifier précisément les problèmes. Vous recevez un devis détaillé et transparent avant toute intervention.',
  },
  {
    step: 'ÉTAPE 2',
    title: 'Intervention',
    description: 'Nos mécaniciens qualifiés réalisent les réparations avec des pièces de qualité et du matériel professionnel. Nous vous tenons informés à chaque étape.',
  },
  {
    step: 'ÉTAPE 3',
    title: 'Livraison',
    description: 'Votre véhicule subit un contrôle qualité final. Nous vous le restituons propre, en parfait état de marche, avec une garantie sur les interventions effectuées.',
  },
];

export default function WorkProcess() {
  return (
    <section className="py-24 bg-fixturbo-dark gear-pattern relative">
      <Container className="relative z-10">
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionLabel text="NOTRE PROCESSUS" light />
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Un Service Professionnel<br />En 3 Étapes
          </h2>
        </ScrollReveal>

        {/* Steps */}
        <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4">
          {steps.map((item, i) => (
            <div key={item.step} className="flex-1 flex items-center">
              <ScrollReveal delay={i * 0.2} className="w-full">
                <div className="relative bg-white/5 border border-white/10 rounded-lg p-8 pt-12">
                  {/* Step Label */}
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-fixturbo-primary text-white text-sm font-bold tracking-wider rounded">
                    {item.step}
                  </div>

                  <h4 className="text-xl font-bold text-white mb-4 text-center">{item.title}</h4>
                  <p className="text-white/60 text-sm leading-relaxed text-center mb-6">
                    {item.description}
                  </p>
                  <div className="text-center">
                    <button type="button" className="inline-flex items-center gap-2 text-white text-sm font-semibold uppercase tracking-wide hover:text-fixturbo-primary transition-colors">
                      En savoir plus
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </ScrollReveal>

              {/* Arrow between steps (desktop only) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center justify-center px-2 shrink-0">
                  <ChevronRight className="w-6 h-6 text-fixturbo-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
