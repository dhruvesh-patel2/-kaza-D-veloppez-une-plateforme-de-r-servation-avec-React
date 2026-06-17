import "./globals.css";
import "../styles/header.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FavoritesProvider } from "../lib/favorites-context";

export const metadata = {
  title: "Kasa - Location de logements uniques",
  description:
    "Kasa vous permet de découvrir, réserver et gérer des logements uniques partout en France.",
};
export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <FavoritesProvider>
          <Header />
          {children}
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}