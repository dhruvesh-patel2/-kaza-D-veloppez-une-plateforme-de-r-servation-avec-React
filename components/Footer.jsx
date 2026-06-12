// Import du CSS du footer
import "../styles/footer.css";

export default function Footer() {
  return (
    // Footer principal
    <footer className="footer">

      {/* Conteneur du footer */}
      <div className="footer__container">

        {/* Logo du footer */}
        <a href="/" className="footer__logo">
          <img
            src="/img/logo-responsive.png"
            alt="Logo Kasa"
          />
        </a>

        {/* Copyright */}
        <p className="footer__copyright">
          © 2020 Kasa. All rights reserved
        </p>
      </div>
    </footer>
  );
}