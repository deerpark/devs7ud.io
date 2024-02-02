import {faBomb} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {Button} from '@/components/ui/button'
import {Heading} from '@/components/ui/typography'

interface ErorProps {
  children: React.ReactNode
  reset: () => void
}

export default function Error({children, reset}: ErorProps) {
  return (
    <div className='container flex flex-col items-center space-y-5'>
      <FontAwesomeIcon icon={faBomb} />
      <div className='flex flex-col items-center space-y-3'>
        <Heading tag='h1'>예기치 않은 에러가 발생 했습니다.</Heading>
        <Button onClick={() => reset()}>재시도</Button>
      </div>
      {children}
    </div>
  )
}
