export type ContasType = {
  ctcodigo?: string;
  ctconta: string;
  ctusuario: string;
  ctinstituicao?: string;
  ctsaldo?: number;
  ctsaldoInicial?: number;
  cttipoconta: 'CORRENTE' | 'POUPANCA' | 'SALARIO' | 'INVESTIMENTO' | 'CARTAO_CREDITO' | 'CARTAO_DEBITO' | 'DINHEIRO' | 'OUTRO';
  ctstatus?: 'ATIVA' | 'INATIVA' | 'BLOQUEADA' | 'FECHADA';
  ctlimiteCredito?: number;
  ctdataVencimento?: string;
  ctobservacao?: string;
  ctcor?: string;
  ctativo?: boolean;
  createdAt?: string;
  updatedAt?: string;
  instituicao?: any;
};
