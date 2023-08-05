import type { VercelResponse } from '@vercel/node'

export function servePageContent(res: VercelResponse, content: string) {
   res.setHeader('Content-Type', 'text/html')
   res.setHeader('Content-Length', content.length)
   res.send(content)
}
