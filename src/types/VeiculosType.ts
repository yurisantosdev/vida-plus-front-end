import { UsuarioType } from './UsuariosType';

export type VeiculosType = {
  vecodigo?: string;
  veplaca: string;
  veusuario: string;
  venome: string;
  vehodometro: any;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};
