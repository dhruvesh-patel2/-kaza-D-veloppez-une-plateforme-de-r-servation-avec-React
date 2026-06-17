import Link from "next/link";
import "../styles/not-found.css";
export default function NotFound() {
  return (
    <main className="not-found">
      <section className="not-found__content">
        <h1>404</h1>
        <p>
          Il semble que la page que vous cherchez ait pris des vacances... ou n’ait jamais existé.
        </p>
        <div className="not-found__actions">
          <Link href="/">Accueil</Link>
          <Link href="/">Logements</Link>
        </div>
      </section>
    </main>
  );
}