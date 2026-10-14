const API_URL = "http://localhost:8081";

export const obtenerProductos = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/api/productos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    return await respuesta.json();

  } catch (error) {
    console.error("Error obteniendo productos:", error);
    throw error;
  }
};