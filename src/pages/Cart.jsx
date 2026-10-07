import { useEffect, useState } from "react";

function Cart() {
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
    <div>
      <h1>Carrito</h1>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {carrito.map((producto) => (
            <div key={producto.id}>
              <h2>{producto.nombre}</h2>

              <p>
                Precio: $
                {Number(producto.precio).toLocaleString("es-CL")}
              </p>

              <p>
                Cantidad: {producto.cantidad}
              </p>

              <button
                onClick={() =>
                  disminuirCantidad(producto.id)
                }
              >
                -
              </button>

              <button
                onClick={() =>
                  aumentarCantidad(producto.id)
                }
              >
                +
              </button>

              <button
                onClick={() =>
                  eliminarProducto(producto.id)
                }
              >
                Eliminar
              </button>

              <p>
                Subtotal: $
                {(
                  Number(producto.precio) *
                  producto.cantidad
                ).toLocaleString("es-CL")}
              </p>
            </div>
          ))}

          <hr />

          <h2>
            Total: ${total.toLocaleString("es-CL")}
          </h2>

          <button onClick={vaciarCarrito}>
            Vaciar carrito
          </button>

          <button>
            Continuar compra
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;