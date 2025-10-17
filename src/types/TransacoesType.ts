import { TipoTransacoesEnum } from 'src/enums/TipoTransacoesEnum';

export type TransacoesType = {
  trcodigo?: string;
  trdata: string;
  trvalor: string;
  trdescricao?: string;
  trcategoria?: string;
  trconta: string;
  trusuario: string;
  trtipo: TipoTransacoesEnum;
  trrecorrente?: boolean;
  trtags?: string[];
  createdAt?: string;
  updatedAt?: string;
};
