import { ComponentProps, ReactNode } from "react";

export interface CardVeiculoInterface extends ComponentProps<'div'> {
  placa: string;
  veiculo: string;
  hodometro: number;
  select?: boolean;
  acess?: boolean;
  extraContent?: ReactNode;
}
