import { CategoriasTransacoesType } from './CategoriasTransacoesType';
import { ContasType } from './ContasType';

export type TransacoesType = {
  tscodigo?: string;
  tstitulo: string;
  tsdescricao: string;
  tsconta: string;
  tsvalor: number;
  tsdespesa: boolean;
  tsquando: string;
  tscategoria: string;
  createdAt?: string;
  updatedAt?: string;
  conta?: ContasType;
  categoria?: CategoriasTransacoesType;
};
