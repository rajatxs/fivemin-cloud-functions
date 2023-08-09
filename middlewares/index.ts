import { connect } from '../services/db'
import { serve500Page } from '../utils/http'
import log from '../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { AppNextFunction } from '@rxpm/vsfm'

export async function connectDatabase(req: VercelRequest, res: VercelResponse, next: AppNextFunction) {
   try {
      await connect()
   } catch (error) {
      log.error('Failed to establish database connection', error)
      return serve500Page(res)
   }

   next()
}
