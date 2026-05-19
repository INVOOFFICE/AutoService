import { Facebook, Instagram, MapPin, Phone, Mail } from 'lucide-react';
import Container from './Container';

const companyLinks = ['À Propos', 'Équipe', 'Services', 'Contact'];
const serviceLinks = [
  'Diagnostic Auto',
  'Électricité Auto',
  'Réparation',
  'Vidange',
  'Climatisation',
  'Nettoyage FAP',
];

export default function Footer() {
  return (
    <footer className="bg-fixturbo-dark relative overflow-hidden">
      {/* Gear pattern overlay */}
      <div className="absolute inset-0 gear-pattern opacity-30" />

      <Container className="relative z-10">
        {/* Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-12">
          {/* About */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-5">Auto Service El Bakkali</h5>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Votre garage automobile de confiance à Meknès. Spécialisés dans le diagnostic, la réparation, la vidange, la climatisation et le nettoyage FAP sans démontage.
            </p>
            <div className="flex items-center gap-2">
              {[Instagram, Facebook].map((Icon, i) => (
                <a
                  key={i}
                  aria-disabled="true"
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-fixturbo-primary hover:border-fixturbo-primary hover:text-white transition-all duration-300 cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fixturbo-primary focus-visible:ring-offset-2"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-5">Liens Rapides</h5>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link}>
                  <a aria-disabled="true" className="text-white/60 text-sm hover:text-fixturbo-primary transition-colors cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fixturbo-primary focus-visible:ring-offset-2">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-5">Nos Services</h5>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link}>
                  <a aria-disabled="true" className="text-white/60 text-sm hover:text-fixturbo-primary transition-colors cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fixturbo-primary focus-visible:ring-offset-2">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5 className="text-lg font-semibold text-white mb-5">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-fixturbo-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/40 text-xs block mb-0.5">Adresse</span>
                  <span className="text-white text-sm">El Menzah, Meknès, Maroc</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-fixturbo-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/40 text-xs block mb-0.5">Téléphone</span>
                  <a href="tel:0609052144" className="text-white text-sm hover:text-fixturbo-primary transition-colors block">
                    06 09 05 21 44
                  </a>
                  <a href="tel:0602754617" className="text-white text-sm hover:text-fixturbo-primary transition-colors block">
                    06 02 75 46 17
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-fixturbo-primary shrink-0 mt-0.5" />
                <div>
                  <span className="text-white/40 text-xs block mb-0.5">Email</span>
                  <a href="mailto:contact@autoservice-elbakkali.ma" className="text-white text-sm hover:text-fixturbo-primary transition-colors">
                    contact@autoservice-elbakkali.ma
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 text-center text-sm text-white/50">
          <p>© Auto Service El Bakkali {new Date().getFullYear()} | Tous Droits Réservés</p>
        </div>
      </Container>
    </footer>
  );
}
