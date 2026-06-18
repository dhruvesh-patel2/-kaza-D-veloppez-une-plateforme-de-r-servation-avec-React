"use client";
import { useMemo, useState } from "react";
import Image from "next/image";

/**
 * Carousel responsive des images d’un logement.
 * Permet la navigation entre plusieurs vues du bien.
 * @param {Object} props
 * @param {string[]} props.pictures
 * @param {string} props.title
 */
export default function Carousel({ pictures = [], title }) {
  // Filtre les valeurs invalides avant d’alimenter le carousel.
  const safePictures = useMemo(
    () => (Array.isArray(pictures) ? pictures.filter(Boolean) : []),
    [pictures]
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasPictures = safePictures.length > 0;
  const hasMultiplePictures = safePictures.length > 1;
  if (!hasPictures) {
    return null;
  }
  const desktopPictures = safePictures.slice(0, 5);
  const mobilePictures = safePictures;

  /** Passe à l’image précédente en bouclant sur la fin de la liste. */
  const previousPicture = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0 ? mobilePictures.length - 1 : previousIndex - 1
    );
  };

  /** Passe à l’image suivante en bouclant sur le début de la liste. */
  const nextPicture = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === mobilePictures.length - 1 ? 0 : previousIndex + 1
    );
  };
  return (
    <div className="carousel">
      <div className="carousel__mosaic">
        {desktopPictures.map((picture, index) => (
          <div
            key={`${picture}-${index}`}
            className={`carousel__mosaic-item carousel__mosaic-item--${index + 1}`}
          >
            <Image
              src={picture}
              alt={`Vue du logement ${index + 1}`}
              fill
              priority={index === 0}
              unoptimized
              sizes="(max-width: 900px) 100vw, 760px"
            />
          </div>
        ))}
      </div>
      <div className="carousel__mobile">
        <div className="carousel__main">
          <Image
            src={mobilePictures[currentIndex]}
            alt={`Vue du logement ${currentIndex + 1}`}
            fill
            priority
            unoptimized
            sizes="(max-width: 900px) 100vw, 760px"
          />
          {hasMultiplePictures && (
            <>
              <button
                type="button"
                className="carousel__arrow carousel__arrow--left"
                onClick={previousPicture}
                aria-label="Image précédente"
              >
                ←
              </button>
              <button
                type="button"
                className="carousel__arrow carousel__arrow--right"
                onClick={nextPicture}
                aria-label="Image suivante"
              >
                →
              </button>
            </>
          )}
        </div>
        {hasMultiplePictures && (
          <div className="carousel__thumbnails">
            {mobilePictures.map((picture, index) => (
              <button
                type="button"
                key={`${picture}-${index}`}
                className={`carousel__thumbnail ${
                  currentIndex === index ? "carousel__thumbnail--active" : ""
                }`}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Afficher l’image ${index + 1}`}
              >
                <Image
                  src={picture}
                  alt=""
                  aria-hidden="true"
                  fill
                  unoptimized
                  sizes="(max-width: 900px) 25vw, 160px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
