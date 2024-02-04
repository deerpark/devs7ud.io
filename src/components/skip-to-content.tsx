import {faForward} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import {Alert, AlertDescription, AlertTitle} from './ui/alert'

export default function SkipToContent() {
  return (
    <Alert className='fixed w-auto -translate-x-full translate-y-5 transition-transform duration-500 ease-in focus-within:translate-x-5 focus-within:ease-out'>
      <FontAwesomeIcon icon={faForward} className='size-4' />
      <AlertTitle>
        <a href='#main'>Skip to content</a>
      </AlertTitle>
      <AlertDescription className='flex space-x-1'>
        <span>(if available)</span>
        <span>or</span>
        <a href='#list'>jump to list</a>
        <span>(if available)</span>
      </AlertDescription>
    </Alert>
  )
}
