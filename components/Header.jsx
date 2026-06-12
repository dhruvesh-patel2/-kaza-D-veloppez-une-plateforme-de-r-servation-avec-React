"use client";
import { useState } from "react";
// Import du CSS du header
import "../styles/header.css";
export default function Header() {
  // État du menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header">
      <nav className="header__container">
        <div className="header__links">
          <a href="/">Accueil</a>
          <a href="/about">À propos</a>
        </div>
        <a href="/" className="header__logo">
          <img
            src="/img/Logo.png"
            alt="Logo Kasa"
            className="header__logo-desktop"
          />
          <img
            src="/img/logo-responsive.png"
            alt="Logo Kasa mobile"
            className="header__logo-mobile"
          />
        </a>
        {/* Actions desktop */}
        <div className="header__actions">
          <a href="/add-property">
            + Ajouter un logement
          </a>

          <a href="/favorites">
            ♡
          </a>

          <a href="/messages">
            ▱
          </a>
        </div>
        {/* Bouton burger mobile */}
        <button
          className="header__burger"
          onClick={() => setIsMenuOpen(true)}
          aria-label="Ouvrir le menu"
        >
          ☰
        </button>
      </nav>
      <div className={`mobile-menu ${isMenuOpen ? "mobile-menu--open" : ""}`}>
        <div className="mobile-menu__top">
          <img
            src="/img/logo-responsive.png"
            alt="Logo mobile"
            className="mobile-menu__logo"
          />
          <button
            className="mobile-menu__close"
            onClick={() => setIsMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            ✕
          </button>
        </div>
        {/* Navigation mobile */}
        <div className="mobile-menu__links">
          <a href="/">
            Accueil
          </a>
          <a href="/about">
            À propos
          </a>
          <a href="/messages">
            Messagerie
          </a>
          <a href="/favorites">
            Favoris
          </a>
        </div>
        <a
          href="/add-property"
          className="mobile-menu__button"
        >
          Ajouter un logement
        </a>
      </div>
    </header>
  );
}