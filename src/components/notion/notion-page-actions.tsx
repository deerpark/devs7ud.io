import * as React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRetweet } from '@fortawesome/pro-solid-svg-icons'
import { faHeart } from '@fortawesome/pro-regular-svg-icons'

import styles from './styles.module.css'

/**
 * @see https://developer.twitter.com/en/docs/twitter-for-websites/web-intents/overview
 */
export const NotionPageActions: React.FC<{ tweet: string }> = ({ tweet }) => {
  return (
    <div className={styles.pageActions}>
      <a
        className={styles.likeTweet}
        href={`https://twitter.com/intent/like?tweet_id=${tweet}`}
        target='_blank'
        rel='noopener noreferrer'
        title='Like this post on Twitter'
      >
        <FontAwesomeIcon icon={faHeart} />
      </a>

      <a
        className={styles.retweet}
        href={`https://twitter.com/intent/retweet?tweet_id=${tweet}`}
        target='_blank'
        rel='noopener noreferrer'
        title='Retweet this post on Twitter'
      >
        <FontAwesomeIcon icon={faRetweet} />
      </a>
    </div>
  )
}