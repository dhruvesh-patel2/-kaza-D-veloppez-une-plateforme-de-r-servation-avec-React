// Import du style de la page ajout propriété
import "../../styles/add-property.css";
// Import du formulaire
import AddPropertyForm from "../../components/AddPropertyForm";
// Page ajout propriété
export default function AddPropertyPage() {
  return (
    <main className="add-property-page">
      <AddPropertyForm />
    </main>
  );
}