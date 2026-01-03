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

export interface CatCabanaHabitacion {
  nombre: string;
}

export interface CabanaHabitacion {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  interior: string;
  imagen: string;
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

export interface HospedajeResponse {
  folio: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  habitacion_cabana: string;
  fecha_entrada: string;
  fecha_salida: string;
}

//bicicleta renta
export interface RentaBiciPayload {
  nombre: string;
  apellido: string;
  telefono: string;
}

export interface RentaBiciResponse {
  folio_generado: string;
  nombre: string;
  apellido: string;
  telefono: string;
}

// devolucion de bicicletas
export interface DevolucionBiciPayload {
  folio: string;
}

export interface DevolucionBiciResponse {
  folio_actualizado: string;
  nombre_cliente: string;
  estatus_nuevo: string;
  fecha_devolucion_actualizada: string; 
}

export interface CabanaHabitacion {
  id: number;
  nombre: string;
  tipo: string;
  descripcion: string;
  interior: string;
  imagen: string;
}
