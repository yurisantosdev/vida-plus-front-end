'use client'
import {
  CalendarDots,
  CarSimple,
  HouseSimple,
  ListBullets,
  Money
} from '@phosphor-icons/react'
import React from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()

  const navItems = [
    { name: 'Início', icon: <HouseSimple size={32} />, route: '/home' },
    { name: 'Finance', icon: <Money size={32} />, route: '/finance' },
    { name: 'Garage', icon: <CarSimple size={32} />, route: '/garage' },
    {
      name: 'Agenda',
      icon: <CalendarDots size={32} />,
      route: '/calendar'
    },
    {
      name: 'Checklists',
      icon: <ListBullets size={32} />,
      route: '/checklists'
    }
  ]

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 md:w-[40%] w-[90%] h-[60px] flex items-center justify-between rounded-3xl bg-white shadow-lg z-50">
      <div className="w-full flex items-center justify-between gap-3 px-4">
        {navItems.map((item, index) => {
          const isActive = pathname === item.route

          return (
            <button
              key={index}
              className={`flex items-center justify-center rounded-full p-2 transition-all duration-300 ${
                isActive ? 'scale-125 bg-blue-500 text-white' : 'text-gray-500'
              }`}
              onClick={() => router.push(item.route as never)}>
              {item.icon}
            </button>
          )
        })}
      </div>
    </div>
  )
}
