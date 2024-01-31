import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import '@/styles/notion.css'
// global style overrides for prism theme (optional)
import '@/styles/prism-theme.css'

type PostsLayoutProps = {
  children: React.ReactNode;
}

export default function PostsLayout({
  children,
}: PostsLayoutProps) {
  return children
}
