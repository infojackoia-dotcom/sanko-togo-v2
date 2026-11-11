import React, { useState, useEffect, useCallback } from 'react';
import { FAIcon } from './FAIcon';

export interface GalleryPhotoItem {
  id: string;
  url: string;
  alt: string;
}

// Ligne 1 : Véhicules et Chauffeurs (Format Carré)
export const ROW_1_PHOTOS: GalleryPhotoItem[] = [
  { id: 'landcruiser-prado-250', url: '/gallery/landcruiser-prado-250-togo.jpg', alt: 'Nouveau Toyota Prado 250 Togo' },
  { id: 'corolla-cross-gold-front', url: '/gallery/corolla-cross-gold-front.jpg', alt: 'Toyota Corolla Cross Gold Face Avant' },
  { id: 'hilux-concession', url: '/gallery/hilux-concession-togo.jpg', alt: 'Toyota Hilux Double Cabine Togo' },
  { id: 'chauffeur-landcruiser-pro', url: '/gallery/chauffeur-landcruiser-pro.jpg', alt: 'Chauffeur Professionnel Sanko Togo' },
  { id: 'corolla-cross-white-front', url: '/gallery/corolla-cross-white-front.jpg', alt: 'Toyota Corolla Cross Blanc Vue Avant' },
  { id: 'corolla-champagne', url: '/gallery/corolla-champagne-side.jpg', alt: 'Toyota Corolla Berline' },
];

// Ligne 2 : Vues Arrière, Profils et Habitacles (Format Carré)
export const ROW_2_PHOTOS: GalleryPhotoItem[] = [
  { id: 'corolla-cross-white-side', url: '/gallery/corolla-cross-white-side.jpg', alt: 'Toyota Corolla Cross Profil Blanc' },
  { id: 'corolla-cross-white-rear', url: '/gallery/corolla-cross-white-rear.jpg', alt: 'Toyota Corolla Cross Vue Arrière' },
  { id: 'chauffeur-mission-togo', url: '/gallery/chauffeur-mission-togo.jpg', alt: 'Chauffeur Expérimenté SANKO TOGO' },
  { id: 'landcruiser-250-front-angle', url: '/gallery/landcruiser-250-front-angle.jpg', alt: 'Toyota Prado 250 Gros Plan' },
  { id: 'chauffeur-polo-sanko', url: '/gallery/chauffeur-polo-sanko.jpg', alt: 'Chauffeur Professionnel Sanko Togo' },
  { id: 'minibus-hiace', url: '/gallery/toyota-hiace-minibus.jpg', alt: 'Toyota HiAce Minibus 15 Places SANKO TOGO' },
  { id: 'starlet-side', url: '/gallery/starlet-black-side.jpg', alt: 'Toyota Starlet Berline Compacte' },
  { id: 'toyota-cockpit', url: '/gallery/toyota-cockpit-interior.jpg', alt: 'Poste de conduite & Volant Toyota' },
];

const ALL_PHOTOS: GalleryPhotoItem[] = [...ROW_1_PHOTOS, ...ROW_2_PHOTOS];

