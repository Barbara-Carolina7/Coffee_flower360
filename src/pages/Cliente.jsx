
import { Link } from "react-router-dom";

function Cliente() {
  return (
    <main className="cliente-container">
      <section className="cliente-card">
        <div className="cliente-icon">☕🌸</div>

        <h1>¡Bienvenido a Coffee Flower!</h1>

        <p>
          Nos alegra tenerte aquí. Descubre nuestros cafés y
          pastelería preparados con cariño.
        </p>

        <div className="cliente-actions">
          <Link to="/products" className="cliente-button">
            Ver productos
          </Link>

          <Link to="/cart" className="cliente-button">
            🛒 Mi carrito
          </Link>

          <Link to="/orders" className="cliente-button">
            📦 Mis pedidos
          </Link>
        </div>
      </section>
    </main>
  );
}

export default Cliente;
