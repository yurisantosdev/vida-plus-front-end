import { ComponentProps } from 'react';

export interface CardChecklistInterface extends ComponentProps<'button'> {
  title: string;
  quantidade: number;
  index: number;
}

