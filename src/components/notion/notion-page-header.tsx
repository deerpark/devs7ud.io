import * as types from 'notion-types'
import { Breadcrumbs, Header, Search, useNotionContext } from 'react-notion-x'

import { isSearchEnabled, navigationLinks, navigationStyle } from '@/lib/config'

import styles from './styles.module.css'
import { cn } from '@/utils/cn'

export const NotionPageHeader: React.FC<{
  block: types.CollectionViewPageBlock | types.PageBlock
}> = ({ block }) => {
  const { components, mapPageUrl } = useNotionContext()

  if (navigationStyle === 'default') {
    return <Header block={block} />
  }

  return (
    <header className='notion-header'>
      <div className='notion-nav-header'>
        <Breadcrumbs block={block} rootOnly={true} />

        <div className='notion-nav-header-rhs breadcrumbs'>
          {navigationLinks
            ?.map((link, index) => {
              if (!link?.pageId && !link?.url) {
                return null
              }

              if (link?.pageId) {
                return (
                  <components.PageLink
                    href={mapPageUrl(link?.pageId)}
                    key={index}
                    className={cn(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link?.title}
                  </components.PageLink>
                )
              } else {
                return (
                  <components.Link
                    href={link?.url}
                    key={index}
                    className={cn(styles.navLink, 'breadcrumb', 'button')}
                  >
                    {link?.title}
                  </components.Link>
                )
              }
            })
            .filter(Boolean)}

          {isSearchEnabled && <Search block={block} title={null} />}
        </div>
      </div>
    </header>
  )
}