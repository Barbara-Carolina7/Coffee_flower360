
import { useEffect, useState } from "react";
import { obtenerProductos } from "../services/api";

function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let activo = true;

    const cargarProductos = async () => {
      try {
        setCargando(true);
        setError("");

        const datos = await obtenerProductos();

        if (activo) {
          // Acepta una lista directa o una lista dentro de una propiedad.
          const lista = Array.isArray(datos)
            ? datos
            : datos.productos ?? datos.content ?? [];

          setProductos(lista);
        }
      } catch (err) {
        if (activo) {
          setError(err.message || "No se pudieron cargar los productos.");
        }
      } finally {
        if (activo) {
          setCargando(false);
        }
      }
    };

    cargarProductos();

    return () => {
      activo = false;
    };
  }, []);

  return (
    <main style={{ padding: "24px" }}>
      <h1>Panel de administración de Coffee Flower</h1>
      <p>Gestión de productos e inventario.</p>

      <h2>Productos registrados</h2>

      {cargando && <p>Cargando productos...</p>}

      {error && (
        <div role="alert" style={{ color: "red", marginBottom: "16px" }}>
          Error al cargar productos: {error}
        </div>
      )}

      {!cargando && !error && productos.length === 0 && (
        <p>No se encontraron productos o la API devolvió una lista vacía.</p>
      )}

      {!cargando && productos.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              textAlign: "left",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                  ID
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                  Nombre
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                  Precio
                </th>
                <th style={{ padding: "12px", borderBottom: "1px solid #ccc" }}>
                  Stock
                </th>
              </tr>
            </thead>

            <tbody>
              {productos.map((producto, indice) => (
                <tr key={producto.id ?? producto.idProducto ?? indice}>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                    {producto.id ?? producto.idProducto ?? "—"}
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                    {producto.nombre ?? producto.nombreProducto ?? "Sin nombre"}
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                    {producto.precio != null
                      ? `$${Number(producto.precio).toLocaleString("es-CL")}`
                      : "—"}
                  </td>
                  <td style={{ padding: "12px", borderBottom: "1px solid #eee" }}>
                    {producto.stock ?? producto.cantidadStock ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}

export default Dashboard;
