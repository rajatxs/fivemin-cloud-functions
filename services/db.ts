import { MongoClient } from 'mongodb'
import { DB_URL, DB_NAME } from '../config/env'
import log from '../utils/log'
import type { Db } from 'mongodb'

var _client: MongoClient | null

export function db(): Db {
   // @ts-ignore
   return _client.db(DB_NAME)
}

/** Establish database connection */
export async function connect(): Promise<void> {
   if (_client) {
      return
   }

   _client = new MongoClient(DB_URL)

   try {
      await _client.connect()
   } catch (error) {
      log.error("Failed to establish database connection", error)
      return
   }
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
      log.error("Failed to close database connection", error)
      return
   }
}
