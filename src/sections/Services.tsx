import { Wrench, Gauge, Car, ArrowRight } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const services = [
  {
    icon: Wrench,
    title: 'General Repairs',
    description: 'From engine diagnostics to suspension fixes, our expert mechanics handle all makes and models with precision and care.',
  },
  {
    icon: Gauge,
    title: 'Express Maintenance',
    description: 'Quick oil changes, filter replacements, and fluid top-ups to keep your car running smoothly without the long wait.',
  },
  {
    icon: Car,
    title: 'Body & Paint',
    description: 'Collision repair, dent removal, and professional paint matching to restore your vehicle to showroom condition.',
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <Container>
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <SectionLabel text="OUR SERVICES" />
          <h2 className="text-4xl md:text-5xl font-bold text-fixturbo-dark tracking-tight">
            Trusted Car Repair By<br />Professionals
          </h2>
        </ScrollReveal>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.15}>
              <div className="group bg-white border border-fixturbo-border-light rounded-lg p-10 transition-all duration-400 hover:border-fixturbo-primary hover:shadow-card-hover hover:-translate-y-1">
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-fixturbo-primary/10 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-fixturbo-primary">
                  <service.icon className="w-7 h-7 text-fixturbo-primary transition-colors duration-300 group-hover:text-white" />
                </div>

                {/* Title */}
                <h4 className="text-xl font-bold text-fixturbo-dark mb-4">{service.title}</h4>

                {/* Description */}
                <p className="text-fixturbo-text-secondary text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Link */}
                <button
                  type="button"
                  className="inline-flex items-center gap-2 text-fixturbo-primary text-sm font-semibold uppercase tracking-wide group/link"
                >
                  Read More
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                </button>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
