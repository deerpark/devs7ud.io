import Keyv from '@keyvhq/core'
import KeyvRedis from '@keyvhq/redis'

import {isRedisEnabled, redisNamespace, redisUrl} from './config'

// eslint-disable-next-line import/no-mutable-exports
let db: Keyv = {} as Keyv
if (isRedisEnabled) {
  const keyvRedis = new KeyvRedis(redisUrl)
  db = new Keyv({store: keyvRedis, namespace: redisNamespace || undefined})
} else {
  db = new Keyv()
}

export {db}
