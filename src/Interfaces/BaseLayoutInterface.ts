import React, { ReactNode } from "react"

export interface BaseLayoutInterface {
  children: ReactNode
  title?: string
  loading?: boolean
  showBackButton?: boolean
  backButtonPath?: string
  backButtonText?: string
  extraHeaderContent?: ReactNode
  buttonVoltar?: boolean
  navbar?: boolean
  voltar?: boolean
  styleBase?: boolean
  menu?: boolean
  extraComponentLeft?: ReactNode,
  extraComponentRigth?: ReactNode,
  extraComponent?: ReactNode,
  description?: string,
}
