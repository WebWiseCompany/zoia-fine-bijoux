import { useAuth } from "@/_core/hooks/useAuth";
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Categories from '@/components/Categories';
import Collection from '@/components/Collection';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

/**
 * Home Page - Zoia Fine Bijoux (Clicksophia Style)
 * Design: Premium jewelry store with modern layout
 * Colors: Rose coral and gold with cream background
 */

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Collection />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
