import "../styles/home.css";
import { getProperties } from "../lib/api";
import PropertyCard from "../components/PropertyCard";

export default async function Home() {
  const properties = await getProperties();

  return (
    <main className="home">
      <section className="home__hero">
        <h1>Chez vous,<br className="home__break" /> partout et ailleurs</h1>
        <p>Avec Kasa, vivez des séjours uniques dans des hébergements chaleureux, sélectionnés avec soin par nos hôtes.</p>
        <img src="/img/banner.png" alt="Maison moderne dans les dunes" />
      </section>

      <section className="home__grid">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </section>

      <section className="home__steps">
        <h2>Comment ça marche ?</h2>
        <p>Que vous partiez pour un week-end improvisé, des vacances en famille ou un voyage professionnel, Kasa vous aide à trouver un lieu qui vous ressemble.</p>

        <div className="home__steps-grid">
          <article>
            <h3>Recherchez</h3>
            <p>Entrez votre destination, vos dates et laissez Kasa faire le reste</p>
          </article>

          <article>
            <h3>Réservez</h3>
            <p>Profitez d’une plateforme sécurisée et de profils d’hôtes vérifiés.</p>
          </article>

          <article>
            <h3>Vivez l’expérience</h3>
            <p>Installez-vous, profitez de votre séjour, et sentez-vous chez vous, partout.</p>
          </article>
        </div>
      </section>
    </main>
  );
}