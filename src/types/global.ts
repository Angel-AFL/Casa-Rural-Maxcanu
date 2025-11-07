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


// Catálogo de cabañas/habitaciones
export interface CatSala {
  nombre: string;
}

// Disponibilidad de hospedaje
export interface DisponibilidadHospedaje {
  fecha_entrada: string;
  fecha_salida: string;
}
export interface CatGaleriaArte {
  id: number;
  sala: string;
  nombre: string;
  autor: string;
  tipo: string;
  imagen: string;
  created_at: string;
}
