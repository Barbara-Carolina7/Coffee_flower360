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

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Página principal */}
        <Route path="/" element={<Home />} />

        {/* Productos */}
        <Route path="/products" element={<Products />} />

        {/* Categorías */}
        <Route path="/categories" element={<Categories />} />

        {/* Carrito */}
        <Route path="/cart" element={<Cart />} />

        {/* Login general */}
        <Route path="/login" element={<Login />} />

        {/* Login según tipo de usuario */}
        <Route path="/login-cliente" element={<LoginCliente />} />
        <Route path="/login-colaborador" element={<LoginColaborador />} />
        <Route path="/login-admin" element={<LoginAdmin />} />

        {/* Pedidos */}
        <Route path="/orders" element={<Orders />} />

        {/* Panel administrador */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;