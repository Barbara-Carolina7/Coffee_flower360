
import { fetchAuthSession } from "aws-amplify/auth";

const API_URL = import.meta.env.VITE_API_URL;

export async function obtenerProductos() {
  if (!API_URL) {
    throw new Error("Falta configurar VITE_API_URL en .env");
  }

  // Obtener la sesión y el token de Cognito
  const sesion = await fetchAuthSession();
  const token = sesion.tokens?.accessToken?.toString();

  if (!token) {
    throw new Error("Debes iniciar sesión para consultar los productos.");
  }

  const respuesta = await fetch(
    `${API_URL.replace(/\/+$/, "")}/api/productos`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
  );

  if (!respuesta.ok) {
    throw new Error(
      `Error al consultar productos: HTTP ${respuesta.status}`
    );
  }

  const datos = await respuesta.json();

  const lista = Array.isArray(datos)
    ? datos
    : datos.productos ?? datos.content ?? datos.data;

  if (!Array.isArray(lista)) {
    throw new Error("La API no devolvió una lista de productos");
  }

  return lista.map((producto) => ({
    ...producto,
    id: producto.id ?? producto.idProducto,
    nombre: producto.nombre ?? producto.nombreProducto ?? producto.name,
    descripcion: producto.descripcion ?? producto.description ?? "",
    precio: producto.precio ?? producto.price ?? 0,
    categoria:
      typeof producto.categoria === "object"
        ? producto.categoria?.nombre ?? ""
        : producto.categoria ?? producto.category ?? "",
    imagen:
      producto.imagen ?? producto.urlImagen ?? producto.image ?? "",
  }));
}
