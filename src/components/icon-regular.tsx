import {
  faMailbox as faMailboxIcon,
  faLinkSimple as faLinkSimpleIcon,
  faHeadSide as faHeadSideIcon,
  faNewspaper as faNewspaperIcon,
  faPinata as faPinataIcon,
  faCampground as faCampgroundIcon,
  faAward as faAwardIcon,
  faEllipsisVertical as faEllipsisVerticalIcon,
  faBoxHeart as faBoxHeartIcon,
  faCalendarClock as faCalendarClockIcon,
  faMessageLines as faMessageLinesIcon,
} from "@fortawesome/pro-regular-svg-icons"
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
export const FaLinkSimple = (props: IconProps) => (
  <FaIcon icon={faLinkSimpleIcon} {...props} />
)
export const FaHeadSideIcon = (props: IconProps) => (
  <FaIcon icon={faHeadSideIcon} {...props} />
)
export const FaNewspaperIcon = (props: IconProps) => (
  <FaIcon icon={faNewspaperIcon} {...props} />
)
export const FaPinataIcon = (props: IconProps) => (
  <FaIcon icon={faPinataIcon} {...props} />
)
export const FaCampgroundIcon = (props: IconProps) => (
  <FaIcon icon={faCampgroundIcon} {...props} />
)
export const FaAwardIcon = (props: IconProps) => (
  <FaIcon icon={faAwardIcon} {...props} />
)
export const FaEllipsisVerticalIcon = (props: IconProps) => (
  <FaIcon icon={faEllipsisVerticalIcon} {...props} />
)
export const FaBoxHeartIcon = (props: IconProps) => (
  <FaIcon icon={faBoxHeartIcon} {...props} />
)
export const FaCalendarClockIcon = (props: IconProps) => (
  <FaIcon icon={faCalendarClockIcon} {...props} />
)
export const FaMessageLinesIcon = (props: IconProps) => (
  <FaIcon icon={faMessageLinesIcon} {...props} />
)
