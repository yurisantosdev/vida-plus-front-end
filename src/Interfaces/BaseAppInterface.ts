import { ComponentProps, ReactNode } from "react";

export interface BaseAppInterface extends ComponentProps<'div'> {
  children?: ReactNode;
  loading: boolean,
  styleBase?: boolean,
  menu?: boolean,
  navbar?: boolean,
  extraComponentTitle?: ReactNode,
}
