import React from 'react'
import { useRouter } from 'next/navigation'
import { CaretRight, House } from '@phosphor-icons/react'
import { cn } from '@/utils/cn'

interface BreadcrumbItem {
  label: string
  href?: string
  icon?: React.ReactNode
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumb({ items, className }: BreadcrumbProps) {
  const router = useRouter()

  const handleClick = (href?: string) => {
    if (href) {
      router.push(href)
    }
  }

  return (
    <nav className={cn('flex items-center space-x-2 text-sm', className)} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <CaretRight size={12} className="text-gray-400 mx-2" />
            )}
            
            {item.href ? (
              <button
                onClick={() => handleClick(item.href)}
                className={cn(
                  'flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200',
                  index === items.length - 1 && 'text-gray-900 font-medium'
                )}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ) : (
              <span
                className={cn(
                  'flex items-center space-x-1',
                  index === items.length - 1 ? 'text-gray-900 font-medium' : 'text-gray-500'
                )}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

// Hook para gerar breadcrumbs automaticamente baseado na rota
export function useBreadcrumbs() {
  const router = useRouter()
  const pathname = router.pathname || ''

  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean)
    const breadcrumbs: BreadcrumbItem[] = [
      {
        label: 'Início',
        href: '/home',
        icon: <House size={16} />
      }
    ]

    let currentPath = ''
    segments.forEach((segment, index) => {
      currentPath += `/${segment}`
      
      // Mapeamento de rotas para labels mais amigáveis
      const routeLabels: { [key: string]: string } = {
        'garage': 'Garagem',
        'finance': 'Financeiro',
        'checklists': 'Checklists',
        'calendar': 'Calendário',
        'cadastrar': 'Cadastro',
        'esqueciSenha': 'Esqueci Senha',
        'redefinirSenha': 'Redefinir Senha',
        'manutencoes': 'Manutenções',
        'abastecimentos': 'Abastecimentos',
        'despesas': 'Despesas',
        'perfilVeiculo': 'Perfil do Veículo'
      }

      const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
      
      breadcrumbs.push({
        label,
        href: index === segments.length - 1 ? undefined : currentPath
      })
    })

    return breadcrumbs
  }

  return generateBreadcrumbs()
} 