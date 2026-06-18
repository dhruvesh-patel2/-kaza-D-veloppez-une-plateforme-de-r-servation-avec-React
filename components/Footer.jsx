// Import du composant Link de Next.js
import Link from "next/link";
import Image from "next/image";
// Import du CSS du footer
import "../styles/footer.css";

export default function Footer() {
  return (
    // Footer principal
    <footer className="footer">

      {/* Conteneur du footer */}
      <div className="footer__container">

        {/* Logo du footer */}
        <Link
          href="/"
          className="footer__logo"
          aria-label="Retour à l’accueil"
        >
         <Image
  src="/img/logo-responsive.png"
  alt=""
  aria-hidden="true"
  width={34}
  height={34}
/>
        </Link>

        {/* Copyright */}
        <p className="footer__copyright">
          © 2020 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}
