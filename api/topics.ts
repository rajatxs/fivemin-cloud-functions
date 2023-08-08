import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../middlewares'
import { disconnect } from '../services/db'
import { renderTopicsPage } from '../services/render'
import { servePageContent } from '../utils'
import type { VercelRequest, VercelResponse } from '@vercel/node'

async function handler(req: VercelRequest, res: VercelResponse) {
   servePageContent(res, await renderTopicsPage({}))
   await disconnect()
}

export default compose(connectDatabase, handler)
