import { useState } from "react";
import { signIn, signOut, fetchAuthSession } from "aws-amplify/auth";
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
      // Iniciar sesión con Cognito
      const resultado = await signIn({
        username: email,
        password: password,
      });

      console.log("Resultado Cognito:", resultado);

      // Verificar si Cognito requiere algún paso adicional
      if (resultado.nextStep?.signInStep !== "DONE") {
        setMensaje(
          "Tu cuenta necesita completar un paso adicional de autenticación."
        );
        return;
      }

      // Obtener la sesión y los datos del usuario
      const session = await fetchAuthSession();

      const idToken = session.tokens?.idToken;

      if (!idToken) {
        throw new Error("No se pudo obtener el token de usuario.");
      }

      // Obtener los grupos de Cognito
      const grupos = idToken.payload["cognito:groups"] || [];

      console.log("Grupos del usuario:", grupos);

      // Comprobar que pertenece al grupo Cliente
      if (!grupos.includes("Cliente")) {
        await signOut();

        setMensaje(
          "Este usuario no tiene permisos para ingresar como Cliente."
        );

        return;
      }

      // Login correcto
      setMensaje("¡Inicio de sesión correcto! ☕🌸");

      // Ir al inicio
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (error) {
      console.error("Error de Cognito:", error);

      setMensaje(
        error.message || "Correo o contraseña incorrectos."
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