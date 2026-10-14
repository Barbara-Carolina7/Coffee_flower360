import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        ☕ <span>Coffee Flower</span> 🌸
      </div>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/categories">Categorías</Link>
        <Link to="/cart">🛒 Carrito</Link>
        <Link to="/login">👤 Iniciar sesión</Link>
      </div>
    </nav>
  );
}

export default Navbar;