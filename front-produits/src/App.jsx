import { useState, useEffect } from 'react'
import ProductList from './components/ProductList'
import ProductForm from './components/ProductForm'
import Modal from './components/Modal'
import { getProduits, createProduit, updateProduit, deleteProduit } from './services/api'

export default function App() {
  const [produits, setProduits]           = useState([])
  const [produitEdite, setProduitEdite]   = useState(null)   // produit en cours de modification
  const [modalOuverte, setModalOuverte]   = useState(false)
  const [chargement, setChargement]       = useState(true)
  const [erreur, setErreur]               = useState(null)

  // Chargement initial des produits
  useEffect(() => {
    chargerProduits()
  }, [])

  async function chargerProduits() {
    try {
      setChargement(true)
      const data = await getProduits()
      setProduits(data)
    } catch {
      setErreur('Impossible de charger les produits. Vérifiez que l\'API est démarrée.')
    } finally {
      setChargement(false)
    }
  }

  // Ouvrir le formulaire pour ajouter
  function ouvrirAjout() {
    setProduitEdite(null)
    setModalOuverte(true)
  }

  // Ouvrir le formulaire pour modifier
  function ouvrirModification(produit) {
    setProduitEdite(produit)
    setModalOuverte(true)
  }

  function fermerModal() {
    setModalOuverte(false)
    setProduitEdite(null)
  }

  // Soumission du formulaire (ajout ou modification)
  async function handleSubmit(data) {
    if (produitEdite) {
      await updateProduit(produitEdite._id, data)
    } else {
      await createProduit(data)
    }
    fermerModal()
    chargerProduits()
  }

  // Suppression d'un produit
  async function handleDelete(id) {
    if (!window.confirm('Supprimer ce produit ?')) return
    await deleteProduit(id)
    chargerProduits()
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Gestion des Produits</h1>
        <button className="btn btn-primary" onClick={ouvrirAjout}>
          + Nouveau produit
        </button>
      </header>

      <main className="main">
        {chargement && <p className="info">Chargement...</p>}
        {erreur    && <p className="erreur">{erreur}</p>}
        {!chargement && !erreur && (
          <ProductList
            produits={produits}
            onEdit={ouvrirModification}
            onDelete={handleDelete}
          />
        )}
      </main>

      {modalOuverte && (
        <Modal
          titre={produitEdite ? 'Modifier le produit' : 'Nouveau produit'}
          onClose={fermerModal}
        >
          <ProductForm
            produit={produitEdite}
            onSubmit={handleSubmit}
          />
        </Modal>
      )}
    </div>
  )
}
