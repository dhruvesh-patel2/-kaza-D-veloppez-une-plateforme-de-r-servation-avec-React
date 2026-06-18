"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import "../styles/header.css";

/**
 * En-tête principal du site.
 * Affiche des actions différentes selon l’état de connexion et le rôle utilisateur.
 */
export default function Header() {
  // État menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Utilisateur connecté
  const [user, setUser] = useState(null);
  // Permet d’éviter l’erreur d’hydratation Next.js
  const [isMounted, setIsMounted] = useState(false);

  // L’utilisateur est lu depuis localStorage uniquement après montage pour éviter
  // un décalage entre le rendu serveur et le rendu client.
  useEffect(() => {
    setIsMounted(true);
    const storedUser = localStorage.getItem("kasa_user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // Vérifie connexion
  const isLoggedIn = isMounted && Boolean(user);
  // Le lien d’ajout de logement reste réservé aux rôles owner/admin.
  const canAddProperty =
    user?.role === "owner" ||
    user?.role === "admin";
  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem("kasa_token");
    localStorage.removeItem("kasa_user");

    window.location.href = "/";
  };
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
        <div className="header__actions">
          {!isLoggedIn && (
            <>
              <Link href="/login">Se connecter</Link>
              <Link href="/register">Créer un compte</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              {canAddProperty && (
                <Link href="/add-property">
                  + Ajouter un logement
                </Link>
              )}
              <Link
                href="/favorites"
                className="header__icon-link"
                aria-label="Favoris"
              >
                <Image
                  src="/img/favorie.png"
                  alt=""
                  width={16}
                  height={16}
                />
              </Link>
              <Link
                href="/messages"
                className="header__icon-link"
                aria-label="Messagerie"
              >
                <Image
                  src="/img/messagerie.png"
                  alt=""
                  width={16}
                  height={16}
                />
              </Link>
              <button
                type="button"
                className="header__logout"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
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
        <div className="mobile-menu__links">
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
          {!isLoggedIn && (
            <>
              <Link href="/login">Se connecter</Link>
              <Link href="/register">Créer un compte</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link href="/messages">Messagerie</Link>
              <Link href="/favorites">Favoris</Link>
              <button
                type="button"
                className="mobile-menu__logout"
                onClick={handleLogout}
              >
                Déconnexion
              </button>
            </>
          )}
        </div>
        {isLoggedIn && canAddProperty && (
          <Link
            href="/add-property"
            className="mobile-menu__button"
          >
            Ajouter un logement
          </Link>
        )}
      </div>
    </header>
  );
}
