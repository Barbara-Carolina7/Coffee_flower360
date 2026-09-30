import { useState } from "react";
import { signIn } from "aws-amplify/auth";

function LoginColaborador() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const iniciarSesion = async (e) => {
    e.preventDefault();
    setMensaje("");

    try {
      const { isSignedIn } = await signIn({
        username: email,
        password: password,
      });

      if (isSignedIn) {
        setMensaje("Inicio de sesión exitoso");
      }
    } catch (error) {
      console.error(error);
      setMensaje(error.message || "Error al iniciar sesión");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-icon">☕ 🌸</div>

        <h1>Bienvenido a Coffee Flower</h1>

        <p>Inicio de sesión Colaborador</p>

        <form onSubmit={iniciarSesion}>
          <label>Correo electrónico</label>

          <input
            type="email"
            placeholder="correo@ejemplo.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Contraseña</label>

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Iniciar sesión
          </button>
        </form>

        {mensaje && (
          <div className="login-message">
            {mensaje}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginColaborador;