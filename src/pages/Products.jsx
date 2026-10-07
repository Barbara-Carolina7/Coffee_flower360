import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/api";

function Products() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

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

  if (cargando) {
    return <h2>Cargando productos...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Productos</h1>

      {productos.length === 0 ? (
        <p>No hay productos disponibles.</p>
      ) : (
        <div>
          {productos.map((producto) => (
            <div key={producto.id}>
              <h2>{producto.nombre}</h2>
              <p>{producto.descripcion}</p>
              <p>${producto.precio}</p>
              <p>Stock: {producto.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;