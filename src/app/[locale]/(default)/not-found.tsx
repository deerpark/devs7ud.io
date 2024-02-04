/* eslint-disable jsx-a11y/anchor-is-valid */

import '@fortawesome/fontawesome-svg-core/styles.css'
import '@/styles/global.css'

import {faDoNotEnter} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {headers} from 'next/headers'
import Link from 'next/link'

import {Button} from '@/components/ui/button'
import {Heading, P} from '@/components/ui/typography'

export {metadata} from '@/lib/metadata'
export {viewport} from '@/lib/viewport'

export default async function NotFound() {
  const headersList = headers()
  const domain = headersList.get('host')
  return (
    <div className='container flex flex-col items-center space-y-5'>
      <FontAwesomeIcon icon={faDoNotEnter} />
      <div className='flex flex-col items-center space-y-3'>
        <Heading tag='h1'>요청된 리소스를 찾을 수 없습니다.</Heading>
        <P>domain: {domain}</P>
        <Link href='/' passHref>
          <Button variant='link'>처음으로 이동</Button>
        </Link>
      </div>
    </div>
  )
}
