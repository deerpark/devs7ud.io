import {
  faAddressCard as faAddressCardIcon,
  faArrowLeft as faArrowLeftIcon,
  faArrowRight as faArrowRightIcon,
  faBars as faBarsIcon,
  faBlog as faBlogIcon,
  faBookmark as faBookmarkIcon,
  faCircleXmark as faCircleXmarkIcon,
  faXmark as faXmarkIcon,
  faHouse as faHouseIcon,
  faArrowUpRight as faArrowUpRightIcon,
  faWreathLaurel as faWreathLaurelIcon,
  faMoonStars as faMoonStarsIcon,
  faSun as faSunIcon,
  faBomb as faBombIcon,
  faDoNotEnter as faDoNotEnterIcon,
  faMessageLines as faMessageLinesIcon,
  faMessages as faMessagesIcon,
  faSpinnerThird as faSpinnerThirdIcon,
  faAnglesUpDown as faAnglesUpDownIcon,
  faCheck as faCheckIcon,
  faLanguage as faLanguageIcon,
  faUserTie as faUserTieIcon,
  faLink as faLinkIcon,
  faEllipsisVertical as faEllipsisVerticalIcon,
  faArrowUpFromBracket as faArrowUpFromBracketIcon,
  faUpToLine as faUpToLineIcon,
  faSwatchbook as faSwatchbookIcon,
  faSearch as faSearchIcon,
  faUserLock as faUserLockIcon,
  faCalendarClock as faCalendarClockIcon,
} from "@fortawesome/pro-duotone-svg-icons"
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// IconType을 사용하여 아이콘 정의를 받아오고, FontAwesomeIcon 컴포넌트에 전달합니다.
type IconType = IconDefinition
export type IconProps = Omit<FontAwesomeIconProps, "icon">
export type Icon = (props: IconProps) => JSX.Element

export interface FaIconProps extends IconProps {
  icon: IconType
}

// 모든 FontAwesome 아이콘을 처리할 수 있는 범용 컴포넌트
const FaIcon = ({ icon, ...props }: FaIconProps) => (
  <FontAwesomeIcon icon={icon} {...props} />
)

// 각 아이콘을 위한 특정 컴포넌트 생성
export const FaArrowLeft = (props: IconProps) => (
  <FaIcon icon={faArrowLeftIcon} {...props} />
)
export const FaArrowRight = (props: IconProps) => (
  <FaIcon icon={faArrowRightIcon} {...props} />
)
export const FaBars = (props: IconProps) => (
  <FaIcon icon={faBarsIcon} {...props} />
)
export const FaCircleXmark = (props: IconProps) => (
  <FaIcon icon={faCircleXmarkIcon} {...props} />
)
export const FaXmark = (props: IconProps) => (
  <FaIcon icon={faXmarkIcon} {...props} />
)
export const FaHouseIcon = (props: IconProps) => (
  <FaIcon icon={faHouseIcon} {...props} />
)
export const FaBlogIcon = (props: IconProps) => (
  <FaIcon icon={faBlogIcon} {...props} />
)
export const FaBookmarkIcon = (props: IconProps) => (
  <FaIcon icon={faBookmarkIcon} {...props} />
)
export const FaAddressCardIcon = (props: IconProps) => (
  <FaIcon icon={faAddressCardIcon} {...props} />
)
export const FaWreathLaurelIcon = (props: IconProps) => (
  <FaIcon icon={faWreathLaurelIcon} {...props} />
)
export const FaArrowUpRightIcon = (props: IconProps) => (
  <FaIcon icon={faArrowUpRightIcon} {...props} />
)
export const FaMoonStarsIcon = (props: IconProps) => (
  <FaIcon icon={faMoonStarsIcon} {...props} />
)
export const FaSunIcon = (props: IconProps) => (
  <FaIcon icon={faSunIcon} {...props} />
)
export const FaDoNotEnterIcon = (props: IconProps) => (
  <FaIcon icon={faDoNotEnterIcon} {...props} />
)
export const FaBombIcon = (props: IconProps) => (
  <FaIcon icon={faBombIcon} {...props} />
)
export const FaMessageLinesIcon = (props: IconProps) => (
  <FaIcon icon={faMessageLinesIcon} {...props} />
)
export const FaSpinnerThirdIcon = (props: IconProps) => (
  <FaIcon icon={faSpinnerThirdIcon} {...props} />
)
export const FaMessagesIcon = (props: IconProps) => (
  <FaIcon icon={faMessagesIcon} {...props} />
)
export const FaAnglesUpDownIcon = (props: IconProps) => (
  <FaIcon icon={faAnglesUpDownIcon} {...props} />
)
export const FaCheckIcon = (props: IconProps) => (
  <FaIcon icon={faCheckIcon} {...props} />
)
export const FaLanguageIcon = (props: IconProps) => (
  <FaIcon icon={faLanguageIcon} {...props} />
)
export const FaUserTieIcon = (props: IconProps) => (
  <FaIcon icon={faUserTieIcon} {...props} />
)
export const FaLinkIcon = (props: IconProps) => (
  <FaIcon icon={faLinkIcon} {...props} />
)
export const FaEllipsisVerticalIcon = (props: IconProps) => (
  <FaIcon icon={faEllipsisVerticalIcon} {...props} />
)
export const FaArrowUpFromBracketIcon = (props: IconProps) => (
  <FaIcon icon={faArrowUpFromBracketIcon} {...props} />
)
export const FaUpToLineIcon = (props: IconProps) => (
  <FaIcon icon={faUpToLineIcon} {...props} />
)
export const FaSwatchbookIcon = (props: IconProps) => (
  <FaIcon icon={faSwatchbookIcon} {...props} />
)
export const FaSearchIcon = (props: IconProps) => (
  <FaIcon icon={faSearchIcon} {...props} />
)
export const FaUserLockIcon = (props: IconProps) => (
  <FaIcon icon={faUserLockIcon} {...props} />
)
export const FaCalendarClockIcon = (props: IconProps) => (
  <FaIcon icon={faCalendarClockIcon} {...props} />
)
