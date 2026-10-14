import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginCliente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setMensaje("");
    setCargando(true);

    try {
      // Por ahora el login está preparado para conectarse
      // posteriormente al endpoint de autenticación del BFF.

      if (!email || !password) {
        throw new Error("Debes ingresar correo y contraseña.");
      }

      setMensaje("Datos ingresados correctamente. ☕🌸");

      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Error de inicio de sesión:", error);

      setMensaje(
        error.message || "No se pudo iniciar sesión."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">
          ☕🌸
        </div>

        <h1>Bienvenido a Coffee Flower</h1>

        <p>Inicio de sesión Cliente</p>

        <form onSubmit={iniciarSesion}>

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />

          <label>
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={cargando}
          >
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>

        </form>

        {mensaje && (
          <p className="login-message">
            {mensaje}
          </p>
        )}

      </div>
    </div>
  );
}

export default LoginCliente;