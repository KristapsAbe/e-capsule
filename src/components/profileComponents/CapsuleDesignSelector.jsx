import React from 'react';
import { Star, BookOpen, Clock, Shield, Sparkles, Gem, Heart, Mountains } from 'lucide-react';

const CapsuleDesignSelector = ({ value, onChange }) => {
  const designs = [
    {
      id: 'heritage',
      name: 'Heritage Album',
      description: 'A vintage photo album with golden accents for family memories and traditions',
      icon: <Star className="text-[#FFD700]" size={20} />,
      previewClass: 'bg-gradient-to-br from-[#382330] to-[#5E3762] border-[#B2779F]',
      pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEwLDEwIEwzMCwxMCBMMzAsMzAgTDEwLDMwIFoiIHN0cm9rZT0iI0ZGRDcwMDIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
      accentColor: '#FFD700', // Gold
      secondaryColor: '#B2779F',
      previewStyle: {
        background: 'radial-gradient(circle at center, #5E3762 0%, #382330 100%)',
        boxShadow: '0 10px 25px -5px rgba(178, 119, 159, 0.4)'
      },
      renderPreview: () => (
          <>
            <div className="absolute top-1 left-6 right-6 h-0.5 bg-gradient-to-r from-[#FFD700]/20 via-[#FFD700] to-[#FFD700]/20"></div>
            <div className="absolute inset-2 border border-[#FFD700]/30 rounded"></div>
            <div className="w-16 h-10 bg-[#382330] border border-[#FFD700]/50 rounded transform rotate-2 shadow-md"></div>
            <div className="absolute bottom-1 right-1">
              <Star className="text-[#FFD700]/80" size={14} />
            </div>
          </>
      )
    },
    {
      id: 'chronicle',
      name: 'Digital Chronicle',
      description: 'Futuristic interface with glowing elements and a high-tech aesthetic',
      icon: <Sparkles className="text-[#64DFDF]" size={20} />,
      previewClass: 'bg-gradient-to-r from-[#0D0E16] to-[#193A5A] border-[#64DFDF]',
      pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMiIgeD0iMjkiIHk9IjI5IiBmaWxsPSIjNjRERkRGMzAiLz48L3N2Zz4=")]',
      accentColor: '#64DFDF', // Cyan
      secondaryColor: '#A7ACCD',
      previewStyle: {
        background: 'linear-gradient(135deg, #193A5A 0%, #0D0E16 100%)',
        boxShadow: '0 0 30px -5px rgba(100, 223, 223, 0.5)'
      },
      renderPreview: () => (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-0.5 bg-[#64DFDF]/60 animate-pulse"></div>
            </div>
            <div className="absolute top-4 left-4 w-4 h-4 rounded-full border border-[#64DFDF] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[#64DFDF]/80 animate-ping"></div>
            </div>
            <div className="absolute top-4 right-4 w-12 h-1 bg-[#64DFDF]/40"></div>
            <div className="absolute bottom-4 left-4 w-16 h-4 rounded border border-[#64DFDF]/40 flex items-center justify-center">
              <div className="w-14 h-0.5 bg-[#64DFDF]/70"></div>
            </div>
          </>
      )
    },
    {
      id: 'legacy',
      name: 'Romantic Journal',
      description: 'Ornate vintage journal with elegant decorations and flourishes',
      icon: <Heart className="text-[#FF95DD]" size={20} />,
      previewClass: 'bg-gradient-to-br from-[#3D2C40] to-[#5E3762] border-[#FF95DD]',
      pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMjUsMjUgQzI1LDUwIDc1LDUwIDc1LDI1IiBzdHJva2U9IiNGRjk1REQyMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1LDc1IEMyNSw1MCA3NSw1MCA3NSw3NSIgc3Ryb2tlPSIjRkY5NUREMjAiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==")]',
      accentColor: '#FF95DD', // Pink
      secondaryColor: '#FF95DD',
      previewStyle: {
        background: 'linear-gradient(to bottom, #3D2C40 0%, #5E3762 100%)',
        boxShadow: '0 10px 25px -5px rgba(255, 149, 221, 0.3)'
      },
      renderPreview: () => (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-8 bg-[#3D2C40] border border-[#FF95DD]/50 rounded flex items-center justify-center">
                <Heart className="text-[#FF95DD]/70" size={16} />
              </div>
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 rounded-full bg-[#FF95DD]/70"></div>
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF95DD]/70"></div>
            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-[#FF95DD]/70"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-[#FF95DD]/70"></div>
          </>
      )
    },
    {
      id: 'vault',
      name: 'Crystal Vault',
      description: 'Geometric crystalline structure with facets that reflect your memories',
      icon: <Gem className="text-[#A3E4DB]" size={20} />,
      previewClass: 'bg-gradient-to-r from-[#1A3A4A] to-[#30637C] border-[#A3E4DB]',
      pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTMwLDEwIEwxMCwzMCBMMzAsNTAgTDUwLDMwIFoiIHN0cm9rZT0iI0EzRTREQjIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
      accentColor: '#A3E4DB', // Teal
      secondaryColor: '#A3688F',
      previewStyle: {
        background: 'linear-gradient(135deg, #1A3A4A 0%, #30637C 100%)',
        boxShadow: '0 10px 25px -5px rgba(163, 228, 219, 0.3)'
      },
      renderPreview: () => (
          <>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 bg-transparent border-2 border-[#A3E4DB]/40 transform rotate-45"></div>
              <div className="absolute w-8 h-8 bg-transparent border border-[#A3E4DB]/70 transform rotate-45"></div>
              <div className="absolute w-4 h-4 bg-[#A3E4DB]/20 transform rotate-45"></div>
            </div>
            <div className="absolute top-1 right-1">
              <Gem className="text-[#A3E4DB]/80" size={12} />
            </div>
          </>
      )
    }
  ];

  return (
      <div className="w-full h-full overflow-y-auto px-4 bg-[#0D0E16]/95">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pb-20">
          {designs.map((design) => (
              <div
                  key={design.id}
                  onClick={() => onChange({ target: { name: 'design', value: design.id } })}
                  className={`
              relative cursor-pointer rounded-xl p-5 border-2 transition-all duration-500
              ${design.previewClass}
              ${value === design.id
                      ? `ring-2 ring-offset-4 ring-offset-[#0D0E16] ring-[${design.accentColor}] scale-105 shadow-lg`
                      : 'hover:scale-102 hover:shadow-md'}
              transform hover:-translate-y-1
              backdrop-blur-lg
            `}
                  style={{
                    boxShadow: value === design.id
                        ? `0 10px 25px -5px ${design.accentColor}30`
                        : undefined
                  }}
              >
                {/* Decorative elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
                  <div className={`absolute inset-0 ${design.pattern} opacity-30`} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[${design.accentColor}]/40 to-transparent`} />
                  <div className={`absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-[${design.accentColor}]/30 to-transparent`} />
                  <div className={`absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[${design.accentColor}]/40 to-transparent`} />
                  <div className={`absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-[${design.accentColor}]/30 to-transparent`} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg bg-black/30 backdrop-blur-sm shadow-xl border border-[${design.accentColor}]/30`}>
                      {design.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-bold truncate text-[#E5E6F0]">
                        {design.name}
                      </h4>
                      <p className="text-sm leading-relaxed line-clamp-2 text-[#A7ACCD] mt-1">
                        {design.description}
                      </p>
                    </div>
                    {value === design.id && (
                        <div className="absolute top-2 right-2">
                          <div className={`w-5 h-5 rounded-full bg-[${design.accentColor}] flex items-center justify-center shadow-lg`}>
                            <div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                          </div>
                        </div>
                    )}
                  </div>

                  {/* Capsule preview with much more distinct designs */}
                  <div
                      className="relative h-24 mt-4 rounded-lg overflow-hidden backdrop-blur-md border border-white/10 flex items-center justify-center"
                      style={design.previewStyle}
                  >
                    {design.renderPreview()}
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default CapsuleDesignSelector;