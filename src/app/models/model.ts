export interface CredsDTO {
    codUsuario: string;
    password: string;
  }

export interface Curso{
    id: number;
    nombre: string;
    codigo: string;
}

export interface Grupo {
  id: number;
  nombre: string;
  fecha_creacion: Date;
  curso: any;
  alerta?: string;
}