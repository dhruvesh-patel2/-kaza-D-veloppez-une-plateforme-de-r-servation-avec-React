// Import du composant Link Next.js
import Link from "next/link";
// Import du style de la page messagerie
import "../../styles/messages.css";
// Import du composant messagerie
import MessageThread from "../../components/MessageThread";
// Page messagerie
export default function MessagesPage() {
  return (
    <main className="messages-page">
      <h1 className="sr-only">
        Messagerie
      </h1>
      {/* Bouton retour */}
      <Link
        href="/"
        className="messages-page__back"
      >
        ← Retour
      </Link>
      {/* Conversation */}
      <MessageThread />
    </main>
  );
}
