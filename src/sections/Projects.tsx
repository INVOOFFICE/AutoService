import { ArrowUpRight, Activity, Zap, Wrench, Droplets, Wind, Filter } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const BASE_URL = import.meta.env.BASE_URL;

const services = [
  {
    icon: Activity,
    image: `${BASE_URL}assets/project-1.jpg`,
    title: 'Diagnostic Auto',
    category: 'Diagnostic complet',
  },
  {
    icon: Zap,
    image: `${BASE_URL}assets/project-2.jpg`,
    title: 'Électricité Auto',
    category: 'Systèmes électriques',
  },
  {
    icon: Wrench,
    image: `${BASE_URL}assets/project-3.jpg`,
    title: 'Réparation Mécanique',
    category: 'Toutes marques',
  },
  {
    icon: Droplets,
    image: `${BASE_URL}assets/about-secondary.jpg`,
    title: 'Vidange',
    category: 'Entretien régulier',
  },
  {
    icon: Wind,
    image: `${BASE_URL}assets/hero-bg.jpg`,
    title: 'Climatisation',
    category: 'Recharge & réparation',
  },
  {
    icon: Filter,
    image: `${BASE_URL}assets/whatwedo-center.jpg`,
    title: 'Nettoyage FAP',
    category: 'Sans démontage',
  },
];

export default function Projects() {
  return (
    <section id="services" className="py-24 bg-white">
      <Container>
        {/* Header */}
        <ScrollReveal className="mb-14">
          <SectionLabel text="NOS SERVICES" centered={false} />
          <h2 className="text-4xl md:text-5xl font-bold text-fixturbo-dark tracking-tight">
            Des Solutions Complètes<br />Pour Votre Véhicule
          </h2>
        </ScrollReveal>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div tabIndex={0} className="group relative rounded-lg overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fixturbo-primary focus-visible:ring-offset-2">
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.08]"
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-fixturbo-primary/0 group-hover:bg-fixturbo-primary/85 transition-all duration-400 flex items-end">
                  <div className="p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                    <h4 className="text-xl font-bold text-white mb-1">{service.title}</h4>
                    <p className="text-white/70 text-sm mb-4">{service.category}</p>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <ArrowUpRight className="w-5 h-5 text-fixturbo-primary" />
                    </div>
                  </div>
                </div>

                {/* Title Badge (visible by default, hidden on hover) */}
                <div className="absolute bottom-4 left-4 right-4 group-hover:opacity-0 transition-opacity duration-300">
                  <div className="bg-white/95 backdrop-blur-sm rounded px-4 py-3 shadow-lg flex items-center gap-3">
                    <service.icon className="w-5 h-5 text-fixturbo-primary" />
                    <h4 className="text-base font-bold text-fixturbo-dark">{service.title}</h4>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
