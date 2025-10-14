import { TipoStatusTransacoesPrevistasEnum } from '../enums/TipoStatusTransacoesPrevistasEnum';
import { TipoTransacoesEnum } from '../enums/TipoTransacoesEnum';

export type TransacoesPrevistasType = {
  tpcodigo?: string;
  tpdata: string;
  tpdescricao: string;
  tpconta: string;
  tpusuario: string;
  tptipo: TipoTransacoesEnum;
  tpstatus: TipoStatusTransacoesPrevistasEnum;
  createdAt?: string;
  updatedAt?: string;
};
