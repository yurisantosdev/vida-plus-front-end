import React, { ReactNode } from "react"

export interface BaseLayoutInterface {
  children: ReactNode
  title?: string
  showBackButton?: boolean
  backButtonPath?: string
  backButtonText?: string
  extraHeaderContent?: ReactNode
  buttonVoltar?: boolean
  navbar?: boolean
  voltar?: boolean
  styleBase?: boolean
  extraComponentLeft?: ReactNode,
  extraComponentRigth?: ReactNode,
  extraComponent?: ReactNode,
  description?: string,
}
