import { useState } from 'react'

const CHAMPS_VIDES = { nom: '', description: '', prix: '', stock: '', categorie: '', image: '' }

export default function ProductForm({ produit, onSubmit }) {
  const [form, setForm] = useState(produit || CHAMPS_VIDES)

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    onSubmit({
      ...form,
      prix: parseFloat(form.prix),
      stock: parseInt(form.stock)
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Nom</label>
        <input name="nom" value={form.nom} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} required />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Prix (€)</label>
          <input name="prix" type="number" min="0" step="0.01" value={form.prix} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Stock</label>
          <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} required />
        </div>
      </div>
      <div className="form-group">
        <label>Catégorie</label>
        <input name="categorie" value={form.categorie} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <label>Image (URL)</label>
        <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." />
      </div>
      <button type="submit" className="btn btn-primary">
        {produit ? 'Enregistrer les modifications' : 'Ajouter le produit'}
      </button>
    </form>
  )
}
