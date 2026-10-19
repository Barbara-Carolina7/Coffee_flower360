
import { useState } from "react";
import {
  signIn,
  fetchAuthSession,
  signOut,
} from "aws-amplify/auth";
import { useNavigate } from "react-router-dom";

function LoginColaborador() {
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
          `Cognito requiere un paso adicional: ${
            resultado.nextStep?.signInStep || "revisa tu cuenta"
          }`
        );
        return;
      }

      const sesion = await fetchAuthSession();
      const token = sesion.tokens?.idToken;

      if (!token) {
        throw new Error("No se obtuvo el token de identidad de Cognito.");
      }

      const grupos = token.payload["cognito:groups"] || [];
      const esColaborador =
        Array.isArray(grupos) &&
        grupos.some((grupo) => grupo.toLowerCase() === "colaborador");

      if (!esColaborador) {
        await signOut();
        setMensaje("Tu cuenta no tiene permisos de colaborador.");
        return;
      }

      navigate("/");
    } catch (error) {
      console.error("Error Cognito:", error);
      setMensaje(error.message || "Error al iniciar sesión");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">☕ 🌸</div>

        <h1>Bienvenido a Coffee Flower</h1>
        <p>Inicio de sesión Colaborador</p>

        <form onSubmit={iniciarSesion}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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

export default LoginColaborador;
