import React from 'react';
import { FAIcon } from './FAIcon';
import { PageId } from '../types';

interface ProjectsSectionProps {
  onNavigate: (page: PageId, anchor?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onNavigate }) => {
  const projects = [
    {
      id: 'savanes-4x4',
      title: 'Missions Humanitaires & Santé : Région des Savanes & Kara',
      category: 'Flotte 4x4',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
      description: 'Mise à disposition de 8 véhicules 4x4 équipés pour pistes difficiles, avec chauffeurs formés aux zones reculées et assistance technique permanente.',
      tag: 'Humanitaire',
    },
    {
      id: 'diplomatie-lome',
      title: 'Parc Représentations Diplomatiques & Consulaires',
      category: 'Location Longue Durée (LLD)',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
      description: 'Mise en place et gestion d’une flotte de berlines exécutives et SUV avec chauffeurs bilingues formés au protocole diplomatique.',
      tag: 'Diplomatique',
    },
    {
      id: 'gestion-flotte-ong',
      title: 'Gestion de Parc & Maintenance Préventive Clé en Main',
      category: 'Gestion de Flotte',
      image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80',
      description: 'Prise en charge intégrale de 18 véhicules pour une grande organisation : entretiens programmés, assurances, télématique et véhicule relais garanti.',
      tag: 'Institutionnel',
    },
    {
      id: 'seminaires-vip',
      title: 'Convois Officiels & Minibus pour Sommets Régionaux',
      category: 'Transport de Délégations',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
      description: 'Coordination logistique de transferts aéroportuaires et navettes sécurisées lors d’ateliers et conférences de haut niveau à Lomé.',
      tag: 'Événementiel',
    },
  ];

  return (
    <section id="projets" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section in strict Navy Blue & White */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-3.5 py-1 rounded-full">
              Déploiements Réalisés
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
              Nos Véhicules Sur Le Terrain Au Togo
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-xl">
              Découvrez comment nous sécurisons la mobilité des organisations internationales et entreprises partenaires.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              type="button"
              onClick={() => onNavigate('services', 'simulateur')}
              className="inline-flex items-center gap-3 bg-[#1A3A6A] hover:bg-[#234c89] text-white px-6 py-3 rounded-full font-bold text-sm shadow-sm transition-all cursor-pointer group"
            >
              <span>Simuler Mon Projet</span>
              <span className="w-7 h-7 rounded-full bg-white text-[#1A3A6A] flex items-center justify-center group-hover:scale-105 transition-transform">
                <FAIcon name="fa-solid fa-arrow-right" size={11} color="#1A3A6A" />
              </span>
            </button>
          </div>
        </div>

        {/* 4 Cards Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => onNavigate('services', 'simulateur')}
              className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 hover:border-[#1A3A6A] card-hover flex flex-col justify-between group cursor-pointer"
            >
              <div>
                {/* Project Image Container */}
                <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-slate-200">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white text-[#1A3A6A] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {proj.tag}
                  </span>
                  <span className="absolute top-4 right-4 bg-[#1A3A6A] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {proj.category}
                  </span>
                </div>

                {/* Project Content */}
                <div className="p-7">
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1A3A6A] transition-colors leading-snug mb-3">
                    {proj.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {proj.description}
                  </p>
                </div>
              </div>

              {/* Card Footer with Round Action Arrow */}
              <div className="px-7 pb-7 pt-2 flex items-center justify-between border-t border-slate-200/50">
                <span className="text-xs font-bold text-[#1A3A6A] group-hover:underline">
                  Voir la solution adaptée
                </span>
                <span className="w-10 h-10 rounded-full bg-[#1A3A6A] text-white flex items-center justify-center shadow-xs transition-transform group-hover:rotate-[-25deg]">
                  <FAIcon name="fa-solid fa-arrow-right" size={13} color="#FFFFFF" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
