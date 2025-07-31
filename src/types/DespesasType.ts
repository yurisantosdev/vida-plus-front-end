import { CategoriasDespesasType } from './CategoriasDespesasType';
import { VeiculosType } from './VeiculosType';
import { UsuarioType } from './UsuariosType';

export type DespesasType = {
  dpcodigo?: string;
  dpvalor: number;
  dpdescricao: string;
  dpcategoria: string;
  dpveiculo: string;
  dpquando: string;
  dphodometro: number;
  dpusuario: string;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
  categoria?: CategoriasDespesasType;
  usuario?: UsuarioType;
};
