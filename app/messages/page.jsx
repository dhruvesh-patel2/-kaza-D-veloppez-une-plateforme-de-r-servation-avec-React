// Import du style de la page messagerie
import "../../styles/messages.css";
// Import du composant messagerie
import MessageThread from "../../components/MessageThread";
// Page messagerie
export default function MessagesPage() {
  return (
    <main className="messages-page">
      {/* Bouton retour */}
      <a href="/" className="messages-page__back">
        ← Retour
      </a>
      {/* Conversation */}
      <MessageThread />
    </main>
  );
}