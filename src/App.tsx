import { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { ScrollToTop } from './components/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsOfServicePage } from './pages/TermsOfServicePage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('accueil');
  const [targetAnchor, setTargetAnchor] = useState<string | undefined>(undefined);

  // Handle URL hash routing on initial load and popstate
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (
        [
          'accueil',
          'a-propos',
          'services',
          'blog',
          'contact',
          'politique-confidentialite',
          'conditions-generales',
        ].includes(hash)
      ) {
        setCurrentPage(hash as PageId);
        setTargetAnchor(undefined);
      } else if (hash === 'simulateur') {
        setCurrentPage('services');
        setTargetAnchor('simulateur');
      } else if (hash === 'notre-flotte' || hash.startsWith('flotte-')) {
        setCurrentPage('a-propos');
        setTargetAnchor(hash);
      }
    };

    handleHash();
    window.addEventListener('popstate', handleHash);
    return () => window.removeEventListener('popstate', handleHash);
  }, []);

  const handleNavigate = (page: PageId, anchor?: string) => {
    setCurrentPage(page);
    setTargetAnchor(anchor);

    // Update browser history hash
    if (anchor) {
      window.history.pushState(null, '', `#${anchor}`);
      setTimeout(() => {
        const el = document.getElementById(anchor);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 80);
    } else {
      window.history.pushState(null, '', `#${page}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-800 selection:bg-[#1A3A6A] selection:text-white font-sans antialiased">
      {/* Header Sticky */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
      />

      {/* Main Page Views */}
      <main className="flex-1 w-full">
        {currentPage === 'accueil' && <HomePage onNavigate={handleNavigate} />}
        {currentPage === 'a-propos' && (
          <AboutPage onNavigate={handleNavigate} targetAnchor={targetAnchor} />
        )}
        {currentPage === 'services' && (
          <ServicesPage onNavigate={handleNavigate} targetAnchor={targetAnchor} />
        )}
        {currentPage === 'blog' && <BlogPage onNavigate={handleNavigate} />}
        {currentPage === 'contact' && <ContactPage onNavigate={handleNavigate} />}
        {currentPage === 'politique-confidentialite' && (
          <PrivacyPolicyPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'conditions-generales' && (
          <TermsOfServicePage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Scroll to Top Arrow Button */}
      <ScrollToTop currentPage={currentPage} />

      {/* Floating WhatsApp Button */}
      <WhatsAppFloat />
    </div>
  );
}
