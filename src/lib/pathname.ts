export function getPathnameFromUrl(urlString: string) {
  if (!urlString) return ""
  const parsedUrl = new URL(urlString)
  return parsedUrl.pathname
}
