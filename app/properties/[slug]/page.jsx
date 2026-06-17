import "../../../styles/property-detail.css";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById } from "../../../lib/api";
import Carousel from "../../../components/Carousel";
import Collapse from "../../../components/Collapse";
// Page détail logement
export default async function PropertyDetail({ params }) {
  // Récupération de l’id depuis l’URL
  const { slug } = await params;
  // Récupération du logement depuis l’API
  const property = await getPropertyById(slug);
  return (
    <main className="property-detail">
      {/* Retour accueil */}
      <Link
        href="/"
        className="property-detail__back"
      >
        ← Retour aux annonces
      </Link>
      <div className="property-detail__layout">
        <section className="property-detail__main">
          {/* Carousel */}
          <div className="property-detail__gallery">
            <Carousel
              pictures={property.pictures}
              title={property.title}
            />
          </div>
          {/* Contenu logement */}
          <section className="property-detail__content">
            <h1>{property.title}</h1>

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
            {/* Collapse description */}
            <Collapse title="Description">
              <p className="property-detail__description">
                {property.description}
              </p>
            </Collapse>
            {/* Collapse équipements */}
            <Collapse title="Équipements">
              <div className="property-detail__tags">
                {property.equipments?.map((equipment) => (
                  <span key={equipment}>
                    {equipment}
                  </span>
                ))}
              </div>
            </Collapse>
            {/* Collapse catégorie */}
            <Collapse title="Catégorie">
              <div className="property-detail__tags">
                {property.tags?.map((tag) => (
                  <span key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Collapse>
          </section>
        </section>
        {/* Carte hôte */}
        <aside className="property-detail__host">
          <h2>Votre hôte</h2>
          <div className="property-detail__host-info">
            <Image
              src={property.host.picture || "/img/logo-responsive.png"}
              alt={property.host.name}
              width={64}
              height={64}
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
          <div className="property-detail__host-actions">
            <Link
              href="/messages"
              className="property-detail__host-button"
            >
              Contacter l’hôte
            </Link>
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