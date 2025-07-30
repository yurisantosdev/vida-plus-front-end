import { VeiculosType } from './VeiculosType';

export type AbastecimentosType = {
  abcodigo?: string;
  abvalortotal: number;
  ablitros: number;
  abvalorlitro: number;
  abhodometro: number;
  abveiculo: string;
  abquando?: string;
  createdAt?: string;
  updatedAt?: string;
  veiculo?: VeiculosType;
};
