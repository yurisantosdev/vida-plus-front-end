export type DashboardMetricsType = {
  saldoTotal: number;
  receitasMes: number;
  despesasMes: number;
  saldoMes: number;
  contasAtivas: number;
  transacoesMes: number;
  tendenciaReceitas: number;
  tendenciaDespesas: number;
  tendenciaSaldo: number;
};

export type GraficoTransacoesType = {
  data: string;
  receitas: number;
  despesas: number;
  saldo: number;
};

export type GraficoCategoriasType = {
  categoria: string;
  valor: number;
  cor: string;
  porcentagem: number;
};

export type TransacaoRecenteType = {
  trcodigo: string;
  trdescricao: string;
  trvalor: number;
  trtipo: 'RECEITA' | 'DESPESA';
  trdata: string;
  categoria: string;
  corCategoria: string;
};

export type MetaType = {
  mccodigo?: string;
  mcnome: string;
  mcvalor: number;
  mcvalorAtual: number;
  mcdataLimite: string;
  mcdescricao?: string;
  mcicone?: string;
  mcprogresso: number;
};

export type DashboardDataType = {
  metricas: DashboardMetricsType;
  graficoTransacoes: GraficoTransacoesType[];
  graficoCategorias: GraficoCategoriasType[];
  transacoesRecentes: TransacaoRecenteType[];
  metas: MetaType[];
  alertas: string[];
};
