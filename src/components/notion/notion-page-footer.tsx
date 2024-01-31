import {
  faGithub,
  faLinkedin,
  faTwitter,
  faYoutube
} from '@fortawesome/free-brands-svg-icons'
import {faEnvelopeOpenText} from '@fortawesome/pro-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import * as React from 'react'

/* import { faSun, faMoonStars } from '@fortawesome/pro-duotone-svg-icons' */
import * as config from '@/lib/config'
import styles from '@/styles/styles.module.css'

import {ThemeToggle} from '../theme-toggle'

// TODO: merge the data and icons from PageSocial with the social links in Footer

export const FooterImpl: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        Copyright {currentYear} {config.author}
      </div>

      <div className={styles.settings}>
        <ThemeToggle />
      </div>

      <div className={styles.social}>
        {config.twitter && (
          <a
            className={styles.twitter}
            href={`https://twitter.com/${config.twitter}`}
            title={`Twitter @${config.twitter}`}
            target='_blank'
            rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faTwitter} />
          </a>
        )}

        {config.github && (
          <a
            className={styles.github}
            href={`https://github.com/${config.github}`}
            title={`GitHub @${config.github}`}
            target='_blank'
            rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faGithub} />
          </a>
        )}

        {config.linkedin && (
          <a
            className={styles.linkedin}
            href={`https://www.linkedin.com/in/${config.linkedin}`}
            title={`LinkedIn ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
        )}

        {config.newsletter && (
          <a
            className={styles.newsletter}
            href={`${config.newsletter}`}
            title={`Newsletter ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faEnvelopeOpenText} />
          </a>
        )}

        {config.youtube && (
          <a
            className={styles.youtube}
            href={`https://www.youtube.com/${config.youtube}`}
            title={`YouTube ${config.author}`}
            target='_blank'
            rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faYoutube} />
          </a>
        )}
      </div>
    </footer>
  )
}

export const NotionPageFooter = React.memo(FooterImpl)
