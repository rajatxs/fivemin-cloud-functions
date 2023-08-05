import { renderIndexPage } from '../services/render'
import { servePageContent } from '../utils'
import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Serves index page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
export default async function handler(req: VercelRequest, res: VercelResponse) {
   servePageContent(res, await renderIndexPage({
      title: 'Fivemin - Empowering Ideas',
   }))
}
