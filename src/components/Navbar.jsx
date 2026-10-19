
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, signOut } from "aws-amplify/auth";

function Navbar() {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [cargando, setCargando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let activo = true;

    async function comprobarSesion() {
      try {
        await getCurrentUser();
        if (activo) setUsuarioAutenticado(true);
      } catch {
        if (activo) setUsuarioAutenticado(false);
      } finally {
        if (activo) setCargando(false);
      }
    }

    comprobarSesion();

    return () => {
      activo = false;
    };
  }, []);

  async function cerrarSesion() {
    try {
      await signOut();
      setUsuarioAutenticado(false);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  }

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

        {!cargando && (
          usuarioAutenticado ? (
            <button type="button" onClick={cerrarSesion}>
              Cerrar sesión
            </button>
          ) : (
            <Link to="/login">👤 Iniciar sesión</Link>
          )
        )}
      </div>
    </nav>
  );
}

export default Navbar;
