import {
  faGithub as faGithubIcon,
  faTwitterSquare as faTwitterIcon,
  faFacebookF as faFacebookFIcon,
  faLine as faLineIcon,
  faLinkedinIn as faLinkedinInIcon,
  faPinterestP as faPinterestPIcon,
  faGetPocket as faGetPocketIcon,
  faRedditAlien as faRedditAlienIcon,
  faTelegram as faTelegramIcon,
  faTumblr as faTumblrIcon,
  faViber as faViberIcon,
  faVk as faVkIcon,
  faWeibo as faWeiboIcon,
  faWhatsapp as faWhatsappIcon,
} from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { FaIconProps, IconProps } from "./icon-duotone"

// 모든 FontAwesome 아이콘을 처리할 수 있는 범용 컴포넌트
const FaIcon = ({ icon, ...props }: FaIconProps) => (
  <FontAwesomeIcon icon={icon} {...props} />
)

// 각 아이콘을 위한 특정 컴포넌트 생성
export const FaGithubIcon = (props: IconProps) => (
  <FaIcon icon={faGithubIcon} {...props} />
)
export const FaTwitterIcon = (props: IconProps) => (
  <FaIcon icon={faTwitterIcon} {...props} />
)
export const FaFacebookFIcon = (props: IconProps) => (
  <FaIcon icon={faFacebookFIcon} {...props} />
)
export const FaLineIcon = (props: IconProps) => (
  <FaIcon icon={faLineIcon} {...props} />
)
export const FaLinkedinInIcon = (props: IconProps) => (
  <FaIcon icon={faLinkedinInIcon} {...props} />
)
export const FaPinterestPIcon = (props: IconProps) => (
  <FaIcon icon={faPinterestPIcon} {...props} />
)
export const FaGetPocketIcon = (props: IconProps) => (
  <FaIcon icon={faGetPocketIcon} {...props} />
)
export const FaRedditAlienIcon = (props: IconProps) => (
  <FaIcon icon={faRedditAlienIcon} {...props} />
)
export const FaTelegramIcon = (props: IconProps) => (
  <FaIcon icon={faTelegramIcon} {...props} />
)
export const FaTumblrIcon = (props: IconProps) => (
  <FaIcon icon={faTumblrIcon} {...props} />
)
export const FaViberIcon = (props: IconProps) => (
  <FaIcon icon={faViberIcon} {...props} />
)
export const FaVkIcon = (props: IconProps) => (
  <FaIcon icon={faVkIcon} {...props} />
)
export const FaWeiboIcon = (props: IconProps) => (
  <FaIcon icon={faWeiboIcon} {...props} />
)
export const FaWhatsappIcon = (props: IconProps) => (
  <FaIcon icon={faWhatsappIcon} {...props} />
)
