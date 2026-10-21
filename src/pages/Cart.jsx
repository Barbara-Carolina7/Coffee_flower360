import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();

  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    cargarCarrito();
  }, []);

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(
      localStorage.getItem("carrito") || "[]"
    );

    setCarrito(carritoGuardado);
  };

  const guardarCarrito = (nuevoCarrito) => {
    localStorage.setItem(
      "carrito",
      JSON.stringify(nuevoCarrito)
    );

    setCarrito(nuevoCarrito);
  };

  const aumentarCantidad = (id) => {
    const nuevoCarrito = carrito.map((producto) => {
      if (producto.id === id) {
        if (producto.cantidad < producto.stock) {
          return {
            ...producto,
            cantidad: producto.cantidad + 1,
          };
        }
      }

      return producto;
    });

    guardarCarrito(nuevoCarrito);
  };

  const disminuirCantidad = (id) => {
    const nuevoCarrito = carrito
      .map((producto) => {
        if (producto.id === id) {
          return {
            ...producto,
            cantidad: producto.cantidad - 1,
          };
        }

        return producto;
      })
      .filter((producto) => producto.cantidad > 0);

    guardarCarrito(nuevoCarrito);
  };

  const eliminarProducto = (id) => {
    const nuevoCarrito = carrito.filter(
      (producto) => producto.id !== id
    );

    guardarCarrito(nuevoCarrito);
  };

  const vaciarCarrito = () => {
    localStorage.removeItem("carrito");
    setCarrito([]);
  };

  const total = carrito.reduce(
    (suma, producto) =>
      suma + Number(producto.precio) * producto.cantidad,
    0
  );

  return (
    <main className="cart-page">

      <div className="cart-container">

        {/* ENCABEZADO */}

        <section className="cart-header">

          <p className="section-subtitle">
            ☕ Coffee Flower 🌸
          </p>

          <h1>Tu carrito</h1>

          <p>
            Revisa tus productos antes de continuar con tu compra.
          </p>

        </section>


        {/* CARRITO VACÍO */}

        {carrito.length === 0 ? (

          <div className="empty-products">

            <span>🛒</span>

            <h2>Tu carrito está vacío</h2>

            <p>
              Agrega algunos de nuestros deliciosos productos
              para comenzar tu compra.
            </p>

            <a
              href="/products"
              className="btn-primary"
              style={{ marginTop: "25px" }}
            >
              Ver productos ☕
            </a>

          </div>

        ) : (

          <>

            {/* PRODUCTOS DEL CARRITO */}

            {carrito.map((producto) => (

              <article
                className="cart-item"
                key={producto.id}
              >

                <div className="cart-item-info">

                  <h2>{producto.nombre}</h2>

                  <p>
                    Precio unitario: $
                    {Number(producto.precio).toLocaleString(
                      "es-CL"
                    )}
                  </p>

                  <p>
                    Subtotal: $
                    {(
                      Number(producto.precio) *
                      producto.cantidad
                    ).toLocaleString("es-CL")}
                  </p>

                </div>


                {/* CANTIDAD */}

                <div className="cart-controls">

                  <button
                    onClick={() =>
                      disminuirCantidad(producto.id)
                    }
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>

                  <span className="cart-quantity">
                    {producto.cantidad}
                  </span>

                  <button
                    onClick={() =>
                      aumentarCantidad(producto.id)
                    }
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>

                </div>


                {/* ELIMINAR */}

                <button
                  onClick={() =>
                    eliminarProducto(producto.id)
                  }
                  style={{
                    border: "none",
                    background: "#fff0f7",
                    color: "#8b451f",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Eliminar
                </button>

              </article>

            ))}


            {/* RESUMEN */}

            <section className="cart-summary">

              <p className="cart-total">
                Total: $
                {total.toLocaleString("es-CL")}
              </p>


              <div className="cart-actions">

                <button
                  onClick={vaciarCarrito}
                  className="btn-secondary"
                >
                  Vaciar carrito
                </button>


                <button
                  className="btn-primary"
                  onClick={() => navigate("/orders")}
                >
                  Continuar compra
                </button>

              </div>

            </section>

          </>

        )}

      </div>

    </main>
  );
}

export default Cart;