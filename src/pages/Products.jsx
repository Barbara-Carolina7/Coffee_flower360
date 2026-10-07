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

    localStorage.setItem(
      "carrito",
      JSON.stringify(carritoActual)
    );

    setMensaje(`${producto.nombre} agregado al carrito ☕🛒`);

    setTimeout(() => {
      setMensaje("");
    }, 2000);
  };

  if (cargando) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Productos</h1>

      {mensaje && (
        <p>
          {mensaje}
        </p>
      )}

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div>
          {productos.map((producto) => (
            <div key={producto.id}>
              <h2>{producto.nombre}</h2>

              <p>{producto.descripcion}</p>

              <p>
                ${Number(producto.precio).toLocaleString("es-CL")}
              </p>

              <p>
                Stock: {producto.stock}
              </p>

              <button
                onClick={() => agregarAlCarrito(producto)}
                disabled={producto.stock <= 0}
              >
                {producto.stock <= 0
                  ? "Sin stock"
                  : "Agregar al carrito 🛒"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;