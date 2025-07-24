import { ReactNode } from "react";

export type BaseAppType = {
    children: any
    loading: boolean
    navbar?: boolean
    sidebar?: boolean
    title?: string
    voltar?: boolean
    extraComponent?: ReactNode
};