
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  fetchAuthSession,
} from "aws-amplify/auth";

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
      const resultado = await signIn({
        username: email.trim(),
        password,
      });

      if (!resultado.isSignedIn) {
        setMensaje(
          "Debes completar otro paso de autenticación: " +
            (resultado.nextStep?.signInStep || "revisa tu cuenta")
        );
        return;
      }

      const sesion = await fetchAuthSession();

      const grupos =
        sesion.tokens?.accessToken?.payload?.["cognito:groups"] || [];

      if (grupos.includes("Admin")) {
        navigate("/dashboard", { replace: true });
      } else if (grupos.includes("Colaborador")) {
        navigate("/colaborador", { replace: true });
      } else if (grupos.includes("Cliente")) {
        navigate("/", { replace: true });
      } else {
        setMensaje(
          "Inicio de sesión correcto, pero tu usuario no tiene un grupo reconocido."
        );
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);

      setMensaje(
        error.message ||
          "No se pudo iniciar sesión. Revisa tus credenciales."
      );
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">☕🌸</div>

        <h1>Bienvenido a Coffee Flower</h1>
        <p>Inicia sesión en tu cuenta</p>

        <form onSubmit={iniciarSesion}>
          <label>Correo electrónico</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            autoComplete="username"
            required
          />

          <label>Contraseña</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa tu contraseña"
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={cargando}>
            {cargando ? "Ingresando..." : "Iniciar sesión"}
          </button>
        </form>

        {mensaje && (
          <p className="login-message" role="status">
            {mensaje}
          </p>
        )}
      </div>
    </div>
  );
}

export default LoginCliente;
