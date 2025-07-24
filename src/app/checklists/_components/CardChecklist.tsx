import { CardChecklistInterface } from '@/Interfaces/CardChecklistInterface'
import { ArrowArcRight, ListChecks } from '@phosphor-icons/react'
import React from 'react'

export default function CardChecklist({
  title,
  quantidade,
  index,
  ...props
}: CardChecklistInterface) {
  return (
    <div className="w-full">
      <button
        className="mt-3 h-[75px] flex items-center justify-between rounded-lg bg-blue-200 p-3 active:scale-95"
        {...props}>
        <div className="w-[65%] flex items-center justify-start">
          <ListChecks size={20} />
          <p>{title}</p>
        </div>

        <div className="w-[20%] flex items-center justify-end">
          <p className="text-2xl">{quantidade}</p>
          <ArrowArcRight size={20} />
        </div>
      </button>
    </div>
  )
}
