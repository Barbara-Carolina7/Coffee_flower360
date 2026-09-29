function Home() {
  return (
    <main className="home">
      <section className="hero">
        <div className="hero-content">
          <p className="hero-subtitle">☕ Bienvenido a Coffee Flower 🌸</p>

          <h1>
            El sabor que
            <span> florece </span>
            en cada taza
          </h1>

          <p className="hero-description">
            Descubre nuestros cafés, pasteles y productos preparados
            especialmente para acompañar tus mejores momentos.
          </p>

          <div className="hero-buttons">
            <a href="/products" className="btn-primary">
              Ver productos
            </a>

            <a href="/categories" className="btn-secondary">
              Ver categorías
            </a>
          </div>
        </div>

        <div className="hero-image">
          <div className="coffee-circle">
            ☕
          </div>
          <div className="flower flower-one">🌸</div>
          <div className="flower flower-two">🌷</div>
        </div>
      </section>

      <section className="featured">
        <p className="section-subtitle">Nuestros favoritos</p>

        <h2>Productos destacados</h2>

        <div className="featured-grid">
          <div className="featured-card">
            <div className="card-icon">☕</div>
            <h3>Cafés</h3>
            <p>
              Cafés preparados con granos seleccionados para disfrutar
              cada momento.
            </p>
            <a href="/products">Ver productos →</a>
          </div>

          <div className="featured-card">
            <div className="card-icon">🍰</div>
            <h3>Pastelería</h3>
            <p>
              Deliciosos acompañamientos para disfrutar junto a tu café.
            </p>
            <a href="/products">Ver productos →</a>
          </div>

          <div className="featured-card">
            <div className="card-icon">🌸</div>
            <h3>Especiales</h3>
            <p>
              Productos especiales pensados para regalar o disfrutar.
            </p>
            <a href="/products">Ver productos →</a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;