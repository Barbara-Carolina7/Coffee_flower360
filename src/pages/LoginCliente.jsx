
import { useEffect } from "react";
import { useAuth } from "react-oidc-context";
import { useNavigate } from "react-router-dom";

function LoginCliente() {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isAuthenticated || !auth.user) return;

    const grupos = auth.user.profile["cognito:groups"] || [];

    if (grupos.includes("Admin")) {
      navigate("/dashboard", { replace: true });
    } else if (grupos.includes("Colaborador")) {
      navigate("/colaborador", { replace: true });
    } else if (grupos.includes("Cliente")) {
      navigate("/", { replace: true });
    }
  }, [auth.isAuthenticated, auth.user, navigate]);

  if (auth.isLoading) {
    return <div className="login-container">Conectando con Cognito...</div>;
  }

  if (auth.error) {
    return (
      <div className="login-container">
        <div className="login-card">
          <h1>Error de autenticación</h1>
          <p>{auth.error.message}</p>
          <button onClick={() => auth.signinRedirect()}>
            Intentar nuevamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">☕🌸</div>
        <h1>Bienvenido a Coffee Flower</h1>
        <p>Inicia sesión de forma segura con Amazon Cognito.</p>

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
