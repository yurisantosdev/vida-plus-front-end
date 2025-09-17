import { ContasType } from './ContasType';
import { CategoriasTransacoesType } from './CategoriasTransacoesType';
import { SubcategoriasTransacoesType } from './SubcategoriasTransacoesType';

export type TransacoesType = {
  tscodigo?: string;
  tstitulo: string;
  tsdescricao?: string;
  tsconta: string;
  tsvalor: number;
  tstipo: 'RECEITA' | 'DESPESA' | 'TRANSFERENCIA' | 'INVESTIMENTO' | 'RETIRADA';
  tsstatus?: 'PENDENTE' | 'CONFIRMADA' | 'CANCELADA' | 'ESTORNADA';
  tsquando: string;
  tscategoria?: string;
  tssubcategoria?: string;
  tsrecorrente?: boolean;
  tsfrequencia?: 'UMA_VEZ' | 'DIARIA' | 'SEMANAL' | 'QUINZENAL' | 'MENSAL' | 'BIMESTRAL' | 'TRIMESTRAL' | 'SEMESTRAL' | 'ANUAL';
  tsdataInicio?: string;
  tsdataFim?: string;
  tscomprovante?: string;
  tsnotas?: string;
  tsusuario: string;
  createdAt?: string;
  updatedAt?: string;
  conta?: ContasType;
  categoria?: CategoriasTransacoesType;
  subcategoria?: SubcategoriasTransacoesType;
};
