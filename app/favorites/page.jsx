// Import du style de la page favoris
import "../../styles/favorites.css";
// Import du composant qui affiche les favoris
import FavoritesList from "../../components/FavoritesList";
// Import de la fonction API qui récupère tous les logements
import { getProperties } from "../../lib/api";
// Page favoris
export default async function FavoritesPage() {
  // Récupération des logements depuis l’API
  const properties = await getProperties();
  return (
    <main className="favorites-page">
      {/* En-tête de la page */}
      <section className="favorites-page__hero">
        <h1>
          Vos favoris
        </h1>
        <p>
          Retrouvez ici tous les logements que vous avez aimés.
          <br />
          Prêts à réserver ? Un simple clic et votre prochain séjour est en route.
        </p>
      </section>
      {/* Liste dynamique des favoris */}
      <FavoritesList properties={properties} />

    </main>
  );
}