import { servePageContent } from '../utils/http'
import { renderDefaultLayout } from '../utils/template'
import { CONTACT_EMAIL } from '../config/env'
import type { PrivacyPageData } from '../types/template'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function (req: VercelRequest, res: VercelResponse) {
   servePageContent(
      res,
      await renderDefaultLayout<PrivacyPageData>({
         pageTitle: 'Privacy Policy',
         pageContent: 'privacy',
         pageUrlEndpoint: '/privacy',
         pageDesc: 'Fivemin is a website owned and operated by Rajat. This Privacy Policy describes how we collect, use, and share your information when you visit or use the Website.',
         pageKeywords: [
            'Privacy',
            'Privacy Policy',
            'Fivemin Privacy',
            'Fivemin Security',
            'Fivemin Cookies',
            'Fivemin Rights',
            'Fivemin Third Party Sharing',
         ],
         pageType: 'article',
         contactEmail: CONTACT_EMAIL,
      })
   )
}
