import { Activity, Zap, Wrench, Droplets, Wind, Filter } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const leftServices = [
  { icon: Activity, title: 'Diagnostic Auto', description: 'Diagnostic électronique complet pour identifier rapidement les pannes moteur, électriques et électroniques de votre véhicule.' },
  { icon: Zap, title: 'Électricité Auto', description: 'Réparation et dépannage de tous les systèmes électriques : batterie, alternateur, démarreur, faisceaux et calculateurs.' },
  { icon: Wrench, title: 'Réparation Mécanique', description: 'Réparation moteur, embrayage, suspension, direction et tous types d\'interventions mécaniques sur toutes marques.' },
];

const rightServices = [
  { icon: Droplets, title: 'Vidange', description: 'Vidange moteur avec huiles de qualité, remplacement des filtres et contrôle des niveaux pour un entretien optimal.' },
  { icon: Wind, title: 'Climatisation', description: 'Recharge de gaz, détection de fuites, réparation du circuit et entretien complet de votre système de climatisation.' },
  { icon: Filter, title: 'Nettoyage FAP', description: 'Nettoyage professionnel du filtre à particules et du catalyseur sans démontage, méthode rapide et garantie.' },
];

function ServiceItem({ icon: Icon, title, description, align }: { icon: typeof Activity; title: string; description: string; align: 'left' | 'right' }) {
  return (
    <div className={`group flex items-start gap-4 ${align === 'right' ? 'flex-row text-left lg:flex-row-reverse lg:text-right' : ''}`}>
      <div className="w-14 h-14 rounded-lg bg-fixturbo-primary/10 flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-fixturbo-primary">
        <Icon className="w-6 h-6 text-fixturbo-primary transition-colors duration-300 group-hover:text-white" />
      </div>
      <div>
        <h4 className="text-lg font-bold text-fixturbo-dark mb-2">{title}</h4>
        <p className="text-fixturbo-text-secondary text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function WhatWeDo() {
  return (
    <section className="py-24 bg-white">
      <Container>
        {/* Header */}
        <ScrollReveal className="text-center mb-16">
          <SectionLabel text="NOS SERVICES" />
          <h2 className="text-4xl md:text-5xl font-bold text-fixturbo-dark tracking-tight">
            Une Gamme Complète<br />De Services Auto
          </h2>
        </ScrollReveal>

        {/* 3 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          {/* Left Services */}
          <div className="space-y-10">
            {leftServices.map((service, i) => (
              <ScrollReveal key={service.title} direction="left" delay={i * 0.15}>
                <ServiceItem {...service} align="right" />
              </ScrollReveal>
            ))}
          </div>

          {/* Center Image */}
          <ScrollReveal className="flex justify-center">
            <div className="relative">
              <div className="w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full overflow-hidden border-4 border-fixturbo-primary shadow-xl">
                <img
                  src={`${import.meta.env.BASE_URL}assets/whatwedo-center.jpg`}
                  alt="Mécanicien professionnel"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right Services */}
          <div className="space-y-10">
            {rightServices.map((service, i) => (
              <ScrollReveal key={service.title} direction="right" delay={i * 0.15}>
                <ServiceItem {...service} align="left" />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
