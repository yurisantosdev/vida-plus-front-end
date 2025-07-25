import { CardChecklistInterface } from '@/Interfaces/CardChecklistInterface'
import { CaretRight, ListBullets } from '@phosphor-icons/react'
import React from 'react'

export default function CardChecklist({
  title,
  quantidade,
  ...props
}: CardChecklistInterface) {
  return (
    <button
      className="mt-3 h-[75px] w-full flex items-center justify-between rounded-lg bg-blue-500 p-3 active:scale-95 cursor-pointer hover:bg-blue-400 active:bg-blue-500"
      {...props}>
      <div className="w-[65%] flex items-center justify-start">
        <ListBullets size={40} className="mr-3" />
        <p>{title}</p>
      </div>

      <div className="w-[20%] flex items-center justify-end">
        <p className="text-2xl">{quantidade}</p>
        <CaretRight size={20} />
      </div>
    </button>
  )
}
