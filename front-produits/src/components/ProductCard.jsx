const IMAGE_PLACEHOLDER = 'https://placehold.co/300x200?text=Produit'

export default function ProductCard({ produit, onEdit, onDelete }) {
  return (
    <div className="card">
      <img
        src={produit.image || IMAGE_PLACEHOLDER}
        alt={produit.nom}
        className="card-image"
        onError={(e) => { e.target.src = IMAGE_PLACEHOLDER }}
      />
      <div className="card-body">
        <span className="card-categorie">{produit.categorie}</span>
        <h3 className="card-titre">{produit.nom}</h3>
        <p className="card-description">{produit.description}</p>
        <div className="card-footer">
          <div className="card-infos">
            <span className="card-prix">{produit.prix} €</span>
            <span className={`card-stock ${produit.stock === 0 ? 'rupture' : ''}`}>
              {produit.stock === 0 ? 'Rupture de stock' : `Stock : ${produit.stock}`}
            </span>
          </div>
          <div className="card-actions">
            <button className="btn btn-secondary" onClick={() => onEdit(produit)}>
              Modifier
            </button>
            <button className="btn btn-danger" onClick={() => onDelete(produit._id)}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
