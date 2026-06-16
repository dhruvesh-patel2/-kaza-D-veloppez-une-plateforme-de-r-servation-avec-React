"use client";
// Import du composant Image de Next.js
import Image from "next/image";
// Import du contexte favoris
import { useFavorites } from "../lib/favorites-context";
// Composant bouton favoris
export default function FavoriteButton({ propertyId }) {
  // Récupération des favoris
  // et de la fonction ajout/suppression
  const {
    favorites,
    toggleFavorite,
  } = useFavorites();
  // Vérifie si le logement est déjà favori
  const isFavorite =
    favorites.includes(propertyId);
  return (
    <button
      type="button"
      // Classe CSS dynamique
      // Ajoute une classe active si favori
      className={`
        property-card__favorite
        ${
          isFavorite
            ? "property-card__favorite--active"
            : ""
        }
      `}
      // Gestion du clic favoris
      onClick={(event) => {
        // Empêche le Link parent
        // d’ouvrir la page détail
        event.preventDefault();
        // Ajout ou suppression favori
        toggleFavorite(propertyId);
      }}
      // Accessibilité du bouton
      aria-label={
        isFavorite
          ? "Retirer des favoris"
          : "Ajouter aux favoris"
      }
    >
      {/* Icône favoris */}
      <Image
        src="/img/favorie.png"
        alt="Favori"
        width={14}
        height={14}
      />

    </button>
  );
}