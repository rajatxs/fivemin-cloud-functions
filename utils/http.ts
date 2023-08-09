import { renderDefaultLayout } from './template'
import type { VercelResponse } from '@vercel/node'
import type { StatusPageData } from '../types/template'

/**
 * Serves computed HTML page content
 * @param res - Vercel Response
 * @param content - Page content
 */
export function servePageContent(res: VercelResponse, content: string) {
   res.setHeader('Content-Type', 'text/html')
   res.setHeader('Content-Length', content.length)
   res.send(content)
}

/** Serves 404 status page with default options */
export async function serve404Page(res: VercelResponse) {
   res.status(404)
   servePageContent(
      res,
      await renderDefaultLayout<StatusPageData>({
         pageTitle: 'Page not found',
         pageContent: '_status',
         statusImageUrl: 'images/404.svg',
         statusMessage: 'Page not found',
         statusDesc: "Oops! The page you're looking for can't be found.",
      })
   )
}

/** Serves 500 status page with default options */
export async function serve500Page(res: VercelResponse) {
   res.status(500)
   servePageContent(
      res,
      await renderDefaultLayout<StatusPageData>({
         pageTitle: 'Internal Server Error',
         pageContent: '_status',
         statusImageUrl: 'images/500.svg',
         statusMessage: 'Something went wrong',
         statusDesc: 'Oops! Something went wrong on our end. Please try again later',
      })
   )
}
