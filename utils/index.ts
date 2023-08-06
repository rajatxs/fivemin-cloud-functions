import type { VercelResponse } from '@vercel/node'
import { render404Page } from '../services/render'

export function servePageContent(res: VercelResponse, content: string) {
   res.setHeader('Content-Type', 'text/html')
   res.setHeader('Content-Length', content.length)
   res.send(content)
}

export async function serve404Page(res: VercelResponse) {
   res.status(404)
   servePageContent(res, await render404Page())
}
