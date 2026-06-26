-- 1. Crear la tabla de productos
CREATE TABLE public.productos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    nombre TEXT NOT NULL,
    precio NUMERIC(10, 2) NOT NULL,
    imagen_url TEXT,
    categoria TEXT NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilitar la seguridad de nivel de fila (RLS)
ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

-- 3. Crear una política para que cualquiera pueda VER (leer) los productos
CREATE POLICY "Permitir lectura pública de productos"
ON public.productos
FOR SELECT
TO public
USING (true);

-- 4. Datos de prueba (opcional: inserta algunos productos iniciales)
INSERT INTO public.productos (nombre, precio, imagen_url, categoria, descripcion) VALUES
('Pijama Estampada Dinosaurios', 25.00, 'https://images.unsplash.com/photo-1596814234568-19ebcc1af3fa?auto=format&fit=crop&q=80&w=400', 'pijamas', 'Cómoda pijama de algodón 100% con estampado de dinosaurios. Ideal para la piel suave del bebé.'),
('Conjunto Algodón Bebé', 30.00, 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=400', 'bebe', 'Conjunto de dos piezas para bebé. Tela respirable y suave, perfecta para el día a día.'),
('Manta Suave Estrellas', 18.00, 'https://images.unsplash.com/photo-1623910271168-3e4b78759530?auto=format&fit=crop&q=80&w=400', 'bebe', 'Mantita súper suave para abrigar a tu pequeño en cualquier momento. Diseño con estrellas bordadas.');
