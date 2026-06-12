// Import de la fonction qui récupère les logements depuis l’API
import { getProperties } from "../lib/api";

export default async function Home() {
  // Récupération des données des logements
  const properties = await getProperties();
  return (
    <main>
      {/* Titre principal */}
      <h1>Logements</h1>
      {/* Affichage temporaire des données JSON pour vérifier la connexion API */}
      <pre>{JSON.stringify(properties, null, 2)}</pre>
    </main>
  );
}