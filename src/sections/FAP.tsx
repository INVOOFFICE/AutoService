import { AlertTriangle, Gauge, Droplets, Wind, CheckCircle2 } from 'lucide-react';
import Container from '../components/Container';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const problems = [
  'Voyant moteur allumé',
  'Perte de puissance',
  'Surconsommation',
  'Fumée noire',
  'Mode dégradé',
  'Risque de panne moteur',
];

const solutions = [
  'Nettoyage professionnel sans démontage',
  'Méthode rapide et efficace',
  'Meilleure performance moteur',
  'Réduction de consommation',
  'Réduction des fumées',
];

export default function FAP() {
  return (
    <section id="fap" className="py-24 bg-fixturbo-bg-light">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            <ScrollReveal direction="left">
              <SectionLabel text="NETTOYAGE FAP" centered={false} />
              <h2 className="text-3xl md:text-4xl font-bold text-fixturbo-dark tracking-tight mb-6">
                Nettoyage FAP & Catalyseur Sans Démontage
              </h2>
              <p className="text-fixturbo-text-secondary leading-relaxed mb-8">
                Un FAP encrassé peut provoquer de sérieux problèmes sur votre véhicule. Chez Auto Service El Bakkali, nous utilisons une technologie de pointe pour nettoyer votre Filtre à Particules et votre catalyseur sans démontage, en respectant les normes environnementales et en préservant la performance de votre moteur.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.1}>
              <div className="bg-white rounded-lg border border-fixturbo-border-light p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-6 h-6 text-fixturbo-primary" />
                  <h3 className="text-lg font-bold text-fixturbo-dark">Un FAP encrassé peut provoquer :</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {problems.map((problem) => (
                    <li key={problem} className="flex items-center gap-2 text-sm text-fixturbo-text-secondary">
                      <span className="w-1.5 h-1.5 rounded-full bg-fixturbo-primary shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="left" delay={0.2}>
              <div className="bg-fixturbo-dark rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="w-6 h-6 text-fixturbo-primary" />
                  <h3 className="text-lg font-bold text-white">Notre Solution :</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {solutions.map((solution) => (
                    <li key={solution} className="flex items-center gap-2 text-sm text-white/80">
                      <CheckCircle2 className="w-4 h-4 text-fixturbo-primary shrink-0" />
                      {solution}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </div>

          {/* Right - Visual */}
          <ScrollReveal direction="right">
            <div className="relative">
              <div className="bg-white rounded-lg shadow-card p-8 border border-fixturbo-border-light">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-full bg-fixturbo-primary/10 flex items-center justify-center">
                    <Gauge className="w-7 h-7 text-fixturbo-primary" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-fixturbo-dark">Diagnostic FAP gratuit</h4>
                    <p className="text-sm text-fixturbo-text-secondary">Vérification de l'état de votre FAP</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-fixturbo-bg-light rounded-lg">
                    <Droplets className="w-5 h-5 text-fixturbo-primary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-fixturbo-dark text-sm">Nettoyage chimique professionnel</h5>
                      <p className="text-xs text-fixturbo-text-secondary mt-1">Produits spécifiques pour dissoudre les suies sans abîmer le filtre</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-fixturbo-bg-light rounded-lg">
                    <Wind className="w-5 h-5 text-fixturbo-primary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-fixturbo-dark text-sm">Soufflage haute pression</h5>
                      <p className="text-xs text-fixturbo-text-secondary mt-1">Élimination complète des résidus par pulseur pneumatique</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-fixturbo-bg-light rounded-lg">
                    <CheckCircle2 className="w-5 h-5 text-fixturbo-primary shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-fixturbo-dark text-sm">Test de régénération</h5>
                      <p className="text-xs text-fixturbo-text-secondary mt-1">Vérification post-nettoyage pour garantir le bon fonctionnement</p>
                    </div>
                  </div>
                </div>
                <a
                  href="#appointment"
                  className="mt-6 block w-full text-center px-6 py-3 bg-fixturbo-primary text-white text-sm font-semibold uppercase tracking-wider rounded hover:bg-fixturbo-primary-dark transition-all duration-300"
                >
                  Prendre Rendez-Vous
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
