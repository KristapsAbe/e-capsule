import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Bell } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from "../LanguageContext";

const EngFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="20" height="10">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
);

const LatFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="20" height="10">
      <rect width="50" height="30" fill="#9E3039" />
      <rect width="50" height="6" y="12" fill="#FFF" />
    </svg>
);

function Header({ notificationCount, onNotificationClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const location = useLocation();
  const { currentLang, changeLang, t } = useLanguage();
  const sidebarRef = useRef(null);
  const langMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target) &&
          event.target.closest('[data-menu-toggle]') === null) {
        setIsMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(event.target) &&
          event.target.closest('[data-lang-toggle]') === null) {
        setIsLangMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLangMenu = () => setIsLangMenuOpen(!isLangMenuOpen);

  const handleChangeLang = (lang) => {
    changeLang(lang);
    setIsLangMenuOpen(false);
  };

  const LangButton = ({ lang, flag: Flag }) => (
      <button
          onClick={() => handleChangeLang(lang)}
          className="px-4 py-2 text-sm text-text hover:bg-secondary w-full text-left flex items-center font-lexend"
      >
        <Flag />
        <span className="ml-2">{lang}</span>
      </button>
  );

  const NavItem = ({ href, translationKey }) => {
    const isActive = location.pathname === href;
    return (
        <a
            href={href}
            className="text-text relative group text-l font-light font-lexend"
        >
          {t(translationKey)}
          <span
              className={`absolute bottom-0 left-0 w-full h-0.5 bg-accent transform ${
                  isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
              } transition-transform duration-200 ease-in-out`}
          ></span>
        </a>
    );
  };

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
      <header className="w-full bg-background p-2 md:p-4 font-lexend z-20">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center flex-shrink-0">
              <h1 className="text-lg md:text-xl text-text font-extrabold tracking-wide font-lexend whitespace-nowrap">
                E-CAPSULE
              </h1>
            </div>

            <div className="flex items-center space-x-2">
              <button
                  onClick={onNotificationClick}
                  className="p-1.5 relative font-lexend xl:hidden"
              >
                <Bell size={20} color="#FFFFFF"/>
                {notificationCount > 0 && (
                    <span
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
                )}
              </button>
              <button onClick={toggleMenu} className="text-text p-1.5 xl:hidden" data-menu-toggle>
                {isMenuOpen ? <X size={24}/> : <Menu size={24}/>}
              </button>
            </div>

            <nav className="hidden xl:flex items-center justify-center flex-grow px-4">
              <div
                  className="flex flex-wrap justify-center space-x-2 md:space-x-4 lg:space-x-6 text-sm md:text-base font-lexend">
                <NavItem href="/Home" translationKey="home" />
                <NavItem href="/Dashboard" translationKey="dashboard" />
                <NavItem href="/Profile" translationKey="profile" />
                <NavItem href="/CapsuleCreation" translationKey="createCapsule" />
                <NavItem href="/Friends" translationKey="discover" />
              </div>
            </nav>

            <div className="hidden xl:flex items-center space-x-2 lg:space-x-3 flex-shrink-0 font-lexend">
              <div className="relative" ref={langMenuRef}>
                <button
                    onClick={toggleLangMenu}
                    className="text-text bg-secondary font-bold rounded-xl py-1.5 px-3 text-xs md:text-sm flex items-center whitespace-nowrap font-lexend"
                    data-lang-toggle
                >
                  {currentLang === 'ENG' ? <EngFlag /> : <LatFlag />}
                  <span className="ml-2">{currentLang}</span>
                  <ChevronDown size={16} className="ml-1" />
                </button>
                {isLangMenuOpen && (
                    <div className="absolute right-0 mt-2 w-28 rounded-md shadow-lg bg-background text-text ring-1 ring-black ring-opacity-5 z-50">
                      <div className="py-1 font-lexend">
                        <LangButton lang="ENG" flag={EngFlag} />
                        <LangButton lang="LAT" flag={LatFlag} />
                      </div>
                    </div>
                )}
              </div>

              <button
                  onClick={handleLogout}
                  className="text-text bg-secondary rounded-xl py-1.5 px-4 sm:px-8 font-bold text-xs md:text-sm whitespace-nowrap font-lexend"
              >
                {t('logout')}
              </button>

              <button
                  onClick={onNotificationClick}
                  className="text-text rounded-xl py-1.5 px-3 font-bold text-xs md:text-sm flex items-center relative font-lexend"
              >
                <Bell size={20} color="#FFFFFF" />
                {notificationCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notificationCount}
                </span>
                )}
              </button>
            </div>
          </div>
        </div>

        <div
            className={`fixed inset-y-0 right-0 transform ${
                isMenuOpen ? 'translate-x-0' : 'translate-x-full'
            } w-64 bg-background shadow-lg transition-transform duration-300 ease-in-out z-40 overflow-y-auto`}
            ref={sidebarRef}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-text">E-CAPSULE</h2>
              <button onClick={toggleMenu} className="text-text p-1">
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col space-y-6 font-light">
              <NavItem href="/Home" translationKey="home" />
              <NavItem href="/Dashboard" translationKey="dashboard" />
              <NavItem href="/Profile" translationKey="profile" />
              <NavItem href="/CapsuleCreation" translationKey="createCapsule" />
              <NavItem href="/Friends" translationKey="discover" />

              <div className="pt-6 flex flex-col space-y-4">
                <div className="relative">
                  <button
                      onClick={toggleLangMenu}
                      className="text-text bg-secondary w-full rounded-xl py-2 flex items-center justify-center font-lexend"
                  >
                    {currentLang === 'ENG' ? <EngFlag /> : <LatFlag />}
                    <span className="ml-2">{currentLang}</span>
                    <ChevronDown size={16} className="ml-1" />
                  </button>
                  {isLangMenuOpen && (
                      <div className="absolute left-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                        <div className="py-1 font-lexend">
                          <LangButton lang="ENG" flag={EngFlag} />
                          <LangButton lang="LAT" flag={LatFlag} />
                        </div>
                      </div>
                  )}
                </div>
                <button
                    onClick={handleLogout}
                    className="text-text bg-secondary w-full rounded-xl py-2 font-lexend"
                >
                  {t('logout')}
                </button>
                <button
                    onClick={onNotificationClick}
                    className="text-text bg-secondary w-full rounded-xl py-2 font-lexend flex items-center justify-center"
                >
                  <Bell size={20} className="mr-2" />
                  {t('notifications')}
                  {notificationCount > 0 && (
                      <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationCount}
                  </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {isMenuOpen && (
            <div
                className="fixed inset-0 bg-black bg-opacity-50 z-30"
                onClick={toggleMenu}
            ></div>
        )}
      </header>
  );
}

export default Header;