'use client'
import {
  Bell,
  X,
  List,
  HouseSimple,
  Money,
  CarSimple,
  CalendarDots,
  ListBullets
} from '@phosphor-icons/react'
import React from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const navItems = [
    { name: 'Início', icon: <HouseSimple size={20} />, route: '/home' },
    { name: 'Finance', icon: <Money size={20} />, route: '/finance' },
    { name: 'Garage', icon: <CarSimple size={20} />, route: '/garage' },
    {
      name: 'Agenda',
      icon: <CalendarDots size={20} />,
      route: '/calendar'
    },
    {
      name: 'Checklists',
      icon: <ListBullets size={20} />,
      route: '/checklists'
    }
  ]

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Disclosure as="nav" className="bg-black rounded-md">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="cursor-pointer group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-white focus:outline-hidden focus:ring-inset">
              <span className="absolute -inset-0.5" />
              <List size={30} className="block size-6 group-data-open:hidden" />
              <X size={30} className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img alt="Your Company" src="9.png" className="h-8 w-auto" />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {navItems.map((item, index: number) => {
                  const isActive = pathname === item.route

                  return (
                    <div
                      key={index}
                      onClick={() => {
                        router.push(item.route)
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={classNames(
                        isActive
                          ? 'bg-gray-700 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md px-3 py-2 text-sm font-medium cursor-pointer select-none'
                      )}>
                      <div className="flex justify-start items-center gap-3">
                        {item.icon}
                        {item.name}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <label className="relative" htmlFor="abaLateralNotificacoes">
              <Bell
                size={30}
                className="text-white cursor-pointer rounded-full p-1 hover:bg-gray-100/30 active:scale-90 duration-200"
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                2
              </span>
            </label>

            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <MenuButton className="cursor-pointer relative flex rounded-full bg-gray-1200 text-sm focus:outline-hidden focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800">
                <span className="absolute -inset-1.5" />
                <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full"
                />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                    Perfil
                  </a>
                </MenuItem>
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">
                    Sair
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pt-2 pb-3">
          {navItems.map((item, index) => {
            const isActive = pathname === item.route

            return (
              <div
                key={index}
                onClick={() => {
                  router.push(item.route)
                }}
                aria-current={isActive ? 'page' : undefined}
                className={classNames(
                  isActive
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                  'block rounded-md px-3 py-2 text-base font-medium select-none'
                )}>
                <div className="flex justify-start items-center gap-3">
                  {item.icon}
                  {item.name}
                </div>
              </div>
            )
          })}
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