export const OffersGallerySlideshow: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  // Duplique les 6 photos pour créer la boucle infinie sans saut
  const row1Repeated = [...ROW_1_PHOTOS, ...ROW_1_PHOTOS];
  const row2Repeated = [...ROW_2_PHOTOS, ...ROW_2_PHOTOS];

  const handleOpenPhoto = (photo: GalleryPhotoItem) => {
    const idx = ALL_PHOTOS.findIndex((p) => p.id === photo.id);
    setSelectedPhotoIndex(idx >= 0 ? idx : 0);
  };

  const handleCloseModal = useCallback(() => {
    setSelectedPhotoIndex(null);
  }, []);

  const handlePrevPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! > 0 ? prev! - 1 : ALL_PHOTOS.length - 1));
  }, [selectedPhotoIndex]);

  const handleNextPhoto = useCallback(() => {
    if (selectedPhotoIndex === null) return;
    setSelectedPhotoIndex((prev) => (prev! < ALL_PHOTOS.length - 1 ? prev! + 1 : 0));
  }, [selectedPhotoIndex]);

  // Raccourcis clavier (Flèches gauche/droite, Échap)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedPhotoIndex === null) return;
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhotoIndex, handleCloseModal, handlePrevPhoto, handleNextPhoto]);

  return (
    <section className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden border-y border-slate-800">
      {/* Halo lumineux d'ambiance */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#1A3A6A]/20 blur-[130px] rounded-full pointer-events-none" />

      {/* Dégradés latéraux pleine hauteur pour couvrir parfaitement toutes les images jusqu'au fond */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-r from-slate-900 via-slate-900/90 to-transparent z-20 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 md:w-64 bg-gradient-to-l from-slate-900 via-slate-900/90 to-transparent z-20 pointer-events-none" />

      {/* En-tête centré */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center relative z-30 mb-8 sm:mb-10">
        <span className="inline-block text-xs uppercase tracking-wider font-bold text-amber-300 bg-amber-400/10 border border-amber-400/20 px-4 py-1.5 rounded-full mb-3 shadow-xs">
          Galerie Photo
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-3 drop-shadow-sm">
          Notre flotte en image
        </h2>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Découvrez en images réelles nos véhicules neufs, et nos chauffeurs professionnels déployés au Togo.
        </p>

        {/* Bouton pause/lecture du diaporama */}
        <div className="mt-5 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => setIsPaused(!isPaused)}
            className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border ${
              isPaused
                ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-sm'
                : 'bg-white/10 hover:bg-white/20 text-white border-white/15'
            }`}
          >
            <FAIcon
              name={isPaused ? 'fa-solid fa-play' : 'fa-solid fa-pause'}
              size={11}
              color={isPaused ? '#0f172a' : '#ffffff'}
            />
            <span>{isPaused ? 'Relancer le défilement' : 'Mettre en pause'}</span>
          </button>
        </div>
      </div>

      {/* Conteneur des deux lignes de diaporama dans le même sens et ralenties */}
      <div className="relative w-full flex flex-col gap-4 sm:gap-6 overflow-hidden select-none py-2">

        {/* LIGNE 1 : 6 photos carrées - Défilement ralenti */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div
            className="animate-marquee-slow flex items-center gap-4 sm:gap-6 py-1"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {row1Repeated.map((photo, idx) => (
              <div
                key={`row1-${photo.id}-${idx}`}
                onClick={() => handleOpenPhoto(photo)}
                className="group relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-md cursor-pointer shrink-0 transition-all duration-300 hover:scale-[1.03] hover:border-amber-400/60 hover:shadow-xl"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay subtil au survol sans texte écrit */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                    <FAIcon name="fa-solid fa-magnifying-glass-plus" size={14} color="#ffffff" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIGNE 2 : 6 photos carrées - Même sens et même vitesse ralentie */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div
            className="animate-marquee-slow flex items-center gap-4 sm:gap-6 py-1"
            style={{ animationPlayState: isPaused ? 'paused' : undefined }}
          >
            {row2Repeated.map((photo, idx) => (
              <div
                key={`row2-${photo.id}-${idx}`}
                onClick={() => handleOpenPhoto(photo)}
                className="group relative w-48 h-48 sm:w-60 sm:h-60 md:w-68 md:h-68 aspect-square rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/80 shadow-md cursor-pointer shrink-0 transition-all duration-300 hover:scale-[1.03] hover:border-amber-400/60 hover:shadow-xl"
              >
                <img
                  src={photo.url}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Overlay subtil au survol sans texte écrit */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
                    <FAIcon name="fa-solid fa-magnifying-glass-plus" size={14} color="#ffffff" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MODALE DIAPORAMA / LIGHTBOX PLEIN ÉCRAN */}
      {selectedPhotoIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Barre du haut */}
          <div className="flex items-center justify-between max-w-5xl mx-auto w-full z-10">
            <span className="text-xs sm:text-sm text-slate-400 font-medium">
              Photo {selectedPhotoIndex + 1} sur {ALL_PHOTOS.length}
            </span>

            <button
              type="button"
              onClick={handleCloseModal}
              className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer transition-colors"
              title="Fermer (Échap)"
            >
              <FAIcon name="fa-solid fa-xmark" size={16} color="#ffffff" />
            </button>
          </div>

          {/* Zone Centrale : Photo Agrandie */}
          <div className="relative max-w-4xl mx-auto w-full my-auto flex items-center justify-center py-4">
            {/* Bouton Précédent */}
            <button
              type="button"
              onClick={handlePrevPhoto}
              className="absolute left-1 sm:-left-12 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#1A3A6A] text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors"
              title="Précédent"
            >
              <FAIcon name="fa-solid fa-chevron-left" size={16} color="#ffffff" />
            </button>

            {/* Image Active */}
            <div className="relative max-h-[72vh] w-full flex items-center justify-center rounded-2xl overflow-hidden bg-black shadow-2xl">
              <img
                src={ALL_PHOTOS[selectedPhotoIndex].url}
                alt={ALL_PHOTOS[selectedPhotoIndex].alt}
                className="max-h-[72vh] w-auto max-w-full object-contain select-none rounded-xl"
              />
            </div>

            {/* Bouton Suivant */}
            <button
              type="button"
              onClick={handleNextPhoto}
              className="absolute right-1 sm:-right-12 z-20 w-11 h-11 rounded-full bg-black/60 hover:bg-[#1A3A6A] text-white border border-white/20 flex items-center justify-center cursor-pointer transition-colors"
              title="Suivant"
            >
              <FAIcon name="fa-solid fa-chevron-right" size={16} color="#ffffff" />
            </button>
          </div>

          {/* Indicateurs de progression en bas */}
          <div className="max-w-md mx-auto w-full text-center z-10 pb-2">
            <div className="flex items-center justify-center gap-1.5 py-1">
              {ALL_PHOTOS.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setSelectedPhotoIndex(dotIdx)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    dotIdx === selectedPhotoIndex ? 'w-6 bg-amber-400' : 'w-1.5 bg-white/30 hover:bg-white/60'
                  }`}
                  aria-label={`Aller à la photo ${dotIdx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
