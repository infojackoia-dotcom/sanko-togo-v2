import React, { useState } from 'react';
import { FAIcon } from './FAIcon';
import { FAQ_ITEMS } from '../data/content';

export const FAQAccordionDark: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <section className="py-20 bg-white text-slate-900 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* En-tête centré */}
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest font-bold text-[#1A3A6A] bg-[#1A3A6A]/10 px-4 py-1.5 rounded-full inline-block">
            Foire Aux Questions
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#1A3A6A] mt-3">
            Questions ? Trouvez vos réponses.
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-lg mx-auto">
            Retrouvez les réponses aux interrogations courantes de nos clients institutionnels et partenaires.
          </p>
        </div>

        {/* Liste des questions / réponses */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                  isOpen
                    ? 'bg-slate-50/80 border-[#1A3A6A] shadow-md'
                    : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/40'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-bold cursor-pointer"
                >
                  <span className={`text-sm sm:text-base pr-4 leading-snug ${isOpen ? 'text-[#1A3A6A]' : 'text-slate-800'}`}>
                    {item.question}
                  </span>
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                      isOpen
                        ? 'bg-[#1A3A6A] text-white'
                        : 'bg-slate-100 text-[#1A3A6A]'
                    }`}
                  >
                    <FAIcon
                      name={isOpen ? 'fa-solid fa-minus' : 'fa-solid fa-plus'}
                      size={12}
                      color={isOpen ? '#FFFFFF' : '#1A3A6A'}
                    />
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-slate-600 font-normal leading-relaxed border-t border-slate-200/70">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
