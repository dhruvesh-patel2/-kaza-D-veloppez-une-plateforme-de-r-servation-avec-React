/* eslint-disable @next/next/no-img-element */
// Import React Testing Library
import { render, screen, fireEvent } from "@testing-library/react";
// Import Jest DOM
import "@testing-library/jest-dom";
// Import du composant
import FavoriteButton from "../components/FavoriteButton";
// Import du provider favoris
import { FavoritesProvider } from "../lib/favorites-context";
// Simulation de next/image
jest.mock("next/image", () => {
  return function MockImage({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt}
      />
    );
  };
});
// Groupe de tests favoris
describe("FavoriteButton", () => {
  // Nettoyage localStorage avant chaque test
  beforeEach(() => {
    localStorage.clear();
  });
  // Test ajout favori
  test("ajoute un favori au clic", () => {
    // Affichage du bouton favoris
    render(
      <FavoritesProvider>
        <FavoriteButton propertyId="property-1" />
      </FavoritesProvider>
    );
    // Récupération du bouton
    const button = screen.getByRole("button");
    // Clic sur le bouton
    fireEvent.click(button);
    // Vérifie le localStorage
    expect(
      JSON.parse(localStorage.getItem("favorites"))
    ).toContain("property-1");
  });
  // Test suppression favori
  test("supprime un favori au deuxième clic", () => {
    // Affichage du bouton favoris
    render(
      <FavoritesProvider>
        <FavoriteButton propertyId="property-1" />
      </FavoritesProvider>
    );
    // Récupération du bouton
    const button = screen.getByRole("button");
    // Premier clic = ajout
    fireEvent.click(button);
    // Deuxième clic = suppression
    fireEvent.click(button);
    // Vérifie le localStorage
    expect(
      JSON.parse(localStorage.getItem("favorites"))
    ).not.toContain("property-1");
  });
});