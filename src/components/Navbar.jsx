
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";

function Navbar() {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const grupos = auth.user?.profile?.["cognito:groups"] || [];

  let rol = "";

  if (grupos.includes("Admin")) {
    rol = "Administrador";
  } else if (grupos.includes("Colaborador")) {
    rol = "Colaborador";
  } else if (grupos.includes("Cliente")) {
    rol = "Cliente";
  }

  useEffect(() => {
    if (
      auth.isAuthenticated &&
      auth.user &&
      location.pathname === "/login"
    ) {
      if (grupos.includes("Admin")) {
        navigate("/dashboard", { replace: true });
      } else if (grupos.includes("Colaborador")) {
        navigate("/colaborador", { replace: true });
      } else if (grupos.includes("Cliente")) {
        navigate("/", { replace: true });
      }
    }
  }, [
    auth.isAuthenticated,
    auth.user,
    location.pathname,
    navigate,
    grupos,
  ]);

  const cerrarSesion = async () => {
    try {
      await auth.signoutRedirect();
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión. Inténtalo nuevamente.");
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

        {auth.isAuthenticated ? (
          <>
            {rol && <span className="navbar-user">👤 {rol}</span>}

            <button
              type="button"
              className="navbar-logout"
              onClick={cerrarSesion}
            >
              ↪ Cerrar sesión
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
