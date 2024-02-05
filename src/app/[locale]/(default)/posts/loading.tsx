import { faSpinnerThird } from "@fortawesome/pro-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function Loading() {
  return (
    <div className="flex size-full flex-1 items-center justify-center">
      <FontAwesomeIcon
        icon={faSpinnerThird}
        className="text-primary size-6 animate-spin"
      />
    </div>
  )
}
