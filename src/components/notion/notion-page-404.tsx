import * as React from 'react'

import styles from '@/styles/styles.module.css'
import type * as types from '@/types/notion.type'

export const NotionPage404: React.FC<types.PageProps> = ({pageId, error}) => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>Notion Page Not Found</h1>

        {error ? (
          <p>{error.message}</p>
        ) : (
          pageId && (
            <p>
              Make sure that Notion page &quot;{pageId}&quot; is publicly
              accessible.
            </p>
          )
        )}

        <img src='/404.png' alt='404 Not Found' className={styles.errorImage} />
      </main>
    </div>
  )
}
