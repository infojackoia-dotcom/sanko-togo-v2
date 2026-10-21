import React, { useState } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS, WHATSAPP_CONFIG } from '../data/content';
import { FAIcon } from '../components/FAIcon';
import { BrochureLeadModule } from '../components/BrochureLeadModule';

interface BlogPageProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Toutes');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const categories = [
    'Toutes',
    'Location longue durée',
    'Gestion de flotte',
    'Mobilité pour ONG & organisations internationales',
    'Conseils & réglementation (Togo)',
    'Actualités Sanko Togo',
  ];

  const filteredPosts =
    selectedCategory === 'Toutes'
      ? BLOG_POSTS
      : BLOG_POSTS.filter((post) => post.category === selectedCategory);

  const whatsappArticleUrl = `https://wa.me/${WHATSAPP_CONFIG.phone}?text=${encodeURIComponent(
    'Bonjour Sanko Togo, j\'ai lu un article sur votre blog et je souhaite échanger à propos d\'un besoin similaire pour mon organisation.'
  )}`;

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => {
        setNewsletterSubmitted(false);
        setNewsletterEmail('');
      }, 4000);
    }
  };

  return (
    <div className="w-full">
      {/* 4.1 — HERO CENTRÉ AVEC IMAGE EN FOND */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 text-white overflow-hidden border-b border-[#122849]">
        {/* Image de fond avec overlay bleu marine translucide */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/blog-hero.jpg"
            alt="Veille stratégique et expertise logistique SANKO TOGO"
            className="w-full h-full object-cover object-center hero-bg-img"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#0F2444]/45 bg-gradient-to-t from-[#0F2444]/80 via-[#1A3A6A]/45 to-[#0F2444]/60 backdrop-blur-[0.5px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          <span className="inline-block text-xs uppercase tracking-wider font-bold text-white bg-[#0F2444]/80 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm border border-white/20 mb-4">
            Veille & Expertise
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            Actualités & conseils mobilité professionnelle
          </h1>
          <p className="text-base sm:text-lg text-white/95 font-medium leading-relaxed max-w-2xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
            Des ressources pensées pour les responsables logistique, achats et administration en charge de la mobilité de leur organisation.
          </p>
        </div>
      </section>

      {/* 4.2 — CATÉGORIES (FILTRES CENTRÉS) */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center flex-wrap gap-2 pb-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1A3A6A] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4.5 — STRUCTURE DE LA GRILLE ARTICLES */}
      <section className="py-16 sm:py-20 bg-slate-50/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                onClick={() => setActiveArticle(post)}
                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden card-hover cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      loading="lazy"
                    />
                    <span className="absolute top-3 left-3 bg-[#1A3A6A] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 text-center flex flex-col items-center">
                    <div className="flex items-center justify-center gap-3 text-xs text-slate-400 mb-3 font-medium">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 leading-snug hover:text-[#1A3A6A] transition-colors text-center">
                      {post.title}
                    </h2>
                  </div>
                </div>

                <div className="px-6 py-4 flex items-center justify-center border-t border-slate-100 text-center">
                  <span className="text-xs font-bold text-[#1A3A6A] inline-flex items-center gap-2 hover:underline">
                    Lire l'article complet
                    <span className="w-7 h-7 rounded-full bg-[#1A3A6A]/10 text-[#1A3A6A] flex items-center justify-center">
                      <FAIcon name="fa-solid fa-arrow-right" size={10} color="#1A3A6A" />
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4.2.1 — TÉLÉCHARGEMENT DE NOTRE BROCHURE INSTITUTIONNELLE */}
      <BrochureLeadModule variant="compact" />

      {/* 4.3 — NEWSLETTER */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-subtle-gradient p-8 sm:p-12 rounded-3xl border border-slate-200/80">
            <span className="text-xs uppercase tracking-wider font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full">
              Lettre d'information
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-3 mb-2">
              Restez informé
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-lg mx-auto">
              Recevez nos derniers articles et actualités directement par email.
            </p>

            {newsletterSubmitted ? (
              <div className="bg-[#1A3A6A]/10 text-[#1A3A6A] p-4 rounded-xl text-sm font-semibold border border-[#1A3A6A]/20">
                Merci ! Votre inscription à notre veille mobilité a bien été prise en compte.
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  required
                  placeholder="votre.email@organisation.org"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-3 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#1A3A6A]"
                />
                <button
                  type="submit"
                  className="bg-[#1A3A6A] hover:bg-[#234c89] text-white px-6 py-3 rounded-xl font-bold text-sm shadow-xs transition-colors cursor-pointer"
                >
                  S'abonner
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ARTICLE READER MODAL (with 4.4 Verbatim CTA) */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-slate-100 sticky top-0 bg-white z-10">
              <span className="text-xs font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3 py-1 rounded-full">
                {activeArticle.category}
              </span>
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 flex items-center justify-center cursor-pointer"
              >
                <FAIcon name="fa-solid fa-xmark" size={16} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                  <span>Publié le {activeArticle.date}</span>
                  <span>•</span>
                  <span>{activeArticle.readTime}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug">
                  {activeArticle.title}
                </h1>
              </div>

              <div className="h-64 sm:h-72 w-full rounded-xl overflow-hidden">
                <img
                  src={activeArticle.image}
                  alt={activeArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* 4.4 — CTA DE FIN D'ARTICLE (TYPE) */}
              <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl mt-8">
                <p className="text-sm font-semibold text-slate-800 mb-4">
                  Un besoin similaire pour votre organisation ?
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={whatsappArticleUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold shadow-xs transition-colors"
                  >
                    <FAIcon name="fa-brands fa-whatsapp" size={16} color="#FFFFFF" />
                    <span>Discutons-en sur WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveArticle(null);
                      onNavigate('services', 'simulateur');
                    }}
                    className="inline-flex items-center gap-2 border border-[#1A3A6A] text-[#1A3A6A] hover:bg-[#1A3A6A]/5 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors cursor-pointer"
                  >
                    <FAIcon name="fa-solid fa-calculator" size={14} color="#1A3A6A" />
                    <span>Simulez votre budget</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
