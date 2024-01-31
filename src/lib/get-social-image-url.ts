import {api, host} from './config'

export function getSocialImageUrl(pageId: string) {
  try {
    const url = new URL(api.getSocialImage, host)

    if (pageId) {
      url.searchParams.set('id', pageId)
      return url.toString()
    }
  } catch (err) {
    const error = err as unknown as {message: string}
    console.warn('error invalid social image url', pageId, error.message)
  }

  return null
}
