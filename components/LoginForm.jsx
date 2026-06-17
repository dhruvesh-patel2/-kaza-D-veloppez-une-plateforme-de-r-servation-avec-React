"use client";
// Import du state React
import { useState } from "react";
// Import des liens Next.js
import Link from "next/link";
// Import de la fonction API de connexion
import { loginUser } from "../lib/auth";
// Composant formulaire connexion
export default function LoginForm() {
  // Données du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Message d’erreur affiché à l’utilisateur
  const [errorMessage, setErrorMessage] = useState("");
  // État de chargement pendant la connexion
  const [isLoading, setIsLoading] = useState(false);
  // Met à jour les champs du formulaire
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  // Gestion de la soumission du formulaire
  const handleSubmit = async (event) => {
    // Empêche le rechargement de la page
    event.preventDefault();
    // Réinitialise l’erreur
    setErrorMessage("");
    // Active le chargement
    setIsLoading(true);
    try {
      // Appel API login
      const data = await loginUser(formData);
      // Sauvegarde du token dans le navigateur
      localStorage.setItem(
        "kasa_token",
        data.token
      );
      // Sauvegarde des infos utilisateur
      localStorage.setItem(
        "kasa_user",
        JSON.stringify(data.user)
      );
      // Redirection vers l’accueil après connexion
      window.location.href = "/";
    } catch (error) {
      // Affiche le message d’erreur
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
      {/* Message d’erreur */}
      {errorMessage && (
        <p className="login-form__error">
          {errorMessage}
        </p>
      )}
      {/* Bouton connexion */}
      <button
        type="submit"
        disabled={isLoading}
      >
        {isLoading
          ? "Connexion..."
          : "Se connecter"}
      </button>
      {/* Lien mot de passe oublié */}
      <Link href="/forgot-password">
        Mot de passe oublié
      </Link>
      {/* Lien inscription */}
      <p>
        Pas encore de compte ?{" "}
        <Link href="/register">
          Inscrivez-vous
        </Link>
      </p>
    </form>
  );
}