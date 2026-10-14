
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  confirmSignIn,
  fetchAuthSession,
} from "aws-amplify/auth";

function LoginCliente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [requiereCambio, setRequiereCambio] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const redirigirPorRol = async () => {
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
      setMensaje("Tu usuario no tiene un grupo reconocido.");
    }
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      const resultado = await signIn({
        username: email.trim(),
        password,
      });

      if (resultado.isSignedIn) {
        await redirigirPorRol();
      } else if (
        resultado.nextStep?.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setRequiereCambio(true);
        setMensaje("Crea una nueva contraseña para continuar.");
      } else {
        setMensaje(
          "Debes completar otro paso de autenticación: " +
            (resultado.nextStep?.signInStep || "revisa tu cuenta")
        );
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      setMensaje(error.message || "No se pudo iniciar sesión.");
    } finally {
      setCargando(false);
    }
  };

  const cambiarPassword = async (e) => {
    e.preventDefault();
    setMensaje("");

    if (nuevaPassword.length < 8) {
      setMensaje("La nueva contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setCargando(true);

    try {
      const resultado = await confirmSignIn({
        challengeResponse: nuevaPassword,
      });

      if (resultado.isSignedIn) {
        setRequiereCambio(false);
        await redirigirPorRol();
      } else {
        setMensaje(
          "Cognito requiere otro paso: " +
            (resultado.nextStep?.signInStep || "consulta al administrador")
        );
      }
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setMensaje(
        error.message ||
          "No se pudo cambiar la contraseña. Revisa los requisitos de Cognito."
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
        <p>
          {requiereCambio
            ? "Crea tu nueva contraseña"
            : "Inicia sesión en tu cuenta"}
        </p>

        {!requiereCambio ? (
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

            <label>Contraseña temporal</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />

            <button type="submit" disabled={cargando}>
              {cargando ? "Ingresando..." : "Iniciar sesión"}
            </button>
          </form>
        ) : (
          <form onSubmit={cambiarPassword}>
            <label>Nueva contraseña</label>
            <input
              type="password"
              value={nuevaPassword}
              onChange={(e) => setNuevaPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
            />

            <button type="submit" disabled={cargando}>
              {cargando ? "Guardando..." : "Cambiar contraseña"}
            </button>
          </form>
        )}

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
