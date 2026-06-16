/* eslint-disable @next/next/no-img-element */
import { render, screen } from "@testing-library/react";

// Import des méthodes supplémentaires Jest DOM
import "@testing-library/jest-dom";

// Import du composant Carousel à tester
import Carousel from "../components/Carousel";

// Simulation du composant next/image pour Jest
// Cela évite les erreurs pendant les tests
jest.mock("next/image", () => {
  return function MockImage({ src, alt }) {
    return <img src={src} alt={alt} />;
  };
});

// Groupe de tests du composant Carousel
describe("Carousel", () => {

  // Test : les flèches doivent apparaître
  // lorsqu’il y a plusieurs images
  test("affiche les flèches quand il y a plusieurs images", () => {

    // Affichage du composant avec 2 images
    render(
      <Carousel
        pictures={[
          "/image-1.jpg",
          "/image-2.jpg"
        ]}
        title="Logement test"
      />
    );

    // Vérifie que le bouton image précédente existe
    expect(
      screen.getByLabelText("Image précédente")
    ).toBeInTheDocument();

    // Vérifie que le bouton image suivante existe
    expect(
      screen.getByLabelText("Image suivante")
    ).toBeInTheDocument();
  });

  // Test : les flèches ne doivent pas apparaître
  // lorsqu’il y a une seule image
  test("cache les flèches quand il y a une seule image", () => {

    // Affichage du composant avec une seule image
    render(
      <Carousel
        pictures={[
          "/image-1.jpg"
        ]}
        title="Logement test"
      />
    );

    // Vérifie que le bouton image précédente n’existe pas
    expect(
      screen.queryByLabelText("Image précédente")
    ).not.toBeInTheDocument();

    // Vérifie que le bouton image suivante n’existe pas
    expect(
      screen.queryByLabelText("Image suivante")
    ).not.toBeInTheDocument();
  });
});
