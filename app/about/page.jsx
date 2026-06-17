import Image from "next/image";
import "../../styles/about.css";
export default function AboutPage() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <h1>À propos</h1>
        <p>
          Chez Kasa, nous croyons que chaque voyage mérite un lieu unique où se
          sentir bien.
        </p>
        <p>
          Depuis notre création, nous mettons en relation des voyageurs en quête
          d’authenticité avec des hôtes passionnés qui aiment partager leur
          région et leurs bonnes adresses.
        </p>
      </section>
      <section className="about-banner">
        <Image
          src="/img/banner1.png"
          alt="Maison en bois entourée d’arbres"
          fill
          priority
          sizes="(max-width: 900px) 100vw, 1100px"
        />
      </section>
      <section className="about-content">
        <div className="about-content__text">
          <h2>Notre mission est simple :</h2>
          <ol>
            <li>Offrir une plateforme fiable et simple d’utilisation</li>
            <li>Proposer des hébergements variés et de qualité</li>
            <li>
              Favoriser des échanges humains et chaleureux entre hôtes et
              voyageurs
            </li>
          </ol>
        </div>
        <div className="about-content__image">
          <Image
            src="/img/banner2.png"
            alt="Chalet moderne avec grande façade vitrée"
            fill
            sizes="(max-width: 900px) 100vw, 520px"
          />
        </div>
      </section>
      <section className="about-bottom">
        <p>
          Que vous cherchiez un appartement cosy en centre-ville, une maison en
          bord de mer ou un chalet à la montagne, Kasa vous accompagne pour que
          chaque séjour devienne un souvenir inoubliable.
        </p>
      </section>
    </main>
  );
}