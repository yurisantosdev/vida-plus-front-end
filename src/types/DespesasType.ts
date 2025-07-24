import { CategoriasDespesasType } from './CategoriasDespesasType';
import { VeiculosType } from './VeiculosType';

export type DespesasType = {
  dpcodigo?: string;
  dpvalor: number;
  dpdescricao: string;
  dpcategoria: string;
  dpveiculo: string;
  dpquando: string;
  dpkm: number;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
  categoria?: CategoriasDespesasType;
};
