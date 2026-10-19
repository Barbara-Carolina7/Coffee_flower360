
import { useState } from "react";
import { signIn, fetchAuthSession } from "aws-amplify/auth";
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
        throw new Error("No se pudo verificar la sesión de Cognito.");
      }

      const grupos = token.payload["cognito:groups"] || [];

      // Si tu User Pool utiliza grupos, validar que pertenezca a Cliente.
      if (
        grupos.length > 0 &&
        !grupos.some((grupo) => grupo.toLowerCase() === "cliente")
      ) {
        setMensaje("Tu cuenta no tiene el rol de Cliente.");
        return;
      }

      setMensaje("¡Bienvenido a Coffee Flower! ☕🌸");
      navigate("/cliente");
    } catch (error) {
      console.error("Error Cognito:", error);
      setMensaje(
        error.message || "No se pudo iniciar sesión. Revisa tus datos."
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
        <p>Inicio de sesión Cliente</p>

        <form onSubmit={iniciarSesion}>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
            autoComplete="username"
            required
          />

          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
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
