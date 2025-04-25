import React, { useState } from 'react';
import { Lock, Unlock, Quote, MessageCircle, Camera, Package } from 'lucide-react';
import { useLanguage } from "../../../LanguageContext";
import { getDesignStyles, getDesignIcon } from "./DesignStyles";
import { Clock } from 'lucide-react';
import CommentCapsuleView from "../../FriendsDiscovery/FriendsDiscoveryPopups/CommentCapsuleView";

const ProfileCapsulesGrid = ({ capsules = [], onCapsuleClick }) => {
  const { t } = useLanguage();
  const validCapsules = Array.isArray(capsules) ? capsules : [];
  const [commentCapsule, setCommentCapsule] = useState(null);

  const handleCloseComments = () => {
    setCommentCapsule(null);
  };

  const handleCapsuleAction = (capsule, action) => {
    if (action === 'comments') {
      setCommentCapsule(capsule);
    } else {
      onCapsuleClick(capsule);
    }
  };

  return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {validCapsules.map((capsule) => (
              <CapsuleCard
                  key={capsule.id}
                  capsule={capsule}
                  onCapsuleClick={onCapsuleClick}
                  onCommentsClick={(capsule) => handleCapsuleAction(capsule, 'comments')}
                  t={t}
              />
          ))}
        </div>

        {/* Comments Modal */}
        <CommentCapsuleView
            isOpen={commentCapsule !== null}
            onClose={handleCloseComments}
            capsule={commentCapsule}
        />
      </>
  );
};

const CapsuleCard = ({ capsule, onCapsuleClick, onCommentsClick, t }) => {
  const design = capsule.design || 'heritage';
  const styles = getDesignStyles(design);
  const isReady = capsule.daysLeft <= 0;

  const handleCommentsClick = (e) => {
    e.stopPropagation();
    onCommentsClick(capsule);
  };

  return (
      <div
          className="group cursor-pointer transform transition-all duration-300 hover:-translate-y-1 hover:scale-102"
          onClick={() => onCapsuleClick(capsule)}
      >
        <div
            className={`relative rounded-xl border-2 overflow-hidden h-full ${styles.container}`}
            style={{ boxShadow: styles.boxShadow }}
        >
          <ThemeDecoration design={design} />

          <div className={`p-4 backdrop-blur-sm ${styles.header} border-b border-white/20`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getDesignIcon(design)}
                <h3 className="text-lg font-bold truncate">{capsule.title}</h3>
              </div>

              <button
                  onClick={handleCommentsClick}
                  className="flex items-center gap-1 text-sm px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                  title={t('viewComments')}
              >
                <MessageCircle size={14} style={{ color: styles.accent }} />
              </button>
            </div>
          </div>

          <div className="p-4">
            <ContentPreview capsule={capsule} styles={styles} t={t} />

            <div className="relative mt-2">
              <div className={`flex items-center gap-2 text-base font-medium text-center justify-center 
            py-2 px-4 rounded-full backdrop-blur-sm 
            ${isReady ? 'bg-gradient-to-r from-white/10 via-white/20 to-white/10' : 'bg-black/30'}`}>
                {isReady ? (
                    <>
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/5 via-white/15 to-white/5 animate-pulse opacity-80" />
                      <Unlock size={18} style={{ color: styles.accent }} />
                      <span className="relative z-10 font-semibold" style={{ color: styles.accent }}>{t('readyToOpen')}</span>
                    </>
                ) : (
                    <>
                      <Lock size={18} style={{ color: styles.accent }} />
                      <span className="relative z-10">{t('opensIn').replace('{days}', capsule.daysLeft)}</span>
                    </>
                )}
              </div>
            </div>

            <div className="mt-3 flex justify-between items-center text-xs opacity-70">
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                <span>{t('created')} {new Date(capsule.created_at).toLocaleDateString()}</span>
              </div>

              {capsule.comments_count > 0 && (
                  <div className="flex items-center">
                    <MessageCircle size={12} className="mr-1" />
                    <span>{capsule.comments_count} {capsule.comments_count === 1 ? t('comment') : t('comments')}</span>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
  );
};

const ContentPreview = ({ capsule, styles, t }) => {
  const images = JSON.parse(capsule.images || '[]');
  const hasImages = images.length > 0;
  const hasMessages = capsule.message && capsule.message.trim().length > 0;
  const [imageError, setImageError] = useState(false);

  const imageBaseUrl = 'https://www.e-capsule.digital/backend/public/storage/';

  return (
      <div className="relative h-48 mb-4 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {hasImages ? (
              <div className="relative w-4/5 h-4/5 transform rotate-2 hover:rotate-0 transition-all duration-300">
                <div className={`absolute inset-0 ${styles.photoStack} rounded-lg shadow-lg transform rotate-6 translate-x-3 -translate-y-1 z-0 opacity-80`}></div>
                <div className={`absolute inset-0 ${styles.photoStack} rounded-lg shadow-lg transform -rotate-3 -translate-x-2 translate-y-1 z-0 opacity-90`}></div>

                <div className={`relative w-full h-full ${styles.photoStack} rounded-lg shadow-lg z-10 p-2 overflow-hidden border border-white/10`}>
                  <div className="w-full h-full overflow-hidden rounded bg-gray-900/60">
                    <div className="relative w-full h-full overflow-hidden">
                      {!imageError ? (
                          <img
                              src={`${imageBaseUrl}${images[0]}`}
                              alt={t('memoryPreview')}
                              className={`w-full h-full object-cover blur-sm ${styles.filter}`}
                              onError={(e) => {
                                setImageError(true);
                                e.target.onerror = null;
                              }}
                          />
                      ) : (
                          <img
                              src="/api/placeholder/300/200"
                              alt={t('memoryPreview')}
                              className={`w-full h-full object-cover blur-sm ${styles.filter}`}
                          />
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 p-4">
                        <Camera size={28} style={{ color: styles.accent }} className="mb-2" />
                        <p className="text-center text-white font-medium">
                          {images.length} {images.length === 1 ? t('photo') : t('photos')} {t('sealedInThisMemory')}
                        </p>
                        {hasMessages && (
                            <div className="mt-2 flex items-center">
                              <MessageCircle size={16} style={{ color: styles.accent }} className="mr-1" />
                              <span className="text-xs">+ {t('writtenMessage')}</span>
                            </div>
                        )}
                      </div>
                    </div>
                  </div>

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
                  <p className="text-center text-white/90 font-medium">{t('specialMemoryAwaits')}</p>
                  <p className="text-center text-white/70 text-sm mt-1">{t('contentsSealed')}</p>
                </div>
              </div>
          )}
        </div>

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNTYiIGhlaWdodD0iMjU2Ij48ZmlsdGVyIGlkPSJub2lzZSIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGcmVxdWVuY3k9IjAuNSIgbnVtT2N0YXZlcz0iMiIgc3RpdGNoVGlsZXM9InN0aXRjaCIgc2VlZD0iMiIgcmVzdWx0PSJ0dXJidWxlbmNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjEgMCAwIDAgMCAwIDEgMCAwIDAgMCAwIDEgMCAwIDAgMCAwIDAuMDUgMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNub2lzZSkiLz48L3N2Zz4=')] opacity-20 pointer-events-none"></div>
      </div>
  );
};

const ThemeDecoration = ({ design }) => {
  const styles = getDesignStyles(design);

  return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
        <div className={`absolute inset-0 ${styles.pattern} opacity-30`} />

        <div
            className="absolute inset-0"
            style={{ background: styles.decorationGradient }}
        />

        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-30 animate-pulse" />

        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-white/30 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
  );
};

export default ProfileCapsulesGrid;