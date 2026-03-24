import ProductCard from './ProductCard'

export default function ProductList({ produits, onEdit, onDelete }) {
  if (produits.length === 0) {
    return (
      <div className="empty">
        <p>Aucun produit disponible. Ajoutez votre premier produit !</p>
      </div>
    )
  }

  return (
    <div className="grid">
      {produits.map((produit) => (
        <ProductCard
          key={produit._id}
          produit={produit}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
