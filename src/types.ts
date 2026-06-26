export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string;
  categoria: string;
  subcategoria?: string;
  descripcion: string;
  video_url?: string;
  tallas?: string;
  created_at: string;
}
