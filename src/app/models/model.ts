import { Time } from "@angular/common";

export interface CredsDTO {
  codUsuario: string;
  password: string;
}

export interface Curso {
  id: number;
  nombre: string;
  codigo: string;
}

export interface Grupo {
  id: number;
  nombre: string;
  nombreCurso: string;
  fecha_creacion: Date;
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
  codMiembro: string;
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

export interface UpdateMiembroDTO {
  codigoUsuario: string;
  idGrupo: number;
  rolGrupo: string;
}

export interface Habilidad {
  id: number;
  nombre: string;
}

export interface Hobby {
  id: number;
  nombre: string;
}

export interface CrearHabilidadDTO {
  codigoPersona: string;
  nom_habilidad: string;
}

export interface EliminarHabilidadDTO {
  idHabilidad: number;
  codigoPersona: string;
}

export interface CrearHobbyDTO {
  codigoPersona: string;
  nom_hobby: string;
}

export interface EliminarHobbyDTO {
  idPerfilHobby: number;
  codigoPersona: string;
}

export interface InfoDTO {
  nombres: string;
  ap_paterno: string;
  ap_materno: string;
  infoAdicional: string;  // Ensure it matches the field name in your backend DTO
  descripcion: string;
}


export interface ActualizarInfoAdicionalDTO {
  codigoPersona: string;
  infoAdicional: string;
}

export interface MiembroGrupo {
  id: number;
  rol: string;
  es_lider: boolean;
  grupo: Grupo;
  persona: Persona;
}

export interface Notificacion {
  id: number;
  mensaje: string;
  fecha: Date;
  hora: Time;
  grupo: Grupo;
  isPinned: boolean; // Nuevo campo
}
