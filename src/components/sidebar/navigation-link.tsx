'use client'

import Link from 'next/link'
import * as React from 'react'

import type {Icon} from '../icon'
import {GlobalNavigationContext} from '../providers'

interface NavigationLinkProps {
  link: {
    href: string
    label: string
    icon: Icon
    isActive: boolean
    trailingAccessory: Icon | null
    isExternal: boolean
  }
}

export function NavigationLink({
  link: {
    href,
    label,
    icon: NavIcon,
    trailingAccessory: Accessory,
    isActive,
    isExternal
  }
}: NavigationLinkProps) {
  const {setIsOpen} = React.useContext(GlobalNavigationContext)
  return (
    <li>
      <Link
        href={href}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        className={`flex flex-1 items-center space-x-3 rounded-md px-2 py-1.5 text-sm font-medium  ${
          isActive
            ? 'bg-black text-white hover:bg-black hover:text-white dark:bg-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white'
            : 'text-gray-700 dark:text-gray-200 sm:hover:bg-gray-200 sm:hover:text-gray-900 sm:dark:hover:bg-gray-700 sm:dark:hover:text-gray-200'
        }`}
        onClick={() => setIsOpen(false)}>
        <span className='flex w-4 items-center justify-center'>
          <NavIcon />
        </span>
        <span className='flex-1'>{label}</span>
        {Accessory && (
          <span className='flex w-4 items-center justify-center text-black text-opacity-40 dark:text-white'>
            <Accessory />
          </span>
        )}
      </Link>
    </li>
  )
}
