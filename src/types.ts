export interface Producto {
  id: string;
  nombre: string;
  precio: number;
  imagen_url: string;
  categoria: string;
  descripcion: string;
  video_url?: string;
  created_at: string;
}
