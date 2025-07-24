import { UsuarioType } from './UsuariosType';

export type CodigosRecuperarSenhaType = {
  crscodigo?: string;
  crstoken: string;
  crsusuario: string;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};
