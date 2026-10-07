import { useEffect, useState } from "react";

function Orders() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const carritoGuardado = JSON.parse(
      localStorage.getItem("carrito") || "[]"
    );

    setCarrito(carritoGuardado);
  }, []);

  const total = carrito.reduce(
    (suma, producto) =>
      suma + Number(producto.precio) * producto.cantidad,
    0
  );

  return (
    <main className="orders-page">

      <div className="orders-container">

        <section className="orders-header">
          <p className="section-subtitle">
            ☕ Coffee Flower 🌸
          </p>

          <h1>Confirmar pedido</h1>

          <p>
            Revisa tu pedido antes de confirmar la compra.
          </p>
        </section>

        {carrito.length === 0 ? (

          <div className="empty-products">

            <span>🛒</span>

            <h2>No tienes productos</h2>

            <p>
              Tu carrito está vacío.
            </p>

            <a
              href="/products"
              className="btn-primary"
              style={{ marginTop: "25px" }}
            >
              Ver productos
            </a>

          </div>

        ) : (

          <>

            <section className="order-card">

              <h2>Resumen de tu pedido</h2>

              {carrito.map((producto) => (

                <div
                  className="order-product"
                  key={producto.id}
                >

                  <div>
                    <h3>{producto.nombre}</h3>

                    <p>
                      Cantidad: {producto.cantidad}
                    </p>
                  </div>

                  <strong>
                    $
                    {(
                      Number(producto.precio) *
                      producto.cantidad
                    ).toLocaleString("es-CL")}
                  </strong>

                </div>

              ))}

              <div className="order-total">

                <span>Total</span>

                <strong>
                  $
                  {total.toLocaleString("es-CL")}
                </strong>

              </div>

            </section>

            <section className="order-card">

              <h2>Datos del pedido</h2>

              <div className="order-form">

                <label>
                  Nombre
                </label>

                <input
                  type="text"
                  placeholder="Ingresa tu nombre"
                />

                <label>
                  Correo electrónico
                </label>

                <input
                  type="email"
                  placeholder="correo@ejemplo.com"
                />

                <label>
                  Dirección de entrega
                </label>

                <input
                  type="text"
                  placeholder="Ingresa tu dirección"
                />

              </div>

            </section>

            <div className="order-actions">

              <a
                href="/cart"
                className="btn-secondary"
              >
                ← Volver al carrito
              </a>

              <button
                className="btn-primary"
                onClick={() =>
                  alert(
                    "El pedido será enviado al BFF próximamente ☕🌸"
                  )
                }
              >
                Confirmar pedido
              </button>

            </div>

          </>

        )}

      </div>

    </main>
  );
}

export default Orders;