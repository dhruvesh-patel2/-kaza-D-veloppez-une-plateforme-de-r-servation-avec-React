"use client";
import Image from "next/image";
import Link from "next/link";
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
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
        </div>
        <Link href="/" className="header__logo">
          <Image
            src="/img/Logo.png"
            alt="Logo Kasa"
            className="header__logo-desktop"
            width={128}
            height={43}
          />
          <Image
            src="/img/logo-responsive.png"
            alt="Logo Kasa mobile"
            className="header__logo-mobile"
            width={34}
            height={34}
          />
        </Link>
        {/* Actions desktop */}
        <div className="header__actions">
          <Link href="/add-property">
            + Ajouter un logement
          </Link>

          <Link href="/favorites" className="header__icon-link" aria-label="Favoris">
            <Image src="/img/favorie.png" alt="Favoris" width={16} height={16} />
          </Link>

          <Link href="/messages" className="header__icon-link" aria-label="Messagerie">
            <Image src="/img/messagerie.png" alt="Messagerie" width={16} height={16} />
          </Link>
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
          <Image
            src="/img/logo-responsive.png"
            alt="Logo mobile"
            className="mobile-menu__logo"
            width={34}
            height={34}
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
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
          <Link href="/messages">Messagerie</Link>
          <Link href="/favorites">Favoris</Link>
        </div>
        <Link href="/add-property" className="mobile-menu__button">
          Ajouter un logement
        </Link>
      </div>
    </header>
  );
}
