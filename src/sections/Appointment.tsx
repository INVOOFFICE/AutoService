import { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SectionLabel from '../components/SectionLabel';
import ScrollReveal from '../components/ScrollReveal';

const WHATSAPP_NUMBER = '212609052144';

export default function Appointment() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.name.trim() || !form.phone.trim() || !form.message.trim()) {
      setError('Veuillez remplir tous les champs.');
      return;
    }

    const text = `Bonjour Auto Service El Bakkali,%0A%0AJe souhaite prendre rendez-vous.%0A%0A*Nom* : ${form.name.trim()}%0A*Téléphone* : ${form.phone.trim()}%0A%0A*Service demandé* :%0A${form.message.trim()}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    const newWindow = window.open(url, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      window.location.href = url;
    }
  };

  return (
    <section id="appointment" className="relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Image with Red Background */}
        <ScrollReveal direction="left" delay={0.3} className="relative min-h-[400px] lg:min-h-0">
          <div className="absolute inset-0 bg-fixturbo-primary">
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.15) 30px, rgba(255,255,255,0.15) 60px)',
              }}
            />
          </div>

          <div className="absolute inset-0 flex items-end justify-center lg:justify-start lg:pl-8">
            <img
              src="assets/appointment-mechanic.png"
              alt="Mécanicien professionnel"
              loading="lazy"
              decoding="async"
              className="h-[90%] object-contain object-bottom"
            />
          </div>

          <svg
            className="absolute top-10 right-10 w-32 h-32 text-white/10"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <path d="M50 25c-13.8 0-25 11.2-25 25s11.2 25 25 25 25-11.2 25-25-11.2-25-25-25zm0 40c-8.3 0-15-6.7-15-15s6.7-15 15-15 15 6.7 15 15-6.7 15-15 15z" />
            <path d="M45 0h10v15h-10zM45 85h10v15h-10zM0 45h15v10h-15zM85 45h15v10h-15zM12.9 12.9l10.6 10.6-7.1 7.1-10.6-10.6zM73.6 73.6l10.6 10.6-7.1 7.1-10.6-10.6zM12.9 87.1l7.1-7.1 10.6 10.6-7.1 7.1zM73.6 26.4l7.1-7.1 10.6 10.6-7.1 7.1z" />
          </svg>
        </ScrollReveal>

        {/* Right - Form */}
        <ScrollReveal direction="right" className="bg-white py-16 lg:py-24 px-6 lg:px-16 xl:px-24">
          <SectionLabel text="PRENDRE RENDEZ-VOUS" centered={false} />
          <h2 className="text-3xl md:text-4xl font-bold text-fixturbo-dark tracking-tight mb-8">
            Contactez Auto Service El Bakkali
          </h2>

          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-red-800 text-sm font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="appointment-name" className="text-sm font-medium text-fixturbo-dark">
                  Votre Nom
                </label>
                <input
                  id="appointment-name"
                  type="text"
                  name="name"
                  placeholder="Votre nom complet"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 border border-gray-200 rounded text-fixturbo-dark placeholder:text-gray-400 focus:outline-none focus:border-fixturbo-primary focus:ring-2 focus:ring-fixturbo-primary/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="appointment-phone" className="text-sm font-medium text-fixturbo-dark">
                  Téléphone
                </label>
                <input
                  id="appointment-phone"
                  type="tel"
                  name="phone"
                  placeholder="06 XX XX XX XX"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3.5 border border-gray-200 rounded text-fixturbo-dark placeholder:text-gray-400 focus:outline-none focus:border-fixturbo-primary focus:ring-2 focus:ring-fixturbo-primary/10 transition-all"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="appointment-message" className="text-sm font-medium text-fixturbo-dark">
                Message / Service demandé
              </label>
              <textarea
                id="appointment-message"
                name="message"
                placeholder="Décrivez votre besoin (ex: nettoyage FAP, diagnostic, vidange...)"
                value={form.message}
                onChange={handleChange}
                rows={4}
                required
                className="w-full px-4 py-3.5 border border-gray-200 rounded text-fixturbo-dark placeholder:text-gray-400 focus:outline-none focus:border-fixturbo-primary focus:ring-2 focus:ring-fixturbo-primary/10 transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full py-4 bg-green-500 text-white text-sm font-semibold tracking-[0.08em] uppercase rounded hover:bg-green-600 hover:-translate-y-0.5 hover:shadow-button transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Envoyer sur WhatsApp
            </button>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
