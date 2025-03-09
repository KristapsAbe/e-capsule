import React from 'react';
import { Lock, Unlock, Star, BookOpen, Clock, Shield, Heart, Quote, MessageCircle, Camera, Package } from 'lucide-react';

const ProfileCapsulesGrid = ({ capsules = [], onCapsuleClick }) => {
  const validCapsules = Array.isArray(capsules) ? capsules : [];

  const getDesignStyles = (design) => {
    const styles = {
      heritage: {
        container: 'bg-gradient-to-br from-[#382330] to-[#5E3762] border-[#B2779F] text-[#E5E6F0]',
        header: 'text-[#E5E6F0] bg-black/40',
        accent: '#FFD700', // Gold
        secondaryColor: '#B2779F',
        contentBg: 'bg-black/30 border-[#B2779F]/50',
        filter: 'brightness-95 contrast-110',
        icon: <Star className="text-[#FFD700]" size={18} />,
        pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTEwLDEwIEwzMCwxMCBMMzAsMzAgTDEwLDMwIFoiIHN0cm9rZT0iI0ZGRDcwMDIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
        boxShadow: '0 10px 25px -5px rgba(178, 119, 159, 0.4)',
        decorationGradient: 'radial-gradient(circle at center, #5E3762 0%, #382330 100%)',
        photoStack: 'bg-gradient-to-br from-[#453244] to-[#513452]',
        dateStamp: 'bg-[#382330]/80 text-[#E5E6F0]'
      },
      chronicle: {
        container: 'bg-gradient-to-r from-[#0D0E16] to-[#193A5A] border-[#64DFDF] text-[#E5E6F0]',
        header: 'text-[#E5E6F0] bg-black/40',
        accent: '#64DFDF', // Cyan
        secondaryColor: '#A7ACCD',
        contentBg: 'bg-black/30 border-[#64DFDF]/50',
        filter: 'brightness-95 saturate-105',
        icon: <BookOpen className="text-[#64DFDF]" size={18} />,
        pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHJlY3Qgd2lkdGg9IjIiIGhlaWdodD0iMiIgeD0iMjkiIHk9IjI5IiBmaWxsPSIjNjRERkRGMzAiLz48L3N2Zz4=")]',
        boxShadow: '0 0 30px -5px rgba(100, 223, 223, 0.5)',
        decorationGradient: 'linear-gradient(135deg, #193A5A 0%, #0D0E16 100%)',
        photoStack: 'bg-gradient-to-r from-[#132336] to-[#1D3E5E]',
        dateStamp: 'bg-[#0D1624]/80 text-[#A7ACCD]'
      },
      legacy: {
        container: 'bg-gradient-to-br from-[#3D2C40] to-[#5E3762] border-[#FF95DD] text-[#E5E6F0]',
        header: 'text-[#E5E6F0] bg-black/40',
        accent: '#FF95DD', // Pink
        secondaryColor: '#FF95DD',
        contentBg: 'bg-black/30 border-[#FF95DD]/50',
        filter: 'brightness-100 contrast-110',
        icon: <Heart className="text-[#FF95DD]" size={18} />,
        pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cGF0aCBkPSJNMjUsMjUgQzI1LDUwIDc1LDUwIDc1LDI1IiBzdHJva2U9IiNGRjk1REQyMCIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIi8+PHBhdGggZD0iTTI1LDc1IEMyNSw1MCA3NSw1MCA3NSw3NSIgc3Ryb2tlPSIjRkY5NUREMjAiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjwvc3ZnPg==")]',
        boxShadow: '0 10px 25px -5px rgba(255, 149, 221, 0.3)',
        decorationGradient: 'linear-gradient(to bottom, #3D2C40 0%, #5E3762 100%)',
        photoStack: 'bg-gradient-to-br from-[#4D3D50] to-[#5E3762]',
        dateStamp: 'bg-[#3D2C40]/80 text-[#FF95DD]'
      },
      vault: {
        container: 'bg-gradient-to-r from-[#1A3A4A] to-[#30637C] border-[#A3E4DB] text-[#E5E6F0]',
        header: 'text-[#E5E6F0] bg-black/40',
        accent: '#A3E4DB', // Teal
        secondaryColor: '#A3688F',
        contentBg: 'bg-black/30 border-[#A3E4DB]/50',
        filter: 'brightness-95 contrast-110',
        icon: <Shield className="text-[#A3E4DB]" size={18} />,
        pattern: 'bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTMwLDEwIEwxMCwzMCBMMzAsNTAgTDUwLDMwIFoiIHN0cm9rZT0iI0EzRTREQjIwIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiLz48L3N2Zz4=")]',
        boxShadow: '0 10px 25px -5px rgba(163, 228, 219, 0.3)',
        decorationGradient: 'linear-gradient(135deg, #1A3A4A 0%, #30637C 100%)',
        photoStack: 'bg-gradient-to-r from-[#1F404E] to-[#2A5A70]',
        dateStamp: 'bg-[#1A3A4A]/80 text-[#A3E4DB]'
      }
    };
    return styles[design] || styles.heritage;
  };

  // Enhanced theme decoration component
  const ThemeDecoration = ({ design }) => {
    const styles = getDesignStyles(design);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          {/* Pattern background */}
          <div className={`absolute inset-0 ${styles.pattern} opacity-30`} />

          {/* Design-specific gradient */}
          <div
              className="absolute inset-0"
              style={{ background: styles.decorationGradient }}
          />

          {/* Subtle animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30 animate-pulse" />

          {/* Border glows */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

          {/* Top layer shadow gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
    );
  };

  // Get correct icon based on design
  const getDesignIcon = (design) => {
    const iconMap = {
      'heritage': <Star className="text-[#FFD700]" size={18} />,
      'chronicle': <BookOpen className="text-[#64DFDF]" size={18} />,
      'legacy': <Heart className="text-[#FF95DD]" size={18} />,
      'vault': <Shield className="text-[#A3E4DB]" size={18} />
    };
    return iconMap[design] || iconMap.heritage;
  };

  // Completely redesigned memory content preview
  const getContentPreview = (capsule) => {
    const design = capsule.design || 'heritage';
    const styles = getDesignStyles(design);
    const images = JSON.parse(capsule.images || '[]');
    const hasImages = images.length > 0;
    const hasMessages = capsule.message && capsule.message.trim().length > 0;

    return (
        <div className="relative h-48 mb-4 overflow-hidden">
          {/* Polaroid-style memory display */}
          <div className="absolute inset-0 flex items-center justify-center">
            {hasImages ? (
                <div className="relative w-4/5 h-4/5 transform rotate-2 hover:rotate-0 transition-all duration-300">
                  {/* Photo stack effect - themed instead of white */}
                  <div className={`absolute inset-0 ${styles.photoStack} rounded-lg shadow-lg transform rotate-6 translate-x-3 -translate-y-1 z-0 opacity-80`}></div>
                  <div className={`absolute inset-0 ${styles.photoStack} rounded-lg shadow-lg transform -rotate-3 -translate-x-2 translate-y-1 z-0 opacity-90`}></div>

                  {/* Main photo */}
                  <div className={`relative w-full h-full ${styles.photoStack} rounded-lg shadow-lg z-10 p-2 overflow-hidden border border-white/10`}>
                    <div className="w-full h-full overflow-hidden rounded bg-gray-900/60">
                      {/* Blurred image preview */}
                      <div className="relative w-full h-full overflow-hidden">
                        <img
                            src="/api/placeholder/300/200"
                            alt="Memory preview"
                            className={`w-full h-full object-cover blur-sm ${styles.filter}`}
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                          <Camera size={28} style={{ color: styles.accent }} className="mb-2" />
                          <p className="text-center text-white font-medium">
                            {images.length} {images.length === 1 ? 'Photo' : 'Photos'} sealed in this memory
                          </p>
                          {hasMessages && (
                              <div className="mt-2 flex items-center">
                                <MessageCircle size={16} style={{ color: styles.accent }} className="mr-1" />
                                <span className="text-xs">+ Written message</span>
                              </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Date stamp at bottom - themed instead of white */}
                    <div className={`absolute bottom-0 left-0 right-0 ${styles.dateStamp} py-1 px-2 text-center backdrop-blur-sm`}>
                      <p className="text-xs font-medium">
                        {new Date(capsule.created_at).toLocaleDateString(undefined, {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </div>
            ) : hasMessages ? (
                <div className="relative w-5/6 h-5/6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 overflow-hidden transform hover:scale-105 transition-all duration-300 border border-white/10">
                  <Quote size={30} className="absolute top-2 left-2 opacity-30" style={{ color: styles.accent }} />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="relative h-full flex flex-col items-center justify-center">
                    <MessageCircle size={28} style={{ color: styles.accent }} className="mb-3" />
                    <p className="text-center text-white/90 font-medium line-clamp-3">
                      {capsule.message ? capsule.message.slice(0, 85) + (capsule.message.length > 85 ? '...' : '') : ''}
                    </p>
                  </div>
                </div>
            ) : (
                <div className="relative w-5/6 h-5/6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg shadow-lg p-6 overflow-hidden transform hover:scale-105 transition-all duration-300 border border-white/10">
                  <div className="h-full flex flex-col items-center justify-center">
                    <Package size={32} style={{ color: styles.accent }} className="mb-3 animate-pulse" />
                    <p className="text-center text-white/90 font-medium">A special memory awaits</p>
                    <p className="text-center text-white/70 text-sm mt-1">Contents sealed until opening</p>
                  </div>
                </div>
            )}
          </div>

          {/* Subtle film dust overlay */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2Ij48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjEgMCAwIDAgMCAwIDEgMCAwIDAgMCAwIDEgMCAwIDAgMCAwIDAuMDUgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
        </div>
    );
  };

  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {validCapsules.map((capsule) => {
          const design = capsule.design || 'heritage';
          const styles = getDesignStyles(design);
          const isReady = capsule.daysLeft <= 0;

          return (
              <div
                  key={capsule.id}
                  className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:scale-102"
                  onClick={() => onCapsuleClick(capsule)}
              >
                <div
                    className={`relative rounded-xl border-2 overflow-hidden h-full ${styles.container}`}
                    style={{ boxShadow: styles.boxShadow }}
                >
                  <ThemeDecoration design={design} />

                  {/* Header */}
                  <div className={`p-4 backdrop-blur-sm ${styles.header} border-b border-white/20`}>
                    <div className="flex items-center gap-2">
                      {getDesignIcon(design)}
                      <h3 className="text-lg font-bold truncate">{capsule.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    {/* Memory Content Preview */}
                    {getContentPreview(capsule)}

                    {/* Status - With more engaging animations */}
                    <div className="relative mt-2">
                      <div className={`flex items-center gap-2 text-base font-medium text-center justify-center 
                    py-2 px-4 rounded-full backdrop-blur-sm 
                    ${isReady ? 'bg-gradient-to-r from-white/10 via-white/20 to-white/10' : 'bg-black/30'}`}>
                        {isReady ? (
                            <>
                              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-white/15 to-white/5 animate-pulse opacity-80" />
                              <Unlock size={18} style={{ color: styles.accent }} />
                              <span className="relative z-10 font-semibold" style={{ color: styles.accent }}>Ready to open!</span>
                            </>
                        ) : (
                            <>
                              <Lock size={18} style={{ color: styles.accent }} />
                              <span className="relative z-10">{`Opens in ${capsule.daysLeft} days`}</span>
                            </>
                        )}
                      </div>
                    </div>

                    {/* Date information with improved formatting */}
                    <div className="mt-3 flex justify-center items-center text-xs opacity-70">
                      <Clock size={12} className="mr-1" />
                      <span>Created {new Date(capsule.created_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
          );
        })}
      </div>
  );
};

export default ProfileCapsulesGrid;