import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/api";

function Products() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    cargarProductos();
  }, []);

  const agregarAlCarrito = (producto) => {
    const carritoActual = JSON.parse(
      localStorage.getItem("carrito") || "[]"
    );

    const productoExistente = carritoActual.find(
      (item) => item.id === producto.id
    );

    if (productoExistente) {
      if (productoExistente.cantidad < producto.stock) {
        productoExistente.cantidad += 1;
      } else {
        setMensaje("No hay más stock disponible.");
        return;
      }
    } else {
      carritoActual.push({
        ...producto,
        cantidad: 1,
      });
    }

    localStorage.setItem("carrito", JSON.stringify(carritoActual));

    setMensaje(`${producto.nombre} agregado al carrito ☕🌸`);

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  if (cargando) {
    return (
      <main className="products-page">
        <div className="loading-box">
          <div className="loading-icon">☕</div>
          <h2>Cargando nuestros productos...</h2>
          <p>Preparando algo delicioso para ti 🌸</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="products-page">
        <div className="error-box">
          <span>☕</span>
          <h2>Ups...</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="products-page">

      <section className="products-header">
        <p className="section-subtitle">☕ Coffee Flower 🌸</p>

        <h1>Nuestros productos</h1>

        <p>
          Descubre nuestros cafés y deliciosos acompañamientos,
          preparados especialmente para ti.
        </p>
      </section>

      {mensaje && (
        <div className="cart-message">
          {mensaje}
        </div>
      )}

      {productos.length === 0 ? (
        <div className="empty-products">
          <span>☕</span>
          <h2>No hay productos disponibles</h2>
          <p>Pronto tendremos nuevas opciones para ti.</p>
        </div>
      ) : (
        <section className="products-grid">

          {productos.map((producto) => (
            <article className="product-card" key={producto.id}>

              <div className="product-image">
                ☕
              </div>

              <div className="product-content">

                <span className="product-category">
                  Coffee Flower
                </span>

                <h2>{producto.nombre}</h2>

                <p className="product-description">
                  {producto.descripcion}
                </p>

                <div className="product-info">

                  <strong>
                    ${Number(producto.precio).toLocaleString("es-CL")}
                  </strong>

                  <span>
                    Stock: {producto.stock}
                  </span>

                </div>

                <button
                  className="product-button"
                  onClick={() => agregarAlCarrito(producto)}
                  disabled={producto.stock <= 0}
                >
                  {producto.stock <= 0
                    ? "Sin stock"
                    : "Agregar al carrito 🛒"}
                </button>

              </div>

            </article>
          ))}

        </section>
      )}

    </main>
  );
}

export default Products;