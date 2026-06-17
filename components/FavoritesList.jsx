"use client";
// Import du composant carte logement
import PropertyCard from "./PropertyCard";
// Import du contexte favoris
import { useFavorites } from "../lib/favorites-context";
// Composant liste des favoris
export default function FavoritesList({ properties }) {
  // Récupération des favoris depuis le contexte
  const {
    favorites,
  } = useFavorites();
  // Filtre uniquement les logements favoris
  const favoriteProperties = properties.filter((property) =>
    favorites.includes(property.id)
  );
  // Affichage si aucun favori
  if (favoriteProperties.length === 0) {
    return (
      <p className="favorites-page__empty">
        Vous n’avez pas encore ajouté de logement en favori.
      </p>
    );
  }
  return (
    <section className="favorites-page__grid">
      {/* Affichage des cartes favoris */}
      {favoriteProperties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}

    </section>
  );
}