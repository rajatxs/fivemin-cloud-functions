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

export function createSlug(text: string): string {
   return text
      .toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/[^\w\-]+/g, '') // Remove non-word characters
      .replace(/\-\-+/g, '-') // Replace multiple hyphens with a single hyphen
      .replace(/^-+|-+$/g, '') // Trim hyphens from the beginning and end
}
