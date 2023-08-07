import MarkdownIt from 'markdown-it'
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

export function formatTime(time: Date) {
   const currentTime = new Date()
   const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
   ]

   const month = months[time.getMonth()]

   if (time.getFullYear() === currentTime.getFullYear()) {
      return `${month} ${time.getDate()}`
   } else {
      return `${month} ${time.getDate()}, ${time.getFullYear()}`
   }
}

export function renderMarkdown(mdContent: string): string {
   return new MarkdownIt('default').render(mdContent, {})
}

export function truncateText(text: string, len: number) {
   if (text.length > len) {
      return text.substring(0, len - 3) + '...'
   }
   return text
}
