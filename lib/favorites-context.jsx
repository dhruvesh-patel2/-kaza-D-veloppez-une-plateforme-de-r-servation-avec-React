"use client";
// Import des outils React utilisés pour gérer les favoris
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
// Création du contexte favoris
const FavoritesContext = createContext(null);
// Valeur par défaut quand il n’y a aucun favori
const EMPTY_FAVORITES = [];
// Cache pour éviter de parser localStorage inutilement
let cachedFavoritesString = null;
let cachedFavoritesSnapshot = EMPTY_FAVORITES;
// Fonction qui lit les favoris depuis localStorage côté navigateur
function getFavoritesSnapshot() {
  if (typeof window === "undefined") {
    return EMPTY_FAVORITES;
  }
  const storedFavorites = localStorage.getItem("favorites");
  if (!storedFavorites) {
    cachedFavoritesString = null;
    cachedFavoritesSnapshot = EMPTY_FAVORITES;
    return EMPTY_FAVORITES;
  }
  if (storedFavorites === cachedFavoritesString) {
    return cachedFavoritesSnapshot;
  }
  cachedFavoritesString = storedFavorites;
  cachedFavoritesSnapshot = JSON.parse(storedFavorites);
  return cachedFavoritesSnapshot;
}
// Valeur utilisée côté serveur pour éviter les erreurs d’hydratation
function getFavoritesServerSnapshot() {
  return EMPTY_FAVORITES;
}
// Fonction qui écoute les changements de favoris
function subscribeToFavorites(callback) {
  if (typeof window === "undefined") {
    return () => {};
  }
  // Fonction appelée quand les favoris changent
  const handleFavoritesChange = () => callback();
  // Écoute les changements localStorage entre onglets
  window.addEventListener("storage", handleFavoritesChange);
  // Écoute les changements favoris dans l’onglet actuel
  window.addEventListener("favorites-change", handleFavoritesChange);
  // Nettoyage des événements
  return () => {
    window.removeEventListener("storage", handleFavoritesChange);
    window.removeEventListener("favorites-change", handleFavoritesChange);
  };
}
// Provider global des favoris
export function FavoritesProvider({ children }) {
  // Lecture synchronisée des favoris depuis localStorage
  const favorites = useSyncExternalStore(
    subscribeToFavorites,
    getFavoritesSnapshot,
    getFavoritesServerSnapshot
  );
  // Valeur partagée dans toute l’application
  const value = useMemo(() => {
    return {
      favorites,
      // Fonction ajout / suppression favoris
      toggleFavorite(propertyId) {
        const isFavorite = favorites.includes(propertyId);
        const updatedFavorites = isFavorite
          ? favorites.filter((id) => id !== propertyId)
          : [...favorites, propertyId];
        // Sauvegarde dans localStorage
        localStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavorites)
        );
        // Déclenche une mise à jour dans l’onglet actuel
        window.dispatchEvent(new Event("favorites-change"));
      },
    };
  }, [favorites]);
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
// Hook personnalisé pour utiliser les favoris
export function useFavorites() {
  const context = useContext(FavoritesContext);
  // Sécurité si le hook est utilisé hors du Provider
  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé à l'intérieur de FavoritesProvider."
    );
  }

  return context;
}