// Import React Testing Library
import {
  render,
  screen,
} from "@testing-library/react";
// Import utilisateur interactions
import userEvent from "@testing-library/user-event";
// Import Jest DOM
import "@testing-library/jest-dom";
// Import du composant
import LoginForm from "../components/LoginForm";
// Mock Next.js Link
jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }) {
    return <a href={href}>{children}</a>;
  };
});
// Mock de la fonction login API
jest.mock("../lib/auth", () => ({
  loginUser: jest.fn(() =>
    Promise.reject(
      new Error("Identifiants invalides")
    )
  ),
}));
// Groupe de tests LoginForm
describe("LoginForm", () => {
  // Vérifie les champs du formulaire
  test("affiche les champs email et mot de passe", () => {
    render(<LoginForm />);
    expect(
      screen.getByLabelText("Adresse email")
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText("Mot de passe")
    ).toBeInTheDocument();
  });
  // Vérifie le bouton connexion
  test("affiche le bouton connexion", () => {
    render(<LoginForm />);
    expect(
      screen.getByRole("button")
    ).toBeInTheDocument();
  });
  // Vérifie l’affichage erreur login
  test("affiche une erreur si la connexion échoue", async () => {
    render(<LoginForm />);
    const emailInput =
      screen.getByLabelText("Adresse email");
    const passwordInput =
      screen.getByLabelText("Mot de passe");
    const button =
      screen.getByRole("button");
    await userEvent.type(
      emailInput,
      "test@test.com"
    );
    await userEvent.type(
      passwordInput,
      "123456"
    );
    await userEvent.click(button);
    expect(
      await screen.findByText(
        "Identifiants invalides"
      )
    ).toBeInTheDocument();
  });
});