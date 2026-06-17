import "../../../styles/property-detail.css";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById } from "../../../lib/api";
import Carousel from "../../../components/Carousel";
// Page détail d’un logement
export default async function PropertyDetail({ params }) {
  // Récupération de l’id du logement depuis l’URL
  const { slug } = await params;
  // Récupération des données du logement depuis l’API
  const property = await getPropertyById(slug);
  return (
    <main className="property-detail">
      {/* Lien retour vers la page d’accueil */}
      <Link
        href="/"
        className="property-detail__back"
      >
        ← Retour aux annonces
      </Link>
      {/* Layout principal : contenu + carte hôte */}
      <div className="property-detail__layout">
        {/* Partie principale de la page */}
        <section className="property-detail__main">
          {/* Galerie / carousel */}
          <div className="property-detail__gallery">
            <Carousel
              pictures={property.pictures}
              title={property.title}
            />
          </div>
          {/* Informations du logement */}
          <section className="property-detail__content">
            {/* Titre du logement */}
            <h1>
              {property.title}
            </h1>
            {/* Localisation */}
            <p className="property-detail__location">
              <Image
                src="/img/Property 1=localisation.png"
                alt=""
                width={10}
                height={10}
                className="property-detail__location-icon"
                aria-hidden="true"
              />
              {property.location}
            </p>
            {/* Description */}
            <p className="property-detail__description">
              {property.description}
            </p>
            {/* Section équipements */}
            <div className="property-detail__section">
              <h2>
                Équipements
              </h2>
              <div className="property-detail__tags">
                {property.equipments?.map((equipment) => (
                  <span key={equipment}>
                    {equipment}
                  </span>
                ))}
              </div>
            </div>
            {/* Section catégories */}
            <div className="property-detail__section">
              <h2>
                Catégorie
              </h2>

              <div className="property-detail__tags">
                {property.tags?.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </section>
        </section>
        {/* Carte hôte */}
        <aside className="property-detail__host">
          {/* Titre carte hôte */}
          <h2>
            Votre hôte
          </h2>
          {/* Informations hôte */}
          <div className="property-detail__host-info">
            <Image
              src={property.host.picture}
              alt={property.host.name}
              width={74}
              height={74}
            />
            <div className="property-detail__host-meta">
              <span className="property-detail__host-name">
                {property.host.name}
              </span>

              <div className="property-detail__rating">
                ★ {property.rating_avg}
              </div>
            </div>
          </div>
          {/* Actions pour contacter l’hôte */}
          <div className="property-detail__host-actions">
            {/* Lien vers la messagerie */}
            <Link
              href="/messages"
              className="property-detail__host-button"
            >
              Contacter l’hôte
            </Link>
            {/* Lien vers la messagerie */}
            <Link
              href="/messages"
              className="property-detail__host-button"
            >
              Envoyer un message
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}