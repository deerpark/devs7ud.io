import type {PageObjectResponse} from '@notionhq/client/build/src/api-endpoints'
import Link from 'next/link'

interface PostsProps {
  data: PageObjectResponse[]
}

export function Posts(props: PostsProps) {
  const {data} = props

  return (
    <ul>
      {data.map((post) => (
        <li key={post.id}>
          <Link
            href={`/posts/${(post.properties?.Slug as any)?.rich_text[0].plain_text}`}>
            {(post.properties?.Title as any)?.title[0]?.plain_text}
          </Link>
        </li>
      ))}
    </ul>
  )
}
