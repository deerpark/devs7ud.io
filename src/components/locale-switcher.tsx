'use client'

import {faEarth} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import {useLocale} from 'next-intl'

import {usePathname, useRouter} from '@/lib/i18nNavigation'
import {AppConfig} from '@/utils/AppConfig'

import {Button} from './ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu'

const LocaleIcons = {
  en: (
    <Image
      width={20}
      height={20}
      src='https://img.icons8.com/color/48/usa-circular.png'
      alt='belgium-circular'
    />
  ),
  ko: (
    <Image
      width={20}
      height={20}
      src='https://img.icons8.com/color/48/south-korea-circular.png'
      alt='south-korea-circular'
    />
  ),
  fr: (
    <Image
      width={20}
      height={20}
      src='https://img.icons8.com/color/48/france-circular.png'
      alt='france-circular'
    />
  )
}

export default function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const locale = useLocale()

  const handleChange = (newLocale: string): void => {
    if (!locale) return
    router.push(pathname, {locale: newLocale})
    router.refresh()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' className='space-x-1'>
          <FontAwesomeIcon
            icon={faEarth}
            className='size-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0'
          />
          <span>{locale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuLabel>Locale</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={locale} onValueChange={handleChange}>
          {AppConfig.locales.map((elt) => (
            <DropdownMenuRadioItem key={elt} value={elt}>
              {LocaleIcons[elt as keyof typeof LocaleIcons]}
              <span>{elt.toUpperCase()}</span>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
