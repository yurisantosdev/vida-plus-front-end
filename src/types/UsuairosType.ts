export type UsuariosType = {
  uscodigo?: string;
  usemail: string;
  usnome: string;
  ussenha?: string;
  confirmarSenha?: string;
  usfoto?: string;
  usdataNascimento?: string;
  usgenero?: 'MASCULINO' | 'FEMININO' | 'OUTRO';
  ustema?: 'CLARO' | 'ESCURO' | 'SISTEMA';
  usmoeda?: 'BRL' | 'USD' | 'EUR';
  usidioma?: 'PT' | 'EN' | 'ES';
  token?: string;
  createdAt?: string;
  updatedAt?: string;
};
