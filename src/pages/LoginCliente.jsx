
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  fetchAuthSession,
  confirmSignIn,
} from "aws-amplify/auth";

function LoginCliente() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nuevaPassword, setNuevaPassword] = useState("");
  const [requiereNuevaPassword, setRequiereNuevaPassword] =
    useState(false);
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  const redirigirPorRol = async () => {
    const sesion = await fetchAuthSession();

    const grupos =
      sesion.tokens?.idToken?.payload?.["cognito:groups"] ||
      sesion.tokens?.accessToken?.payload?.["cognito:groups"] ||
      [];

    if (grupos.includes("Admin")) {
      navigate("/dashboard", { replace: true });
    } else if (grupos.includes("Colaborador")) {
      navigate("/colaborador", { replace: true });
    } else if (grupos.includes("Cliente")) {
      navigate("/", { replace: true });
    } else {
      setMensaje(
        "Tu usuario inició sesión, pero no tiene un grupo reconocido en Cognito."
      );
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

      if (
        resultado.nextStep?.signInStep ===
        "CONFIRM_SIGN_IN_WITH_NEW_PASSWORD_REQUIRED"
      ) {
        setRequiereNuevaPassword(true);
        setMensaje("Debes crear una contraseña nueva para continuar.");
        return;
      }

      if (!resultado.isSignedIn) {
        setMensaje(
          "Debes completar otro paso de autenticación: " +
            (resultado.nextStep?.signInStep || "revisa tu cuenta")
        );
        return;
      }

      await redirigirPorRol();
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
    setCargando(true);

    try {
      const resultado = await confirmSignIn({
        challengeResponse: nuevaPassword,
      });

      if (!resultado.isSignedIn) {
        setMensaje(
          "Autenticación pendiente: " +
            (resultado.nextStep?.signInStep || "intenta nuevamente")
        );
        return;
      }

      setRequiereNuevaPassword(false);
      await redirigirPorRol();
    } catch (error) {
      console.error("Error al cambiar contraseña:", error);
      setMensaje(error.message || "No se pudo cambiar la contraseña.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">☕🌸</div>

        <h1>Bienvenido a Coffee Flower</h1>

        {requiereNuevaPassword ? (
          <>
            <p>Crea una contraseña nueva para continuar.</p>

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
          </>
        ) : (
          <>
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
          </>
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
