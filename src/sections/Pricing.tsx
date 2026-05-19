import { CarFront, Wrench, SprayCan, ChevronRight } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const plans = [
  {
    name: 'Silver Plan',
    icon: CarFront,
    price: '49€',
    period: '/month',
    featured: false,
    features: [
      'Oil & filter change',
      'Tire pressure check',
      'Brake inspection',
      'Basic diagnostic',
    ],
  },
  {
    name: 'Gold Plan',
    icon: Wrench,
    price: '89€',
    period: '/month',
    featured: true,
    features: [
      'Everything in Silver',
      'Full engine diagnostic',
      'Air filter replacement',
      'Transmission fluid check',
      'Priority booking',
    ],
  },
  {
    name: 'Platinum Plan',
    icon: SprayCan,
    price: '149€',
    period: '/month',
    featured: false,
    features: [
      'Everything in Gold',
      'Complete overhaul',
      'Body & paint touch-up',
      'AC service & recharge',
      '24/7 roadside assistance',
      'Free courtesy car',
    ],
  },
];

export default function Pricing() {
  return (
    <section className="py-24 bg-fixturbo-bg-cream">
      <Container>
        {/* Header */}
        <ScrollReveal className="text-center mb-14">
          <SectionLabel text="OUR PACKAGES" />
          <h2 className="text-4xl md:text-5xl font-bold text-fixturbo-dark tracking-tight">
            Transparent Pricing For<br />Every Service
          </h2>
        </ScrollReveal>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <ScrollReveal key={plan.name} delay={i * 0.15}>
              <div
                className={`bg-white rounded-lg overflow-hidden transition-all duration-400 hover:shadow-card-hover hover:-translate-y-1.5 ${
                  plan.featured ? 'ring-2 ring-fixturbo-primary shadow-card' : 'border border-fixturbo-border-light'
                }`}
              >
                {/* Header Bar */}
                <div className="bg-fixturbo-primary px-6 py-4 flex items-center justify-between">
                  <plan.icon className="w-8 h-8 text-white" />
                  <span className="text-white font-semibold">{plan.name}</span>
                </div>

                {/* Price */}
                <div className="px-8 py-6 border-b border-fixturbo-border-light">
                  <div className="text-2xl font-bold text-fixturbo-dark">{plan.price}<span className="text-base font-normal text-fixturbo-text-secondary">{plan.period}</span></div>
                </div>

                {/* Features */}
                <ul className="px-8 py-6 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm text-fixturbo-text-secondary">
                      <ChevronRight className="w-4 h-4 text-fixturbo-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="px-8 pb-6">
                  <button className="w-full py-4 border-2 border-fixturbo-border-light text-fixturbo-dark text-sm font-semibold tracking-wider uppercase rounded hover:bg-fixturbo-primary hover:border-fixturbo-primary hover:text-white transition-all duration-300">
                    BOOK NOW
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
