import { ArrowRight, Star, Truck, ShieldCheck, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Producto } from '../types';
import './Home.css';

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    async function cargarProductosDestacados() {
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(3);
        
        if (error) throw error;
        setProductos(data || []);
      } catch (error) {
        console.error('Error cargando productos:', error);
      } finally {
        setCargando(false);
      }
    }

    cargarProductosDestacados();
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero container animate-fade-in">
        <div className="hero-content glass-panel">
          <h1>Dulces Sueños para tus Pequeños</h1>
          <p className="hero-subtitle">
            Descubre nuestra colección exclusiva de productos para bebé y pijamas estampadas.
            Comodidad, estilo y ternura en cada prenda.
          </p>
          <div className="hero-actions">
            <Link to="/products" className="btn-primary">
              Ver Colección <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features container">
        <div className="feature-card glass-panel">
          <Truck className="feature-icon" size={32} />
          <h3>Envío Rápido</h3>
          <p>Llevamos tus productos a la puerta de tu casa en tiempo récord.</p>
        </div>
        <div className="feature-card glass-panel">
          <ShieldCheck className="feature-icon" size={32} />
          <h3>Compra Segura</h3>
          <p>Tu información y pagos están 100% protegidos.</p>
        </div>
        <div className="feature-card glass-panel">
          <Star className="feature-icon" size={32} />
          <h3>Calidad Premium</h3>
          <p>Materiales suaves y seguros, perfectos para la piel del bebé.</p>
        </div>
      </section>

      {/* Productos Destacados desde Supabase */}
      <section className="featured-products container">
        <div className="section-header">
          <h2 className="section-title">Productos Destacados</h2>
          <Link to="/products" className="ver-todos-link">Ver todo</Link>
        </div>
        
        {cargando ? (
          <div className="loading-container">
            <Loader2 className="spinner" size={48} />
            <p>Cargando lo mejor para tu bebé...</p>
          </div>
        ) : productos.length === 0 ? (
          <div className="empty-state glass-panel">
            <p>Aún no hay productos en la tienda. ¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="products-grid">
            {productos.map((producto) => (
              <div key={producto.id} className="product-card glass-panel">
                <div className="product-image-container">
                  {producto.imagen_url ? (
                    <img src={producto.imagen_url} alt={producto.nombre} className="product-image" />
                  ) : (
                    <div className="product-image-placeholder"></div>
                  )}
                  <span className="product-category-badge">{producto.categoria === 'bebe' ? 'Bebés' : 'Pijamas'}</span>
                </div>
                <div className="product-info">
                  <h4>{producto.nombre}</h4>
                  <p className="product-description">{producto.descripcion?.substring(0, 60)}...</p>
                  <div className="product-bottom-row">
                    <p className="product-price">${producto.precio.toFixed(2)}</p>
                    <button className="btn-primary btn-small">Añadir</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
