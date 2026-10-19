
import { Link } from "react-router-dom";

function Categories() {
  return (
    <main className="products-page">
      <header className="products-header">
        <p className="section-subtitle">Coffee Flower</p>
        <h1>Explora nuestras categorías</h1>
        <p>Encuentra tu favorito para acompañar cada momento.</p>
      </header>

      <section className="products-grid">
        <Link
          to="/products?categoria=Cafés"
          className="featured-card"
          style={{ textDecoration: "none" }}
        >
          <div className="card-icon">☕</div>
          <h3>Cafés</h3>
          <p>Americano, cappuccino, latte y más.</p>
          <strong>Ver cafés →</strong>
        </Link>

        <Link
          to="/products?categoria=Pastelería"
          className="featured-card"
          style={{ textDecoration: "none" }}
        >
          <div className="card-icon">🧁</div>
          <h3>Pastelería</h3>
          <p>Brownies, cheesecake, croissants y más.</p>
          <strong>Ver pastelería →</strong>
        </Link>
      </section>
    </main>
  );
}

export default Categories;
