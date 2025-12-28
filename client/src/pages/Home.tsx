import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Collection from '@/components/Collection';
import About from '@/components/About';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

/**
 * Home Page - Zoia Fine Bijoux
 * Design: Minimalist luxury jewelry store
 * Layout: Full-page sections with elegant transitions
 * Colors: Cream background, rose coral accents, gold details
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Collection />
        <About />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
