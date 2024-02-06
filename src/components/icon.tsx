import {
  faAddressCard as faAddressCardIcon,
  faArrowLeft as faArrowLeftIcon,
  faBars as faBarsIcon,
  faBlog as faBlogIcon,
  faBookmark as faBookmarkIcon,
  faCircleXmark as faCircleXmarkIcon,
  faHouse as faHouseIcon,
  faSquareArrowUpRight as faSquareArrowUpRightIcon,
  faWreathLaurel as faWreathLaurelIcon,
  faMoonStars as faMoonStarsIcon,
  faSun as faSunIcon,
  faDoNotEnter as faDoNotEnterIcon,
} from "@fortawesome/pro-duotone-svg-icons"
import {
  faGithub as faGithubIcon,
  faTwitterSquare as faTwitterSquareIcon,
} from "@fortawesome/free-brands-svg-icons"
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

// IconType을 사용하여 아이콘 정의를 받아오고, FontAwesomeIcon 컴포넌트에 전달합니다.
type IconType = IconDefinition
type IconProps = Omit<FontAwesomeIconProps, "icon">
export type Icon = (props: IconProps) => JSX.Element

interface FaIconProps extends IconProps {
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
export const FaBars = (props: IconProps) => (
  <FaIcon icon={faBarsIcon} {...props} />
)
export const FaCircleXmark = (props: IconProps) => (
  <FaIcon icon={faCircleXmarkIcon} {...props} />
)
export const FaHouseIcon = (props: IconProps) => (
  <FaIcon icon={faHouseIcon} {...props} />
)
export const FaBlogIcon = (props: IconProps) => (
  <FaIcon icon={faBlogIcon} {...props} />
)
export const FaBoomarkIcon = (props: IconProps) => (
  <FaIcon icon={faBookmarkIcon} {...props} />
)
export const FaAddressCardIcon = (props: IconProps) => (
  <FaIcon icon={faAddressCardIcon} {...props} />
)
export const FaWreathLaurelIcon = (props: IconProps) => (
  <FaIcon icon={faWreathLaurelIcon} {...props} />
)
export const FaSquareArrowUpRightIcon = (props: IconProps) => (
  <FaIcon icon={faSquareArrowUpRightIcon} {...props} />
)
export const FaTwitterSquareIcon = (props: IconProps) => (
  <FaIcon icon={faTwitterSquareIcon} {...props} />
)
export const FaGithubIcon = (props: IconProps) => (
  <FaIcon icon={faGithubIcon} {...props} />
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
