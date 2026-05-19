import { Users, Trophy, Wrench, Shield } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const features = [
  {
    icon: Wrench,
    title: 'Réparation Professionnelle',
    description: 'Toutes réparations mécaniques et électriques réalisées avec des outils de diagnostic modernes et des pièces de qualité.',
  },
  {
    icon: Shield,
    title: 'Garantie & Confiance',
    description: 'Nous garantissons la qualité de nos interventions. Votre satisfaction et la sécurité de votre véhicule sont notre priorité.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-fixturbo-bg-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Images */}
          <ScrollReveal direction="left" className="relative">
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src="/assets/about-main.jpg"
                  alt="Mécanicien au travail"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[350px] object-cover rounded-lg"
                />
                {/* Trusted Customer Card */}
                <div className="absolute left-4 lg:-left-4 top-8 bg-fixturbo-primary text-white p-6 rounded-lg shadow-lg">
                  <Users className="w-8 h-8 mb-2" />
                  <div className="text-4xl font-bold">1000+</div>
                  <div className="text-sm text-white/80">Clients Satisfaits</div>
                </div>
              </div>

              {/* Secondary Image */}
              <div className="relative mt-6 rounded-lg overflow-hidden max-w-[80%]">
                <img
                  src="/assets/about-secondary.jpg"
                  alt="Voiture sur pont élévateur"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-[220px] object-cover rounded-lg"
                />
                {/* Experience Badge */}
                <div className="absolute -right-4 bottom-4 bg-white shadow-lg p-4 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-fixturbo-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-fixturbo-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-fixturbo-dark">10+</div>
                    <div className="text-xs text-fixturbo-text-secondary">Années d'Expérience</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right Column - Content */}
          <div>
            <ScrollReveal direction="right">
              <SectionLabel text="À PROPOS DE NOUS" centered={false} />
              <h2 className="text-3xl md:text-4xl font-bold text-fixturbo-dark tracking-tight mb-6">
                Auto Service El Bakkali - Votre Garage de Confiance à Meknès
              </h2>
              <p className="text-fixturbo-text-secondary leading-relaxed mb-8">
                Situé au cœur d'El Menzah à Meknès, Auto Service El Bakkali est votre partenaire automobile de confiance. Spécialisés dans le diagnostic, la réparation mécanique, l'électricité auto, la vidange, la climatisation et le nettoyage FAP sans démontage, nous mettons notre expertise au service de votre véhicule avec des tarifs transparents et un travail de qualité.
              </p>
            </ScrollReveal>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.title} direction="right" delay={0.15 * (i + 1)}>
                  <div className="flex items-start gap-5 bg-white p-6 rounded-lg border border-fixturbo-border-light hover:shadow-card transition-shadow duration-300">
                    <div className="w-14 h-14 rounded-lg bg-fixturbo-primary/10 flex items-center justify-center shrink-0">
                      <feature.icon className="w-6 h-6 text-fixturbo-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-fixturbo-dark mb-2">{feature.title}</h4>
                      <p className="text-fixturbo-text-secondary text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
