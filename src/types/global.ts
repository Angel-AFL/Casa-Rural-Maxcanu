export interface CatSala {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
}

// src/types/global.ts
export interface ImgCabanaHabitacion {
  imagen: string;
}

//registro hospedaje
export interface HospedajePayload {
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  habitacion_cabana: string;
  fecha_entrada: string;
  fecha_salida: string;
}
export interface CatGaleriaArte {
  id: number;
  sala: string;
  nombre: string;
  autor: string;
  técnica: string;
  categoría: string;
  dimensiones: string;
  año: string;
  procedencia: string;
  uso: string;
  imagen: string;
}
