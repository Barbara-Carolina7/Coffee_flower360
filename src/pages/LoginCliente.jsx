
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signIn,
  signOut,
  fetchAuthSession,
  confirmSignIn,
  getCurrentUser,
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

  const cerrarSesion = async () => {
    setMensaje("");
    setCargando(true);

    try {
      await signOut();
      setPassword("");
      setNuevaPassword("");
      setRequiereNuevaPassword(false);
      setMensaje("Sesión cerrada correctamente. Ya puedes ingresar con otra cuenta.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      setMensaje(error.message || "No se pudo cerrar la sesión.");
    } finally {
      setCargando(false);
    }
  };

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
        "Iniciaste sesión, pero tu usuario no tiene un grupo reconocido en Cognito."
      );
    }
  };

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");
    setCargando(true);

    try {
      // Si existe una sesión, cerrarla antes de cambiar de usuario.
      try {
        await getCurrentUser();
        await signOut();
      } catch (error) {
        // Solo continuar si realmente no hay una sesión activa.
        if (
          error.name !== "UserUnAuthenticatedException" &&
          error.name !== "NotAuthorizedException"
        ) {
          throw error;
        }
      }

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
      setNuevaPassword("");
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
              <label htmlFor="nuevaPassword">
                Nueva contraseña
              </label>

              <input
                id="nuevaPassword"
                type="password"
                value={nuevaPassword}
                onChange={(e) => setNuevaPassword(e.target.value)}
                placeholder="Ingresa tu nueva contraseña"
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

        <button
          type="button"
          onClick={cerrarSesion}
          disabled={cargando}
          className="logout-button"
        >
          {cargando ? "Procesando..." : "Cerrar sesión"}
        </button>

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
