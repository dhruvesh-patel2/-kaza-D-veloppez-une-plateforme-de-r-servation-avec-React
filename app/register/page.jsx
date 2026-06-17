// Import du style de la page connexion/inscription
import "../../styles/login.css";
// Import du formulaire d’inscription
import RegisterForm from "../../components/RegisterForm";
// Page inscription
export default function RegisterPage() {
  return (
    <main className="login-page">
      <section className="login-card">
        <h1>
          Rejoignez la communauté Kasa
        </h1>
        <p>
          Créez votre compte et commencez à voyager autrement : réservez des logements uniques, découvrez de nouvelles destinations et partagez vos propres lieux avec d’autres voyageurs.
        </p>
        <RegisterForm />
      </section>
    </main>
  );
}