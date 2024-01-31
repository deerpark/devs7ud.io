import {getPageProperty} from 'notion-utils'

import type * as types from '@/types/notion.type'

export function getPageTweet(
  block: types.Block,
  recordMap: types.ExtendedRecordMap
): string | null {
  return getPageProperty('Tweet', block, recordMap)
}
