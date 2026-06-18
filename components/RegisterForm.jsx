"use client";

// Import du state React
import { useState } from "react";
// Import des liens Next.js
import Link from "next/link";
// Import de la fonction API inscription
import { registerUser } from "../lib/auth";

/**
 * Formulaire d’inscription utilisateur.
 * Crée un compte client puis stocke la session dans localStorage.
 */
export default function RegisterForm() {
  // Données du formulaire
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    acceptedTerms: false,
  });
  // Message erreur affiché sous le formulaire
  const [errorMessage, setErrorMessage] = useState("");
  // État de chargement pendant la requête API
  const [isLoading, setIsLoading] = useState(false);
  // Mise à jour des champs du formulaire
  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      // Gestion spéciale pour checkbox
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };
  // Soumissiondu formulaire
  const handleSubmit = async (event) => {
    // Empêche le rechargement de page
    event.preventDefault();
    // Réinitialise les erreurs
    setErrorMessage("");
    // Vérifie les conditions générales
    if (!formData.acceptedTerms) {
      setErrorMessage(
        "Veuillez accepter les conditions générales."
      );
      return;
    }
    // Active le chargement
    setIsLoading(true);
    try {
      // Concatène prénom + nom
      const fullName = `
        ${formData.firstName}
        ${formData.lastName}
      `.trim();
      // Appel API inscription
      const data = await registerUser({
        name: fullName,
        email: formData.email,
        password: formData.password,
        role: "client",
      });
      // Sauvegarde du token utilisateur
      localStorage.setItem(
        "kasa_token",
        data.token
      );
      // Sauvegarde des informations utilisateur
      localStorage.setItem(
        "kasa_user",
        JSON.stringify(data.user)
      );
      // Redirection vers l’accueil
      window.location.href = "/";
    } catch (error) {
      // Affichage erreur API
      setErrorMessage(error.message);
    } finally {
      // Désactive le chargement
      setIsLoading(false);
    }
  };
  return (
    <form
      className="login-form"
      onSubmit={handleSubmit}
    >
      {/* Champ nom */}
      <div className="login-form__group">
        <label htmlFor="lastName">
          Nom
        </label>

        <input
          id="lastName"
          name="lastName"
          type="text"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>
      {/* Champ prénom */}
      <div className="login-form__group">
        <label htmlFor="firstName">
          Prénom
        </label>

        <input
          id="firstName"
          name="firstName"
          type="text"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Champ email */}
      <div className="login-form__group">
        <label htmlFor="email">
          Adresse email
        </label>

        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      {/* Champ mot de passe */}
      <div className="login-form__group">
        <label htmlFor="password">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {/* Conditions générales */}
      <label className="register-form__terms">
        <input
          type="checkbox"
          name="acceptedTerms"
          checked={formData.acceptedTerms}
          onChange={handleChange}
        />
        <span>
          J’accepte les{" "}
          <Link href="/">
            conditions générales d’utilisation
          </Link>
        </span>
      </label>
      {/* Message erreur */}
      {errorMessage && (
        <p className="login-form__error">
          {errorMessage}
        </p>
      )}
      {/* Bouton inscription */}
      <button
        type="submit"
        disabled={isLoading}
      >
        {
          isLoading
            ? "Inscription..."
            : "S’inscrire"
        }
      </button>
      {/* Lien connexion */}
      <p>
        Déjà membre ?{" "}
        <Link href="/login">
          Se connecter
        </Link>
      </p>

    </form>
  );
}
