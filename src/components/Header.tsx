import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { FAIcon } from './FAIcon';
import { SankoLogo } from './SankoLogo';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [allPagesDrawerOpen, setAllPagesDrawerOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (allPagesDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [allPagesDrawerOpen]);

  // Close drawer on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && allPagesDrawerOpen) {
        setAllPagesDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [allPagesDrawerOpen]);

  const navPages: { id: PageId; label: string; title: string }[] = [
    { id: 'accueil', label: 'ACCUEIL', title: 'Accueil' },
    { id: 'a-propos', label: 'À PROPOS', title: 'À propos' },
    { id: 'services', label: 'NOS OFFRES', title: 'Nos offres' },
    { id: 'blog', label: 'BLOGS', title: 'Blogs' },
    { id: 'contact', label: 'CONTACTS', title: 'Contacts' },
  ];

  const handleNavClick = (page: PageId, anchor?: string) => {
    onNavigate(page, anchor);
    setAllPagesDrawerOpen(false);
    if (!anchor) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        id="main-header"
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 border-b border-slate-100'
            : 'bg-white py-4 border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-[52px]">
            {/* Logo & Brand Identity in strict Navy Blue & White without subtext */}
            <button
              type="button"
              id="brand-logo-btn"
              onClick={() => handleNavClick('accueil')}
              className="inline-flex items-center gap-3 text-left group cursor-pointer focus:outline-none shrink-0 mr-6 sm:mr-10 lg:mr-16 self-center"
            >
              <div className="flex items-center justify-center shrink-0">
                <SankoLogo size={36} className="transition-transform duration-200 group-hover:scale-105" />
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-black tracking-tight text-[#1A3A6A] leading-none whitespace-nowrap inline-flex items-center">
                SANKO TOGO
              </span>
            </button>

            {/* Desktop & Tablet: 5 Main Page Buttons + All-Pages Hamburger Button */}
            <div className="hidden md:flex items-center gap-2 lg:gap-3 ml-auto justify-end self-center">
              <nav
                id="desktop-navigation"
                aria-label="Navigation principale"
                className="inline-flex items-center gap-1.5 lg:gap-2.5 self-center"
              >
                {navPages.map((item) => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      type="button"
                      id={`nav-btn-${item.id}`}
                      key={item.id}
                      onClick={() => handleNavClick(item.id)}
                      className={`px-3.5 lg:px-5 py-2 rounded-full text-xs lg:text-sm font-bold tracking-wider transition-all duration-200 cursor-pointer inline-flex items-center justify-center leading-normal ${
                        isActive
                          ? 'bg-[#1A3A6A] text-white shadow-xs font-black'
                          : 'text-[#1A3A6A] hover:bg-[#1A3A6A]/10 hover:text-[#1A3A6A]'
                      }`}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              {/* All-Pages Hamburger Menu Button (Desktop) */}
              <button
                type="button"
                id="desktop-all-pages-btn"
                onClick={() => setAllPagesDrawerOpen(true)}
                className="ml-1 p-2.5 rounded-full border border-[#1A3A6A]/20 hover:border-[#1A3A6A] hover:bg-[#1A3A6A]/10 text-[#1A3A6A] transition-all cursor-pointer focus:outline-none inline-flex items-center justify-center group shrink-0 self-center"
                title="Toutes les pages du site"
                aria-label="Ouvrir le menu de toutes les pages du site"
              >
                <div className="flex flex-col justify-center items-center gap-[4.5px] w-5 h-5">
                  <span className="block w-5 h-[2.5px] bg-[#1A3A6A] rounded-full transition-transform group-hover:scale-x-110" />
                  <span className="block w-5 h-[2.5px] bg-[#1A3A6A] rounded-full transition-transform" />
                  <span className="block w-5 h-[2.5px] bg-[#1A3A6A] rounded-full transition-transform group-hover:scale-x-110" />
                </div>
              </button>
            </div>

            {/* Mobile: Hamburger Button for All Pages */}
            <div className="flex items-center md:hidden self-center">
              <button
                type="button"
                id="mobile-all-pages-btn"
                onClick={() => setAllPagesDrawerOpen(true)}
                className="p-2.5 rounded-xl border border-[#1A3A6A]/20 text-[#1A3A6A] hover:bg-[#1A3A6A]/10 focus:outline-none cursor-pointer transition-colors inline-flex items-center justify-center shrink-0"
                aria-label="Ouvrir le menu de toutes les pages du site"
              >
                <div className="flex flex-col justify-center items-center gap-[4px] w-5 h-5">
                  <span className="block w-5 h-[2px] bg-[#1A3A6A] rounded-full" />
                  <span className="block w-5 h-[2px] bg-[#1A3A6A] rounded-full" />
                  <span className="block w-5 h-[2px] bg-[#1A3A6A] rounded-full" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Panel: "Toutes les pages du site" */}
      {allPagesDrawerOpen && (
        <div
          id="all-pages-drawer-overlay"
          className="fixed inset-0 z-50 overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setAllPagesDrawerOpen(false)}
          />

          {/* Drawer container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full overflow-hidden border-l border-slate-200 animate-in slide-in-from-right duration-300">
              {/* Drawer Header */}
              <div className="p-6 bg-[#1A3A6A] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1 shadow-sm shrink-0">
                    <SankoLogo size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-tight text-white leading-tight">
                      SANKO TOGO
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  id="close-all-pages-drawer-btn"
                  onClick={() => setAllPagesDrawerOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer focus:outline-none"
                  aria-label="Fermer le menu"
                >
                  <FAIcon name="fa-solid fa-xmark" size={18} color="#FFFFFF" />
                </button>
              </div>

              {/* Drawer Scrollable Content: ONLY page titles, without icons, without subtitles, and simulation button at the end */}
              <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-between">
                {/* Page Titles List */}
                <div className="space-y-2.5">
                  {navPages.map((item) => {
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        id={`drawer-page-${item.id}`}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left px-5 py-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-base font-bold ${
                          isActive
                            ? 'bg-[#1A3A6A] text-white border-[#1A3A6A] shadow-xs font-black'
                            : 'bg-slate-50 hover:bg-[#1A3A6A]/10 border-slate-200 text-[#1A3A6A]'
                        }`}
                      >
                        <span>{item.title}</span>
                        <span className={`text-sm ${isActive ? 'text-white/80' : 'text-[#1A3A6A]/60'}`}>
                          &rarr;
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Simulation Button at the End */}
                <div className="pt-6 mt-6 border-t border-slate-200">
                  <button
                    type="button"
                    id="drawer-simulator-btn"
                    onClick={() => handleNavClick('services', 'simulateur')}
                    className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-4 rounded-full text-sm font-bold text-white bg-[#1A3A6A] hover:bg-[#234c89] transition-all shadow-md cursor-pointer group"
                  >
                    <FAIcon name="fa-solid fa-calculator" size={15} color="#FFFFFF" />
                    <span>Simuler votre budget</span>
                  </button>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-slate-100 border-t border-slate-200 text-center shrink-0">
                <p className="text-[11px] font-semibold text-slate-500">
                  © SANKO TOGO — Votre mobilité, notre priorité.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
