import { TipoContasType } from '../enums/TipoContasEnum';

export type ContasType = {
  ctcodigo: string;
  ctnome: string;
  cttitular: string;
  ctsaldo: string;
  cttipoconta: TipoContasType;
  createdAt?: string;
  updatedAt?: string;
};
