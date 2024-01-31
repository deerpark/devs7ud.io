import * as React from 'react'

import {NotionPage} from '@/components/notion/notion-page'
import {domain} from '@/lib/config'
import {resolveNotionPage} from '@/lib/resolve-notion-page'

export default function NotionDomainPage() {
  const props = async () => {
    try {
      const props = await resolveNotionPage(domain)

      return {props, revalidate: 10}
    } catch (err) {
      console.error('page error', domain, err)

      // we don't want to publish the error version of this page, so
      // let next.js know explicitly that incremental SSG failed
      throw err
    }
  }

  return <NotionPage {...props} />
}
