import { servePageContent } from '../utils/http'
import { renderDefaultLayout } from '../utils/template'
import { CONTACT_EMAIL } from '../config/env'
import type { TermsPageData } from '../types/template'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function (req: VercelRequest, res: VercelResponse) {
   servePageContent(
      res,
      await renderDefaultLayout<TermsPageData>({
         pageTitle: 'Terms and Conditions',
         pageContent: 'terms',
         pageUrlEndpoint: '/terms',
         pageDesc: 'Fivemin (the "Website") is a website owned and operated by Rajat. These Terms and Conditions (the "Terms") govern your access and use of the Website.',
         pageKeywords: [
            'Terms',
            'Conditions',
            'Terms Conditions',
            'Terms and Conditions',
            'Terms & Conditions',
            'Fivemin Terms',
            'Fivemin Conditions',
            'Fivemin Terms and Conditions',
         ],
         pageType: 'article',
         contactEmail: CONTACT_EMAIL,
         autoHideNavbar: true,
      })
   )
}
