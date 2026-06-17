// Import du style de la page connexion
import "../../styles/login.css";
// Import du formulaire de connexion
import LoginForm from "../../components/LoginForm";
// Page connexion
export default function LoginPage() {
  return (
    <main className="login-page">
      {/* Carte centrale de connexion */}
      <section className="login-card">
        {/* Titre principal */}
        <h1>
          Heureux de vous revoir
        </h1>
        {/* Texte d’introduction */}
        <p>
          Connectez-vous pour retrouver vos réservations, vos annonces et tout ce qui rend vos séjours uniques.
        </p>
        {/* Formulaire de connexion */}
        <LoginForm />
      </section>
    </main>
  );
}