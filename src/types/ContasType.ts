import { TipoContasType } from '../enums/TipoContasEnum';

export type ContasType = {
  ctcodigo?: string;
  ctnome: string;
  cttitular: string;
  ctsaldo: string;
  ctbanco: string;
  cttipoconta: TipoContasType;
  ctlimite?: string;
  ctdescricao?: string;
  ctcor?: string;
  ctativo?: boolean;
  createdAt?: string;
  updatedAt?: string;
};
