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

//nombres de cabañas/habitaciones
export interface CatCabanaHabitacion {
  nombre: string;
}


// Disponibilidad de hospedaje
export interface DisponibilidadHospedaje {
  fecha_entrada: string;
  fecha_salida: string;
}

//catalogo galeria de arte
export interface CatGaleriaArte {
  id: number;
  sala: string;
  nombre: string;
  autor: string;
  tipo: string;
  imagen: string;
  created_at: string;
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

export interface HospedajeResponse {
  folio: string;
  nombre: string;
  apellido: string;
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