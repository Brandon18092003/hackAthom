export interface Habilidad {
    id: number;
    nombre: string;
}

export interface Hobbie {
    id: number;
    nombre: string;
}

export interface Horario {
    id: number;
    dia: string;
    hora_inicio: string;
    hora_fin: string;
}

export interface Matriculados {
    id: number;
    persona: Persona;
    curso: Curso;
}

export interface MiembroGrupo {
    id: number;
    rol: string;
    es_lider: boolean;
    grupo: Grupo;
    persona: Persona;
}

export interface Perfil {
    id: number;
    info_adicional: string;
    persona: Persona;
}

export interface PerfilHabilidad {
    id: number;
    perfil: Perfil;
    habilidad: Habilidad;
}

export interface PerfilHobby {
    id: number;
    perfil: Perfil;
    hobbie: Hobbie;
}

export interface PerfilHorario {
    id: number;
    perfil: Perfil;
    horario: Horario;
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

export interface Grupo {
    id: number;
    nombre: string;
    fecha_creacion: Date;
    curso: Curso;
}

export interface Curso {
    id: number;
    nombre: string;
    codigo: string;
}

export interface MensajeRequest {
    conversacionId: number;
    codigoPersona: string;
    mensaje: string;
}
