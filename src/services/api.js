
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerProductos = async () => {
  if (!API_URL) {
    throw new Error(
      "Falta configurar VITE_API_URL en las variables de entorno."
    );
  }

  const respuesta = await fetch(
    `${API_URL.replace(/\/$/, "")}/api/productos`
  );

  if (!respuesta.ok) {
    throw new Error(`Error del servidor: ${respuesta.status}`);
  }

  return respuesta.json();
};
