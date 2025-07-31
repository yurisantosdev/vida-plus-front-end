import { Car, CaretRight, Gauge } from '@phosphor-icons/react'
import React from 'react'
import { CardVeiculoInterface } from '../../../Interfaces/CardVeiculoInterface'

export default function CardVeiculo({
  placa,
  veiculo,
  hodometro,
  select = false,
  acess = true,
  extraContent,
  ...props
}: CardVeiculoInterface) {
  return (
    <div
      {...props}
      className={`border rounded-2xl p-4 shadow-sm hover:shadow-md hover:bg-gray-50 active:bg-gray-100 active:scale-95 cursor-pointer transition-all duration-300 items-center mb-3 ${
        props.className
      } ${
        select ? 'bg-blue-100 border-blue-400' : 'border-gray-200 bg-white '
      }`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div
            className={`p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner ${
              select ? 'bg-blue-200' : 'bg-blue-100'
            }`}>
            <Car size={28} className="text-blue-600" />
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-lg text-truncate font-semibold text-gray-800">
              <span>{veiculo}</span>
              <span className="text-gray-400">-</span>
              <span>{placa}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <Gauge size={16} className="text-blue-500" />
              <span className="font-medium">{hodometro} Km</span>
            </div>
          </div>
        </div>
        {acess && <CaretRight size={20} className="text-gray-400" />}
      </div>

      {extraContent && <div className="mt-4 w-full">{extraContent}</div>}
    </div>
  )
}
