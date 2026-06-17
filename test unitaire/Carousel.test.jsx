/* eslint-disable @next/next/no-img-element */

// Import des outils de test
import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";
// Import Jest DOM
import "@testing-library/jest-dom";
// Import du carousel
import Carousel from "../components/Carousel";

// Mock next/image
jest.mock("next/image", () => {
  return function MockImage({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt}
      />
    );
  };
});
// Tests carousel
describe("Carousel", () => {
  test("affiche les flèches quand il y a plusieurs images", () => {
    render(
      <Carousel
        pictures={[
          "/image-1.jpg",
          "/image-2.jpg",
        ]}
        title="Logement test"
      />
    );

    expect(
      screen.getByLabelText("Image précédente")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Image suivante")
    ).toBeInTheDocument();
  });

  test("cache les flèches quand il y a une seule image", () => {
    render(
      <Carousel
        pictures={[
          "/image-1.jpg",
        ]}
        title="Logement test"
      />
    );

    expect(
      screen.queryByLabelText("Image précédente")
    ).not.toBeInTheDocument();

    expect(
      screen.queryByLabelText("Image suivante")
    ).not.toBeInTheDocument();
  });

  test("passe à l’image suivante au clic", () => {
    render(
      <Carousel
        pictures={[
          "/image-1.jpg",
          "/image-2.jpg",
        ]}
        title="Logement test"
      />
    );

    fireEvent.click(
      screen.getByLabelText("Image suivante")
    );

    expect(
      screen.getByAltText("Logement test")
    ).toHaveAttribute("src", "/image-2.jpg");
  });

  test("boucle vers la dernière image au clic précédent depuis la première", () => {
    render(
      <Carousel
        pictures={[
          "/image-1.jpg",
          "/image-2.jpg",
        ]}
        title="Logement test"
      />
    );

    fireEvent.click(
      screen.getByLabelText("Image précédente")
    );

    expect(
      screen.getByAltText("Logement test")
    ).toHaveAttribute("src", "/image-2.jpg");
  });

  test("change l’image active au clic sur une miniature", () => {
    render(
      <Carousel
        pictures={[
          "/image-1.jpg",
          "/image-2.jpg",
        ]}
        title="Logement test"
      />
    );

    fireEvent.click(
      screen.getByLabelText("Afficher l’image 2")
    );

    expect(
      screen.getByAltText("Logement test")
    ).toHaveAttribute("src", "/image-2.jpg");
  });
});