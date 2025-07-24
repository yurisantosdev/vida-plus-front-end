import { TiposContasEnum } from '@prisma/client';
import { UsuarioType } from './UsuariosType';

export type ContasType = {
  cocodigo?: string;
  coconta: string;
  cousuario: string;
  cobanco: string;
  cotipoconta: TiposContasEnum;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};
