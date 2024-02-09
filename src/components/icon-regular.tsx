import { faMailbox as faMailboxIcon } from "@fortawesome/pro-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FaIconProps, IconProps } from "./icon-duotone"

// 모든 FontAwesome 아이콘을 처리할 수 있는 범용 컴포넌트
const FaIcon = ({ icon, ...props }: FaIconProps) => (
  <FontAwesomeIcon icon={icon} {...props} />
)

// 각 아이콘을 위한 특정 컴포넌트 생성
export const FaMailbox = (props: IconProps) => (
  <FaIcon icon={faMailboxIcon} {...props} />
)
