'use client'
import { AuthUser } from '@/services/auth'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { UsuarioType } from '@/types/UsuariosType'
import { useRouter } from 'next/navigation'
import BaseLayout from '@/templates/BaseLayout'
import Subtitle from '@/components/Subtitle'
import {
  GasPump,
  ListBullets,
  Wrench,
  CurrencyCircleDollar,
  Plus,
  Info
} from '@phosphor-icons/react'
import CardVeiculo from './_components/CardVeiculo'
import { Button } from '@/components/Button'
import { VeiculosType } from '@/types/VeiculosType'
import { findAllVeiculos } from '@/store/Veiculos'
import { setLoading } from '@/redux/loading/actions'
import { findTotalGastoAbastecimentos } from '@/store/Abastecimentos'
import { FormatarValorEmReais } from '@/services/formatters'
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { findTotalGastoManutencoes } from '@/store/Manutencoes'
import { findTotalGastoDespesas } from '@/store/Despesas'
import FuncionalidadesGarage from './_components/FuncionalidadesGarage'

export default function Garage() {
  AuthUser()
  const router = useRouter()
  const dispatch = useDispatch()
  const user: UsuarioType = useSelector((state: any) => state.userReducer)
  const [veiculos, setVeiculos] = useState<VeiculosType[]>([])
  const [valoresAbastecimento, setValoresAbastecimento] = useState()
  const [valorTotalAbastecimento, setValorTotalAbastecimento] =
    useState<string>()
  const [valoresManutencoes, setValoresManutencoes] = useState()
  const [valorTotalManutencao, setValorTotalManutencao] = useState<string>()
  const [valoresDespesas, setValoresDespesas] = useState()
  const [valorTotalDespesa, setValorTotalDespesa] = useState<string>()

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-300 rounded-lg p-2 shadow-lg">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-lg font-semibold text-black">
            {FormatarValorEmReais(payload[0].value.toFixed(2))}
          </p>
        </div>
      )
    }

    return null
  }

  useEffect(() => {
    const consultaDados = async () => {
      if (!user.uscodigo) return

      dispatch(setLoading(true))

      const [
        responseVeiculos,
        responseTotalGastoAbastecimentos,
        responseTotalGastoManutencoes,
        responseTotalGastoDespesas
      ] = await Promise.all([
        findAllVeiculos(user.uscodigo),
        findTotalGastoAbastecimentos(user.uscodigo),
        findTotalGastoManutencoes(user.uscodigo),
        findTotalGastoDespesas(user.uscodigo)
      ])

      if (responseVeiculos?.veiculos) {
        setVeiculos(responseVeiculos.veiculos)
      }

      if (responseTotalGastoAbastecimentos) {
        setValoresAbastecimento(responseTotalGastoAbastecimentos.valores)
        setValorTotalAbastecimento(
          FormatarValorEmReais(responseTotalGastoAbastecimentos.valorTotal)
        )
      }

      if (responseTotalGastoManutencoes) {
        setValoresManutencoes(responseTotalGastoManutencoes.valores)
        setValorTotalManutencao(
          FormatarValorEmReais(responseTotalGastoManutencoes.valorTotal)
        )
      }

      if (responseTotalGastoDespesas) {
        setValoresDespesas(responseTotalGastoDespesas.valores)
        setValorTotalDespesa(
          FormatarValorEmReais(responseTotalGastoDespesas.valorTotal)
        )
      }

      dispatch(setLoading(false))
    }

    consultaDados()
  }, [user.uscodigo])

  return (
    <BaseLayout title="Garage">
      {/* Veículos */}
      <div className="transition-all animate-slide-up">
        <Subtitle
          title="Meu Veículos"
          icon={<ListBullets size={20} className="text-black" />}
        />

        {/* Botão de Cadastrar Novo Veículo */}
        <div className="flex items-center justify-center mt-3 mb-2">
          <Button
            title="Cadastrar novo veículo"
            className="bg-black"
            iconRight={<Plus size={20} />}
            onClick={() => {
              router.push('/garage/cadastro')
            }}
          />
        </div>

        <div className="max-h-[250px] overflow-x-scroll mt-5">
          {veiculos.length > 0 ? (
            veiculos.map((veiculo: VeiculosType, index: number) => {
              return (
                <CardVeiculo
                  key={index}
                  placa={veiculo.veplaca}
                  veiculo={veiculo.venome}
                  hodometro={veiculo.vehodometro}
                  onClick={() => {
                    router.push(`/garage/perfilVeiculo/${veiculo.vecodigo}`)
                  }}
                />
              )
            })
          ) : (
            <div className="border rounded-2xl p-4 shadow-sm border-gray-200 bg-white">
              <Info
                size={40}
                className="text-black text-center w-full m-auto"
              />
              <p className="text-center text-black">
                Nenhum veículo cadastrado
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Funcionalidades */}
      <div className="border border-gray-200 rounded-2xl bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3 p-4">
        <FuncionalidadesGarage />
      </div>

      {/* Gastos */}
      <div className="mt-5 transition-all animate-slide-up">
        <Subtitle
          title="Gastos"
          icon={<CurrencyCircleDollar size={20} className="text-black" />}
        />

        {/* Gastos com Abastecimentos */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3">
          {/* Topo com ícone e título */}
          <div className="flex items-center gap-4">
            <div className="bg-red-100 p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner">
              <GasPump size={28} className="text-red-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Abastecimentos
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Total gasto:{' '}
                <strong className="text-red-600">
                  {valorTotalAbastecimento}
                </strong>
              </span>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full">
            <div style={{ overflowX: 'auto' }}>
              <div
                style={{
                  minWidth: `${12 * 60}px`,
                  height: '200px'
                }}>
                <ResponsiveContainer>
                  <BarChart data={valoresAbastecimento}>
                    <XAxis
                      dataKey="name"
                      axisLine={true}
                      tickLine={true}
                      interval="preserveStartEnd"
                      angle={-90}
                      textAnchor="end"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Gastos com Manutenções */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3">
          {/* Topo com ícone e título */}
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner">
              <Wrench size={28} className="text-blue-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Manutenções
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Total gasto:
                <strong className="text-blue-600">
                  {valorTotalManutencao}
                </strong>
              </span>
            </div>
          </div>

          {/* Gráfico de Manutenções */}
          <div className="w-full">
            <div style={{ overflowX: 'auto' }}>
              <div
                style={{
                  minWidth: `${12 * 60}px`,
                  height: '200px'
                }}>
                <ResponsiveContainer>
                  <BarChart data={valoresManutencoes}>
                    <XAxis
                      dataKey="name"
                      axisLine={true}
                      tickLine={true}
                      interval="preserveStartEnd"
                      angle={-90}
                      textAnchor="end"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#155dfc" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>

        {/* Gastos com Despesas */}
        <div className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md transition-all duration-300 flex flex-col gap-4 mb-3">
          {/* Topo com ícone e título */}
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full w-16 h-16 flex justify-center items-center shadow-inner">
              <CurrencyCircleDollar size={28} className="text-green-600" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-gray-800">
                Despesas
              </span>
              <span className="text-sm text-gray-500 mt-1">
                Total gasto:{' '}
                <strong className="text-green-600">{valorTotalDespesa}</strong>
              </span>
            </div>
          </div>

          {/* Gráfico de barras */}
          <div className="w-full">
            <div style={{ overflowX: 'auto' }}>
              <div
                style={{
                  minWidth: `${12 * 60}px`,
                  height: '200px'
                }}>
                <ResponsiveContainer>
                  <BarChart data={valoresDespesas}>
                    <XAxis
                      dataKey="name"
                      axisLine={true}
                      tickLine={true}
                      interval="preserveStartEnd"
                      angle={-90}
                      textAnchor="end"
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="value" fill="#16a34a" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}
