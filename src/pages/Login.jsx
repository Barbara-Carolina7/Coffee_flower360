import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login-container">
      <div className="login-card">

        <div className="login-icon">
          ☕ 🌸
        </div>

        <h1>Bienvenido a Coffee Flower</h1>

        <p>Selecciona cómo deseas ingresar</p>

        <div className="login-options">

          <Link to="/login-cliente" className="login-option">
            <span>👤</span>
            <div>
              <strong>Cliente</strong>
              <small>Ingresar como cliente</small>
            </div>
          </Link>

          <Link to="/login-colaborador" className="login-option">
            <span>👨‍💼</span>
            <div>
              <strong>Colaborador</strong>
              <small>Ingresar como colaborador</small>
            </div>
          </Link>

          <Link to="/login-admin" className="login-option">
            <span>🔐</span>
            <div>
              <strong>Administrador</strong>
              <small>Ingresar como administrador</small>
            </div>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default Login;