import React, { useEffect, useState } from 'react'

export default function CardSaldos() {
  const finalSaldo = 2139800.0
  const finalEntrada = 0.0
  const finalSaida = 0.0

  const [saldo, setSaldo] = useState(0)
  const [entrada, setEntrada] = useState(0)
  const [saida, setSaida] = useState(0)

  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  function animateValue(
    setter: (val: number) => void,
    end: number,
    duration = 1000
  ) {
    let start = 0
    const startTime = performance.now()

    function update(currentTime: number) {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const value = start + (end - start) * progress

      setter(parseFloat(value.toFixed(2)))

      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }

    requestAnimationFrame(update)
  }

  useEffect(() => {
    animateValue(setSaldo, finalSaldo)
    animateValue(setEntrada, finalEntrada)
    animateValue(setSaida, finalSaida)
  }, [])

  return (
    <div className="w-full transition-all animate-slide-up ">
      <div className="w-full rounded-xl bg-blue-500 p-4">
        <p className="text-md font-medium text-white">Saldo atual</p>
        <p className="mt-1 text-3xl font-extrabold text-white">
          {formatCurrency(saldo)}
        </p>

        <div className="mt-7">
          <div className="flex justify-between">
            <p className="text-white">Entradas</p>
            <p className="text-white">Saída</p>
          </div>
          <div className="flex justify-between">
            <p className="font-extrabold text-green-400">
              {formatCurrency(entrada)}
            </p>
            <p className="font-extrabold text-red-700">
              {formatCurrency(saida)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
