import { render404Page, render500Page } from '../services/render'
import type { VercelResponse } from '@vercel/node'

export function servePageContent(res: VercelResponse, content: string) {
   res.setHeader('Content-Type', 'text/html')
   res.setHeader('Content-Length', content.length)
   res.send(content)
}

export async function serve404Page(res: VercelResponse) {
   res.status(404)
   servePageContent(res, await render404Page())
}

export async function serve500Page(res: VercelResponse) {
   res.status(500)
   servePageContent(res, await render500Page())
}
