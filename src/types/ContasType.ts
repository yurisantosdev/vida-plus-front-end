import { TipoContasEnum } from '../enums/TipoContasEnum';

export type ContasType = {
  ctcodigo?: string;
  ctnome: string;
  cttitular: string;
  ctsaldo: string;
  ctbanco: string;
  cttipoconta: TipoContasEnum;
  createdAt?: string;
  updatedAt?: string;
};
