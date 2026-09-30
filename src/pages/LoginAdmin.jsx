import { useState } from "react";
import { signIn } from "aws-amplify/auth";

function LoginAdmin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const resultado = await signIn({
        username: email,
        password: password,
      });

      console.log("Resultado Cognito:", resultado);

      setMensaje("Inicio de sesión correcto ☕");

    } catch (error) {
      console.error("Error Cognito:", error);
      setMensaje(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">
          ☕ 🔐
        </div>

        <h1>Bienvenido a Coffee Flower</h1>

        <p>Inicio de sesión Administrador</p>

        <form onSubmit={iniciarSesion}>

          <label>Correo electrónico</label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@coffeeflower.cl"
            required
          />

          <label>Contraseña</label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <button type="submit">
            Iniciar sesión
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

export default LoginAdmin;