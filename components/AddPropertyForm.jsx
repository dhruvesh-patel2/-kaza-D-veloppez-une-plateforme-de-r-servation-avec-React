"use client";
// Import des hooks React
import { useRef, useState } from "react";
// Import du lien Next.js
import Link from "next/link";
// Import des fonctions API
import {
  createProperty,
  uploadImage,
} from "../lib/api";
// Liste des équipements disponibles
const EQUIPMENTS = [
  "Micro-Ondes",
  "Douche italienne",
  "Frigo",
  "WIFI",
  "Parking",
  "Sèche Cheveux",
  "Machine à laver",
  "Cuisine équipée",
  "Télévision",
  "Chambre Séparée",
  "Climatisation",
  "Frigo Américain",
  "Clic-clac",
  "Four",
  "Rangements",
  "Lit",
  "Bouilloire",
  "SDB",
  "Toilettes sèches",
  "Cintres",
  "Baie vitrée",
  "Hotte",
  "Baignoire",
  "Vue Parc",
];
// Liste des catégories disponibles
const DEFAULT_TAGS = [
  "Parc",
  "Night Life",
  "Culture",
  "Nature",
  "Touristique",
];
// Formulaire ajout propriété
export default function AddPropertyForm() {
  // Champs principaux
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    postalCode: "",
    location: "",
    price: "",
    hostName: "",
  });
  // Images
  const [coverUrl, setCoverUrl] = useState("");
  const [pictureUrls, setPictureUrls] = useState([]);
  const [hostPictureUrl, setHostPictureUrl] = useState("");
  // Équipements et catégories
  const [selectedEquipments, setSelectedEquipments] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  // Messages
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // Références des inputs file cachés
  const coverInputRef = useRef(null);
  const pictureInputRef = useRef(null);
  const hostPictureInputRef = useRef(null);
  // Mise à jour des champs texte
  const handleChange = (event) => {
    const {
      name,
      value,
    } = event.target;
    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };
  // Ajout / suppression équipement
  const toggleEquipment = (equipment) => {
    setSelectedEquipments((previousEquipments) =>
      previousEquipments.includes(equipment)
        ? previousEquipments.filter((item) => item !== equipment)
        : [...previousEquipments, equipment]
    );
  };
  // Ajout / suppression catégorie
  const toggleTag = (tag) => {
    setSelectedTags((previousTags) =>
      previousTags.includes(tag)
        ? previousTags.filter((item) => item !== tag)
        : [...previousTags, tag]
    );
  };
  // Ajout catégorie personnalisée
  const addCustomTag = () => {
    if (!customTag.trim()) {
      return;
    }
    if (!selectedTags.includes(customTag.trim())) {
      setSelectedTags((previousTags) => [
        ...previousTags,
        customTag.trim(),
      ]);
    }
    setCustomTag("");
  };
  // Upload image de couverture
  const handleCoverUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }
    const data = await uploadImage(file, "property-cover");

    setCoverUrl(data.url);
  };
  // Upload image logement
  const handlePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const data = await uploadImage(file, "property-picture");

    setPictureUrls((previousPictures) => [
      ...previousPictures,
      data.url,
    ]);
  };
  // Upload photo hôte
  const handleHostPictureUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    const data = await uploadImage(file, "user-picture");
    setHostPictureUrl(data.url);
  };
  // Soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsLoading(true);
    try {
      const storedUser = localStorage.getItem("kasa_user");
      const user = storedUser ? JSON.parse(storedUser) : null;
      if (!user) {
        throw new Error("Vous devez être connecté pour ajouter une propriété.");
      }
      const propertyData = {
        title: formData.title,
        description: formData.description,
        cover: coverUrl,
        location: `${formData.location} - ${formData.postalCode}`,
        price_per_night: Number(formData.price),
        host_id: user.id,
        host: {
          name: formData.hostName || user.name,
          picture: hostPictureUrl || user.picture,
        },
        pictures: pictureUrls,
        equipments: selectedEquipments,
        tags: selectedTags,
      };
      await createProperty(propertyData);
      setSuccessMessage("Propriété ajoutée avec succès.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <form
      className="add-property"
      onSubmit={handleSubmit}
    >
      <div className="add-property__top">
        <Link
          href="/"
          className="add-property__back"
        >
          ← Retour aux annonces
        </Link>
        <button
          type="submit"
          disabled={isLoading}
          className="add-property__submit"
        >
          {isLoading ? "Ajout..." : "Ajouter"}
        </button>
      </div>
      <h1>
        Ajouter une propriété
      </h1>
      {errorMessage && (
        <p className="add-property__error">
          {errorMessage}
        </p>
      )}
      {successMessage && (
        <p className="add-property__success">
          {successMessage}
        </p>
      )}
      <div className="add-property__grid">
        <section className="add-property__card add-property__card--large">
          <label>
            Titre de la propriété
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Ex : Appartement cosy au cœur de paris"
              required
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Décrivez votre propriété en détail..."
              required
            />
          </label>
          <label>
            Prix par nuit
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Code postal
            <input
              name="postalCode"
              value={formData.postalCode}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Localisation
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </label>
        </section>
        <section className="add-property__card">
          <label>
            Image de couverture
            <div className="add-property__upload">
              <input
                value={coverUrl}
                readOnly
              />
              <button
                type="button"
                onClick={() => coverInputRef.current.click()}
              >
                +
              </button>
            </div>
          </label>
          <label>
            Image du logement
            <div className="add-property__upload">
              <input
                value={`${pictureUrls.length} image(s) ajoutée(s)`}
                readOnly
              />
              <button
                type="button"
                onClick={() => pictureInputRef.current.click()}
              >
                +
              </button>
            </div>
          </label>
          <button
            type="button"
            className="add-property__text-button"
            onClick={() => pictureInputRef.current.click()}
          >
            +Ajouter une image
          </button>

          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleCoverUpload}
          />
          <input
            ref={pictureInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handlePictureUpload}
          />
        </section>
        <section className="add-property__card">
          <label>
            Nom de l’hôte
            <input
              name="hostName"
              value={formData.hostName}
              onChange={handleChange}
            />
          </label>
          <label>
            Photo de profil
            <div className="add-property__upload">
              <input
                value={hostPictureUrl}
                readOnly
              />
              <button
                type="button"
                onClick={() => hostPictureInputRef.current.click()}
              >
                +
              </button>
            </div>
          </label>
          <button
            type="button"
            className="add-property__text-button"
            onClick={() => hostPictureInputRef.current.click()}
          >
            +Ajouter une image
          </button>
          <input
            ref={hostPictureInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleHostPictureUpload}
          />
        </section>
        <section className="add-property__card add-property__card--large">
          <h2>
            Équipements
          </h2>
          <div className="add-property__checkboxes">
            {EQUIPMENTS.map((equipment) => (
              <label key={equipment}>
                <input
                  type="checkbox"
                  checked={selectedEquipments.includes(equipment)}
                  onChange={() => toggleEquipment(equipment)}
                />
                {equipment}
              </label>
            ))}
          </div>
        </section>
        <section className="add-property__card">
          <h2>
            Catégories
          </h2>
          <div className="add-property__tags">
            {DEFAULT_TAGS.map((tag) => (
              <button
                type="button"
                key={tag}
                className={
                  selectedTags.includes(tag)
                    ? "add-property__tag add-property__tag--active"
                    : "add-property__tag"
                }
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
          <label>
            Ajouter une catégorie personnalisée
            <div className="add-property__upload">
              <input
                value={customTag}
                onChange={(event) =>
                  setCustomTag(event.target.value)
                }
                placeholder="Nouveau tag"
              />
              <button
                type="button"
                onClick={addCustomTag}
              >
                +
              </button>
            </div>
          </label>
          <button
            type="button"
            className="add-property__text-button"
            onClick={addCustomTag}
          >
            +Ajouter un tag
          </button>
        </section>
      </div>
    </form>
  );
}