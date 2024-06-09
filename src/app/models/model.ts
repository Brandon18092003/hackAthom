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


export interface MensajeRequest {
  conversacionId: number;
  codigoPersona: string;
  mensaje: string;
}

export interface Persona {
  id: number;
  nombres: string;
  ap_paterno: string;
  ap_materno: string;
  documento: string;
  codigo: string;
}

export interface Tarea {
  id: number;
  descripcion: string;
  fecha_venc: Date;
  grupo: Grupo;
  persona: Persona;
}

export interface Trabajo {
  id: number;
  nombre: string;
  descripcion: string;
  fecha_entrega: Date;
  grupo: Grupo;
}

export interface Usuario {
  id: number;
  rol: string;
  correo: string;
  password: string;
  persona: Persona;
}

export interface CrearGrupoDTO {
  idCurso: number;
  nombregrupo: string;
  codigoUsuario: string;
}

export interface MiembroDTO {
  CodMiembro: string;
  idGrupo: number;
}

export interface UpdateMiembroDTO {
  codigoUsuario: string;
  idGrupo: number;
  rolGrupo: string;
}

export interface ConversacionGrupal {
  id: number;
  grupo: Grupo;
  fechaInicio: Date;
  mensajes: MensajeConversacionGrupal[];
}

export interface MensajeConversacionGrupal {
  id: number;
  conversacionGrupal: ConversacionGrupal;
  persona: Persona;
  mensaje: string;
  fechaEnvio: Date;
}

export interface CrearGrupoDTO {
  codigoUsuario: string; // Código del líder
  idCurso: number; 
  nombregrupo: string;
  codigosMiembros: string[];
}

export interface PersonaDTO {
  nombres: string;
  ap_paterno: string;
  ap_materno: string;
  codigo: string;
  rol: string;
}






