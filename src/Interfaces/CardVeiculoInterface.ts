import { ComponentProps } from "react";

export interface CardVeiculoInterface extends ComponentProps<'div'> {
  placa: string;
  veiculo: string;
  hodometro: string;
  select?: boolean;
  acess?: boolean;
}
