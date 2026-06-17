import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "./FavoriteButton";
// Composant carte logement
// Reçoit les données d’un logement grâce à la prop "property"
export default function PropertyCard({ property }) {
  return (
    <article className="property-card">
      {/* Lien vers la page détail du logement */}
      <Link
        href={`/properties/${property.id}`}
        className="property-card__link"
      >
        {/* Image du logement */}
        <div className="property-card__image">
          <Image
            src={property.cover}
            alt={property.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="property-card__content">
          <h2>
            {property.title}
          </h2>
          {/* Localisation */}
          <p>
            {property.location}
          </p>
          {/* Prix */}
          <strong>
            {property.price_per_night}€
            <span>
              {" "}par nuit
            </span>
          </strong>
        </div>
      </Link>
      {/* Bouton favoris */}
      <FavoriteButton propertyId={property.id} />

    </article>
  );
}