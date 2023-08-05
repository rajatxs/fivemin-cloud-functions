import { renderPostPage } from '../services/render'
import { servePageContent } from '../utils'
import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Serves post page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
   servePageContent(res, await renderPostPage({
      title: 'Post 1',
   }))
}
