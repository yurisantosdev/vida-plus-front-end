import { TipoTransacoesEnum } from 'src/enums/TipoTransacoesEnum';

export type TransacoesType = {
  trcodigo?: string;
  trdata: string;
  trvalor: string;
  trconta: string;
  trusuario: string;
  trtipo: TipoTransacoesEnum;
  createdAt?: string;
  updatedAt?: string;
};
