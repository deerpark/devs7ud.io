import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import {faNewspaper} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as React from 'react'

import * as config from '@/lib/config'
import styles from '@/styles/page-social.module.css'
import {cn} from '@/utils/cn'

interface SocialLink {
  name: string
  title: string
  icon: React.ReactNode
  href?: string
}

const socialLinks: SocialLink[] = [
  ...(config.twitter
    ? [
        {
          name: 'twitter',
          href: `https://twitter.com/${config.twitter}`,
          title: `Twitter @${config.twitter}`,
          icon: <FontAwesomeIcon icon={faTwitter} />
        }
      ]
    : []),

  ...(config.twitter
    ? [
        {
          name: 'github',
          href: `https://github.com/${config.github}`,
          title: `GitHub @${config.github}`,
          icon: <FontAwesomeIcon icon={faGithub} />
        }
      ]
    : []),

  ...(config.twitter
    ? [
        {
          name: 'linkedin',
          href: `https://www.linkedin.com/in/${config.linkedin}`,
          title: `LinkedIn ${config.author}`,
          icon: <FontAwesomeIcon icon={faLinkedin} />
        }
      ]
    : []),

  ...(config.twitter
    ? [
        {
          name: 'newsletter',
          href: `${config.newsletter}`,
          title: `Newsletter ${config.author}`,
          icon: <FontAwesomeIcon icon={faNewspaper} />
        }
      ]
    : []),

  ...(config.twitter
    ? [
        {
          name: 'youtube',
          href: `https://www.youtube.com/${config.youtube}`,
          title: `YouTube ${config.youtube}`,
          icon: <FontAwesomeIcon icon={faYoutube} />
        }
      ]
    : [])
]

export const NotionPageSocial: React.FC = () => {
  return (
    <div className={styles.pageSocial}>
      {socialLinks.map((action) => (
        <a
          className={cn(styles.action, styles[action.name])}
          href={action.href}
          key={action.name}
          title={action.title}
          target='_blank'
          rel='noopener noreferrer'>
          <div className={styles.actionBg}>
            <div className={styles.actionBgPane} />
          </div>

          <div className={styles.actionBg}>{action.icon}</div>
        </a>
      ))}
    </div>
  )
}
