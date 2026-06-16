import "../../../styles/property-detail.css";
import Image from "next/image";
import Link from "next/link";
import { getPropertyById } from "../../../lib/api";
import Carousel from "../../../components/Carousel";

export default async function PropertyDetail({ params }) {
  const { slug } = await params;
  const property = await getPropertyById(slug);

  return (
    <main className="property-detail">
      <Link href="/" className="property-detail__back">
        ← Retour aux annonces
      </Link>

      <div className="property-detail__layout">
        <section className="property-detail__main">
          <div className="property-detail__gallery">
            <Carousel pictures={property.pictures} title={property.title} />
          </div>

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

            <p className="property-detail__description">{property.description}</p>

            <div className="property-detail__section">
              <h2>Équipements</h2>

              <div className="property-detail__tags">
                {property.equipments?.map((equipment) => (
                  <span key={equipment}>{equipment}</span>
                ))}
              </div>
            </div>

            <div className="property-detail__section">
              <h2>Catégorie</h2>

              <div className="property-detail__tags">
                {property.tags?.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </section>
        </section>

        <aside className="property-detail__host">
          <h2>Votre hôte</h2>

          <div className="property-detail__host-info">
            <Image
              src={property.host.picture}
              alt={property.host.name}
              width={74}
              height={74}
            />

            <div className="property-detail__host-meta">
              <span className="property-detail__host-name">{property.host.name}</span>
              <div className="property-detail__rating">★ {property.rating_avg}</div>
            </div>
          </div>

          <div className="property-detail__host-actions">
            <button type="button">Contacter l’hôte</button>
            <button type="button">Envoyer un message</button>
          </div>
        </aside>
      </div>
    </main>
  );
}
