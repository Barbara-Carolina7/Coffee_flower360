
function ProductCard({ producto, onAgregar }) {
  return (
    <article className="product-card">
      <div className="product-card-image">
        {producto.imagen ? (
          <img src={producto.imagen} alt={producto.nombre} />
        ) : (
          <span>☕</span>
        )}
      </div>

      <div className="product-card-content">
        <h3>{producto.nombre}</h3>
        <p>{producto.descripcion || "Delicioso para disfrutar en Coffee Flower."}</p>

        <div className="product-card-footer">
          <strong>
            ${Number(producto.precio || 0).toLocaleString("es-CL")}
          </strong>

          <button
            type="button"
            onClick={() => onAgregar?.(producto)}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
