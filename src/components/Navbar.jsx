
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "react-oidc-context";
import "./Navbar.css";

function Navbar() {
  const auth = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuAbierto, setMenuAbierto] = useState(false);

  const usuarioAutenticado = auth.isAuthenticated;
  const grupos = auth.user?.profile?.["cognito:groups"] || [];

  const esAdmin = grupos.includes("Admin");
  const esColaborador = grupos.includes("Colaborador");

  // Diagnóstico temporal de Cognito.
  console.log("Autenticado:", auth.isAuthenticated);
  console.log("Cargando autenticación:", auth.isLoading);
  console.log("Usuario Cognito:", auth.user);
  console.log("Error de autenticación:", auth.error);

  const cerrarMenu = () => setMenuAbierto(false);

  const cerrarSesion = async () => {
    const clientId = "51k7vee96g6rc6bfiq3f2q9ocr";

    const dominio =
      "https://us-east-1fw8m072zh.auth.us-east-1.amazoncognito.com";

    const logoutUri = `${window.location.origin}/`;

    try {
      // Elimina la sesión guardada en la aplicación.
      await auth.removeUser();

      // Redirige a Cognito para cerrar la sesión alojada.
      const logoutUrl =
        `${dominio}/logout` +
        `?client_id=${encodeURIComponent(clientId)}` +
        `&logout_uri=${encodeURIComponent(logoutUri)}`;

      window.location.assign(logoutUrl);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("No se pudo cerrar sesión. Revisa la consola del navegador.");
    }
  };

  const enlaceActivo = (ruta) =>
    location.pathname === ruta
      ? "navbar-link activo"
      : "navbar-link";

  return (
    <header className="navbar">
      <div className="navbar-contenido">
        <Link
          to="/"
          className="navbar-logo"
          onClick={cerrarMenu}
        >
          <span className="navbar-logo-icono">☕</span>
          <span>Coffee Flower</span>
        </Link>

        <button
          type="button"
          className="navbar-menu-boton"
          onClick={() => setMenuAbierto(!menuAbierto)}
          aria-label="Abrir o cerrar menú"
          aria-expanded={menuAbierto}
        >
          ☰
        </button>

        <nav
          className={`navbar-menu ${menuAbierto ? "abierto" : ""}`}
        >
          <Link
            to="/"
            className={enlaceActivo("/")}
            onClick={cerrarMenu}
          >
            Inicio
          </Link>

          <Link
            to="/products"
            className={enlaceActivo("/products")}
            onClick={cerrarMenu}
          >
            Productos
          </Link>

          <Link
            to="/categories"
            className={enlaceActivo("/categories")}
            onClick={cerrarMenu}
          >
            Categorías
          </Link>

          <Link
            to="/cart"
            className={enlaceActivo("/cart")}
            onClick={cerrarMenu}
          >
            Carrito
          </Link>

          {usuarioAutenticado ? (
            <>
              {esAdmin && (
                <Link
                  to="/dashboard"
                  className={enlaceActivo("/dashboard")}
                  onClick={cerrarMenu}
                >
                  Administración
                </Link>
              )}

              {esColaborador && (
                <Link
                  to="/colaborador"
                  className={enlaceActivo("/colaborador")}
                  onClick={cerrarMenu}
                >
                  Colaborador
                </Link>
              )}

              <Link
                to="/orders"
                className={enlaceActivo("/orders")}
                onClick={cerrarMenu}
              >
                Mis pedidos
              </Link>

              <button
                type="button"
                className="navbar-boton navbar-boton-secundario"
                onClick={() => {
                  cerrarMenu();
                  cerrarSesion();
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <button
              type="button"
              className="navbar-boton"
              onClick={() => {
                cerrarMenu();
                navigate("/login");
              }}
            >
              Iniciar sesión
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
