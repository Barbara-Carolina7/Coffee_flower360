
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";

import Login from "./pages/Login";
import LoginCliente from "./pages/LoginCliente";
import LoginColaborador from "./pages/LoginColaborador";
import LoginAdmin from "./pages/LoginAdmin";

import Orders from "./pages/Orders";
import Dashboard from "./pages/Dashboard";

// Página del cliente
import Cliente from "./pages/Cliente";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/cart" element={<Cart />} />

        {/* Inicio de sesión */}
        <Route path="/login" element={<Login />} />
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/login-colaborador" element={<LoginColaborador />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Área del cliente */}
        <Route path="/cliente" element={<Cliente />} />

        {/* Pedidos */}
        <Route path="/orders" element={<Orders />} />

        {/* Panel administrador */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
