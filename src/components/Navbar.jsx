
const cerrarSesion = async () => {
  try {
    const clientId = "51k7vee96g6rc6bfiq3f2q9ocr";
    const dominio =
      "https://us-east-1fw8m072zh.auth.us-east-1.amazoncognito.com";

    // Usa exactamente una URL registrada en Cognito
    const logoutUri =
      window.location.hostname === "localhost"
        ? "http://localhost:5173"
        : "https://coffee-flower360.vercel.app/";

    await auth.removeUser();

    const logoutUrl =
      `${dominio}/logout?client_id=${clientId}` +
      `&logout_uri=${encodeURIComponent(logoutUri)}`;

    window.location.assign(logoutUrl);
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    alert("No se pudo cerrar sesión. Revisa la consola.");
  }
};
