import { UrgenciasEnum } from '@prisma/client';
import { UsuarioType } from './UsuariosType';

export type TarefasType = {
  tfcodigo?: string;
  tftitulo: string;
  tfdescricao: string;
  tffeito: boolean;
  tfusuario: string;
  tfurgencia: UrgenciasEnum;
  tfdataentrega: string;
  createdAt?: string;
  updatedAt?: string;
  usuario?: UsuarioType;
};
