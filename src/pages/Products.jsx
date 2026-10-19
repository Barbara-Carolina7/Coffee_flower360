
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { obtenerProductos } from "../services/api";
import "../styles/global.css";

function normalizarCategoria(valor) {
  return (valor || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase();
}

function Products() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const categoria = searchParams.get("categoria");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError("No fue posible cargar los productos.");
      } finally {
        setCargando(false);
      }
    }

    cargarProductos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    if (!categoria) return true;

    return (
      normalizarCategoria(producto.categoria) ===
      normalizarCategoria(categoria)
    );
  });

  function agregarAlCarrito(producto) {
    const carrito = JSON.parse(localStorage.getItem("carrito") || "[]");
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
      existente.cantidad = (existente.cantidad || 1) + 1;
    } else {
      carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito`);
  }

  if (cargando) {
    return (
      <main className="products-page">
        <p>Cargando productos...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <p>{error}</p>
      </main>
    );
  }

  return (
    <main className="products-page">
      <header className="products-header">
        <p className="section-subtitle">Nuestro catálogo</p>

        <h1>{categoria || "Todos nuestros productos"}</h1>

        <p>
          {categoria
            ? `Descubre nuestra selección de ${categoria.toLowerCase()}.`
            : "Encuentra cafés y pastelería para disfrutar."}
        </p>

        {categoria && (
          <Link to="/products" className="btn-secondary">
            Ver todos los productos
          </Link>
        )}
      </header>

      {productosFiltrados.length === 0 ? (
        <p>No hay productos disponibles en esta categoría.</p>
      ) : (
        <section className="products-grid">
          {productosFiltrados.map((producto) => (
            <ProductCard
              key={producto.id}
              producto={producto}
              onAgregar={agregarAlCarrito}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default Products;
