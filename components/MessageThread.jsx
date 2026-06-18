"use client";
// Import du state React
import { useState } from "react";
// Messages affichés par défaut
const defaultMessages = [
  {
    id: 1,
    author: "Utilisateur",
    time: "11:04pm",
    text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
    type: "received",
  },
  {
    id: 2,
    author: "Vous",
    time: "11:04pm",
    text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
    type: "sent",
  },
  {
    id: 3,
    author: "Utilisateur",
    time: "11:04pm",
    text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?",
    type: "received",
  },
];
// Composant conversation
export default function MessageThread() {
  // Liste des messages
  const [messages, setMessages] = useState(defaultMessages);
  // Valeur du champ message
  const [messageValue, setMessageValue] = useState("");
  // Envoi du message
  const handleSubmit = (event) => {
    event.preventDefault();
    // Empêche l’envoi vide
    if (!messageValue.trim()) {
      return;
    }
    // Création du nouveau message
    const newMessage = {
      id: Date.now(),
      author: "Vous",
      time: "11:04pm",
      text: messageValue,
      type: "sent",
    };
    // Ajout du message à la conversation
    setMessages((previousMessages) => [
      ...previousMessages,
      newMessage,
    ]);
    // Vide le champ
    setMessageValue("");
  };
  return (
    <section className="messages-thread">
      <h2 className="sr-only">
        Conversation
      </h2>
      {/* Liste des messages */}
      <div className="messages-thread__list">
        {messages.map((message, index) => (
          <div key={message.id}>
            {/* Séparateur de date */}
            {index === 2 && (
              <div className="messages-thread__date">
                <span />
                <p>03 Septembre 2025</p>
                <span />
              </div>
            )}
            {/* Ligne message */}
            <article
              className={`message message--${message.type}`}
            >
              {/* Avatar */}
              <div className="message__avatar" />
              {/* Contenu */}
              <div className="message__content">
                <div className="message__meta">
                  <span>{message.author}</span>
                  <span>●</span>
                  <span>{message.time}</span>
                </div>

                <p className="message__bubble">
                  {message.text}
                </p>
              </div>
            </article>
          </div>
        ))}
      </div>
      {/* Formulaire d’envoi */}
      <form
        className="messages-thread__form"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Envoyer un message"
          value={messageValue}
          onChange={(event) =>
            setMessageValue(event.target.value)
          }
          aria-label="Envoyer un message"
        />

        <button
          type="submit"
          aria-label="Envoyer le message"
        >
          ↑
        </button>
      </form>
    </section>
  );
}
