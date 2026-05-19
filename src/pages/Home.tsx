import React, { Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';
import Hero from '../sections/Hero';
import About from '../sections/About';
import StatsCounter from '../sections/StatsCounter';
import Projects from '../sections/Projects';
import WhatWeDo from '../sections/WhatWeDo';
import WorkProcess from '../sections/WorkProcess';
import FAP from '../sections/FAP';
import Appointment from '../sections/Appointment';

const Testimonials = React.lazy(() => import('../sections/Testimonials'));

const LazyFallback = () => <div className="h-40" />;

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <StatsCounter />
        <Projects />
        <WhatWeDo />
        <WorkProcess />
        <FAP />
        <Appointment />
        <Suspense fallback={<LazyFallback />}>
          <Testimonials />
        </Suspense>
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
