import type {Block, ExtendedRecordMap} from 'notion-types'
import * as React from 'react'

import {NotionPageActions} from '@/components/notion/notion-page-actions'
import {NotionPageSocial} from '@/components/notion/notion-page-social'
import {getPageTweet} from '@/lib/get-page-tweet'

export const NotionPageAside: React.FC<{
  block: Block
  recordMap: ExtendedRecordMap
  isBlogPost: boolean
}> = ({block, recordMap, isBlogPost}) => {
  if (!block) {
    return null
  }

  // only display comments and page actions on blog post pages
  if (isBlogPost) {
    const tweet = getPageTweet(block, recordMap)
    if (!tweet) {
      return null
    }

    return <NotionPageActions tweet={tweet} />
  }

  return <NotionPageSocial />
}
