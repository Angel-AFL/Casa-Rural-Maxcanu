export interface CatSala {
  id: number;
  nombre: string;
  descripcion: string;
  imagen: string;
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
