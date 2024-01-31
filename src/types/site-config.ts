import type {NavigationStyle, PageUrlOverridesMap} from '@/types/notion.type'

export interface SiteConfig {
  rootNotionPageId: string
  rootNotionSpaceId?: string

  name: string
  domain: string
  author: string
  description?: string
  language?: string

  twitter?: string
  github?: string
  linkedin?: string
  newsletter?: string
  youtube?: string

  defaultPageIcon?: string | null
  defaultPageCover?: string | null
  defaultPageCoverPosition?: number | null

  isPreviewImageSupportEnabled?: boolean
  isTweetEmbedSupportEnabled?: boolean
  isRedisEnabled?: boolean
  isSearchEnabled?: boolean

  includeNotionIdInUrls?: boolean
  pageUrlOverrides?: PageUrlOverridesMap
  pageUrlAdditions?: PageUrlOverridesMap

  navigationStyle?: NavigationStyle
  navigationLinks?: Array<NavigationLink>
}

export interface NavigationLink {
  title: string
  pageId?: string
  url?: string
}

export const siteConfig = (config: SiteConfig): SiteConfig => {
  return config
}
