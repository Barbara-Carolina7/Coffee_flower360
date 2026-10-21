
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function LoginCliente() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Esperar a que Cognito termine de cargar la sesión
    if (auth.isLoading || !auth.isAuthenticated || !auth.user) {
      return;
    }

    // Obtener los datos del usuario autenticado
    const perfil = auth.user.profile;
    const grupos = perfil["cognito:groups"] || [];

    // Diagnóstico temporal en la consola del navegador
    console.log("Perfil Cognito:", perfil);
    console.log("Grupos Cognito:", grupos);

    // Redirigir según el grupo asignado en Cognito
    if (grupos.includes("Admin")) {
      navigate("/dashboard", { replace: true });
    } else if (grupos.includes("Colaborador")) {
      navigate("/colaborador", { replace: true });
    } else if (grupos.includes("Cliente")) {
      navigate("/", { replace: true });
    } else {
      console.error(
        "El usuario no tiene un grupo de Cognito reconocido.",
        perfil
      );
    }
  }, [
    auth.isLoading,
    auth.isAuthenticated,
    auth.user,
    navigate,
  ]);

  // Mientras se establece la conexión
  if (auth.isLoading) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Conectando con Cognito...</h1>
          <p>Espera un momento, por favor.</p>
        </div>
      </div>
    );
  }

  // Si Cognito devuelve un error
  if (auth.error) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">☕🌸</div>
          <h1>Error de autenticación</h1>
          <p>{auth.error.message}</p>

          <button
            type="button"
            onClick={() => auth.signinRedirect()}
          >
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  // Usuario autenticado: se está verificando su grupo
  if (auth.isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-card">
          <div className="login-icon">☕🌸</div>
          <h1>Sesión iniciada</h1>
          <p>Verificando tu tipo de usuario...</p>
        </div>
      </div>
    );
  }

  // Pantalla de inicio de sesión
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">☕🌸</div>

        <h1>Bienvenido a Coffee Flower</h1>

        <p>
          Inicia sesión de forma segura con Amazon Cognito.
        </p>

        <button
          type="button"
          onClick={() => auth.signinRedirect()}
          disabled={auth.isLoading}
        >
          Iniciar sesión con Cognito
        </button>
      </div>
    </div>
  );
}

export default LoginCliente;
