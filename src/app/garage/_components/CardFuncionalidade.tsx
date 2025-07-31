import React from 'react'
import { CardFuncionalidadeInterface } from '../../../Interfaces/CardFuncionalidadeInterface'

export default function CardFuncionalidade({
  icon,
  ...props
}: CardFuncionalidadeInterface) {
  return (
    <div
      {...props}
      className={`p-2 w-full rounded-2xl border border-gray-200 active:scale-95 duration-300 transition-all flex justify-center items-center cursor-pointer ${props.className}`}>
      {icon}
    </div>
  )
}
