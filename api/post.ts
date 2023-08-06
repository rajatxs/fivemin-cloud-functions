import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../middlewares'
import { renderPostPage } from '../services/render'
import { getPostBySlug } from '../services/post'
import { disconnect } from '../services/db'
import { servePageContent, serve404Page } from '../utils'
import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Serves post page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
async function handler(req: VercelRequest, res: VercelResponse) {
   const slug = String(req.query.slug)
   const doc = await getPostBySlug(slug)

   if (!doc) {
      return serve404Page(res)
   }

   servePageContent(res, await renderPostPage({
      title: doc.title,
   }))

   await disconnect()
}

export default compose(connectDatabase, handler)
