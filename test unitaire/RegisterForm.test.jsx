// Import des outils de test
import {
  render,
  screen,
} from "@testing-library/react";
// Import des interactions utilisateur
import userEvent from "@testing-library/user-event";
// Import Jest DOM
import "@testing-library/jest-dom";
// Import du formulaire d’inscription
import RegisterForm from "../components/RegisterForm";
// Mock de next/link pour les tests
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }) {
    return (
      <a href={href}>
        {children}
      </a>
    );
  };
});
// Mock de la fonction API register
jest.mock("../lib/auth", () => ({
  registerUser: jest.fn(() =>
    Promise.reject(
      new Error("Email déjà utilisé")
    )
  ),
}));
// Groupe de tests RegisterForm
describe("RegisterForm", () => {
  // Test affichage des champs
  test("affiche les champs du formulaire d’inscription", () => {
    render(<RegisterForm />);
    expect(
      screen.getByLabelText("Nom")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Prénom")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Adresse email")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Mot de passe")
    ).toBeInTheDocument();
  });
  // Test affichage du bouton
  test("affiche le bouton d’inscription", () => {
    render(<RegisterForm />);
    expect(
      screen.getByRole("button", {
        name: "S’inscrire",
      })
    ).toBeInTheDocument();
  });
  // Test erreur si CGU non acceptées
  test("affiche une erreur si les conditions ne sont pas acceptées", async () => {
    render(<RegisterForm />);
    // Remplissage des champs obligatoires
    await userEvent.type(
      screen.getByLabelText("Nom"),
      "Patel"
    );
    await userEvent.type(
      screen.getByLabelText("Prénom"),
      "Dhruvesh"
    );
    await userEvent.type(
      screen.getByLabelText("Adresse email"),
      "test@test.com"
    );
    await userEvent.type(
      screen.getByLabelText("Mot de passe"),
      "123456"
    );
    // Soumission sans accepter les CGU
    await userEvent.click(
      screen.getByRole("button", {
        name: "S’inscrire",
      })
    );
    // Vérifie le message d’erreur
    expect(
      await screen.findByText(
        "Veuillez accepter les conditions générales."
      )
    ).toBeInTheDocument();
  });
  // Test erreur API inscription
  test("affiche une erreur si l’inscription échoue", async () => {
    render(<RegisterForm />);
    // Remplissage du formulaire
    await userEvent.type(
      screen.getByLabelText("Nom"),
      "Patel"
    );
    await userEvent.type(
      screen.getByLabelText("Prénom"),
      "Dhruvesh"
    );
    await userEvent.type(
      screen.getByLabelText("Adresse email"),
      "test@test.com"
    );
    await userEvent.type(
      screen.getByLabelText("Mot de passe"),
      "123456"
    );
    // Accepte les conditions générales
    await userEvent.click(
      screen.getByRole("checkbox")
    );
    // Soumission du formulaire
    await userEvent.click(
      screen.getByRole("button", {
        name: "S’inscrire",
      })
    );
    // Vérifie le message erreur API
    expect(
      await screen.findByText(
        "Email déjà utilisé"
      )
    ).toBeInTheDocument();
  });
});