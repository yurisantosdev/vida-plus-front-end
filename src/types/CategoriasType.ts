export type CategoriaType = {
  cgcodigo?: string;
  cgnome: string;
  cgcor: string;
  cgicon: string;
  cgtipo: 'RECEITA' | 'DESPESA';
  cgdescricao?: string;
  cgativo?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export const categoriasPadrao: CategoriaType[] = [
  // Receitas
  {
    cgnome: 'Salário',
    cgcor: '#10B981',
    cgicon: 'CurrencyDollar',
    cgtipo: 'RECEITA',
    cgdescricao: 'Salário mensal e remunerações'
  },
  {
    cgnome: 'Freelance',
    cgcor: '#059669',
    cgicon: 'Briefcase',
    cgtipo: 'RECEITA',
    cgdescricao: 'Trabalhos autônomos e freelances'
  },
  {
    cgnome: 'Investimentos',
    cgcor: '#047857',
    cgicon: 'TrendUp',
    cgtipo: 'RECEITA',
    cgdescricao: 'Rendimentos de investimentos'
  },
  {
    cgnome: 'Vendas',
    cgcor: '#065F46',
    cgicon: 'ShoppingCart',
    cgtipo: 'RECEITA',
    cgdescricao: 'Vendas de produtos ou serviços'
  },

  // Despesas
  {
    cgnome: 'Alimentação',
    cgcor: '#DC2626',
    cgicon: 'ForkKnife',
    cgtipo: 'DESPESA',
    cgdescricao: 'Supermercado, restaurantes e delivery'
  },
  {
    cgnome: 'Transporte',
    cgcor: '#EA580C',
    cgicon: 'Car',
    cgtipo: 'DESPESA',
    cgdescricao: 'Combustível, transporte público e táxi'
  },
  {
    cgnome: 'Moradia',
    cgcor: '#C2410C',
    cgicon: 'House',
    cgtipo: 'DESPESA',
    cgdescricao: 'Aluguel, financiamento e condomínio'
  },
  {
    cgnome: 'Saúde',
    cgcor: '#BE123C',
    cgicon: 'Heart',
    cgtipo: 'DESPESA',
    cgdescricao: 'Médicos, medicamentos e plano de saúde'
  },
  {
    cgnome: 'Educação',
    cgcor: '#9333EA',
    cgicon: 'GraduationCap',
    cgtipo: 'DESPESA',
    cgdescricao: 'Cursos, livros e material escolar'
  },
  {
    cgnome: 'Lazer',
    cgcor: '#7C3AED',
    cgicon: 'GameController',
    cgtipo: 'DESPESA',
    cgdescricao: 'Entretenimento, viagens e hobbies'
  },
  {
    cgnome: 'Compras',
    cgcor: '#DB2777',
    cgicon: 'ShoppingBag',
    cgtipo: 'DESPESA',
    cgdescricao: 'Roupas, eletrônicos e itens pessoais'
  },
  {
    cgnome: 'Outros',
    cgcor: '#6B7280',
    cgicon: 'DotsThree',
    cgtipo: 'DESPESA',
    cgdescricao: 'Outras despesas não categorizadas'
  }
];
