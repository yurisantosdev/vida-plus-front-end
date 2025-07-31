import { UsuarioType } from './UsuariosType';
import { VeiculosType } from './VeiculosType';

export type ManutencoesType = {
  mtcodigo?: string;
  mtveiculo: string;
  mtquando: string;
  mtvalor: any;
  mtdescricao: string;
  mthodometro: any;
  mttitle: string;
  mtusuario: string;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
  usuario?: UsuarioType;
};
