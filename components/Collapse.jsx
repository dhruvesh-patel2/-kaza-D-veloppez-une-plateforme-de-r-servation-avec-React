"use client";
import { useState } from "react";
// Composant collapse réutilisable
export default function Collapse({ title, children }) {
  // État ouvert / fermé
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`collapse ${isOpen ? "collapse--open" : ""}`}>
      {/* Bouton du collapse */}
      <button
        type="button"
        className="collapse__header"
        onClick={() => setIsOpen((previousState) => !previousState)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span className="collapse__icon">
          ↓
        </span>
      </button>
      {/* Contenu affiché avec animation */}
      <div className="collapse__content">
        <div className="collapse__inner">
          {children}
        </div>
      </div>
    </div>
  );
}