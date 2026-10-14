
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  fetchAuthSession,
  signOut,
} from "aws-amplify/auth";

function Navbar() {
  const [usuario, setUsuario] = useState(null);
  const [rol, setRol] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let activo = true;

    async function revisarSesion() {
      try {
        const usuarioActual = await getCurrentUser();
        const sesion = await fetchAuthSession();

        const grupos =
          sesion.tokens?.idToken?.payload?.["cognito:groups"] || [];

        let rolActual = "Usuario";

        if (grupos.includes("Admin")) {
          rolActual = "Administrador";
        } else if (grupos.includes("Colaborador")) {
          rolActual = "Colaborador";
        } else if (grupos.includes("Cliente")) {
          rolActual = "Cliente";
        }

        if (activo) {
          setUsuario(usuarioActual);
          setRol(rolActual);
        }
      } catch {
        if (activo) {
          setUsuario(null);
          setRol("");
        }
      }
    }

    revisarSesion();

    return () => {
      activo = false;
    };
  }, [location.pathname]);

  const cerrarSesion = async () => {
    setCargando(true);

    try {
      await signOut();
      setUsuario(null);
      setRol("");
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión: " + error.message);
    } finally {
      setCargando(false);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        ☕ <span>Coffee Flower</span> 🌸
      </Link>

      <div className="navbar-links">
        <Link to="/">Inicio</Link>
        <Link to="/products">Productos</Link>
        <Link to="/categories">Categorías</Link>
        <Link to="/cart">🛒 Carrito</Link>

        {usuario ? (
          <>
            <span className="navbar-user">
              👤 {rol}
            </span>

            <button
              type="button"
              className="navbar-logout"
              onClick={cerrarSesion}
              disabled={cargando}
            >
              {cargando ? "Cerrando..." : "↪ Cerrar sesión"}
            </button>
          </>
        ) : (
          <Link to="/login">👤 Iniciar sesión</Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
