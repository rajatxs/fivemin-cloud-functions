import { MongoClient } from 'mongodb'
import { DB_URL, DB_NAME } from '../config/env'
import log from '../utils/log'
import type { Db, Collection } from 'mongodb'

var _client: MongoClient | null

/** Returns reference of active database instance */
export function db(): Db {
   // @ts-ignore
   return _client.db(DB_NAME)
}

/** Returns reference of `posts` collection */
export function postCollection(): Collection {
   // @ts-ignore
   return _client.db(DB_NAME).collection('posts')
}

/** Establish database connection */
export async function connect(): Promise<void> {
   if (_client) {
      return
   }

   _client = new MongoClient(DB_URL)
   await _client.connect()
}

/** Closes active database connection */
export async function disconnect() {
   if (!_client) {
      return
   }

   try {
      await _client.close(false)
      _client = null
   } catch (error) {
      log.error('Failed to close database connection', error)
      return
   }
}
