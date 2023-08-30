import { formatTime, truncateText } from '../utils'
import { servePageContent, serve500Page } from '../utils/http'
import { renderDefaultLayout } from '../utils/template'
import { postIndex } from '../utils/algolia'
import log from '../utils/log'
import type { PostSearchRecord } from '../types/post'
import type { SearchPageData } from '../types/template'
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function (req: VercelRequest, res: VercelResponse) {
   let query = String(req.query.q || '')
   let records: PostSearchRecord[]

   if (query.length) {
      query = decodeURI(query)

      try {
         const result = await postIndex().search<PostSearchRecord>(query, { length: 6 })
         
         if (Array.isArray(result.hits)) {
            records = result.hits
         } else {
            records = []
         }
      } catch (error) {
         log.error('Failed to get post documents', error)
         return serve500Page(res)
      }
   } else {
      records = []
   }

   servePageContent(
      res,
      await renderDefaultLayout<SearchPageData>({
         pageTitle: 'Search',
         pageContent: 'search',
         pageUrlEndpoint: '/search',
         pageDesc: 'Find the latest blog posts on a variety of topics, including Science, Technology and Finance. Search by keyword or title to quickly find the content you\'re looking for. Updated daily.',
         pageKeywords: [
            'Search',
            'Fivemin Search',
         ],
         pageType: 'website',
         searchQuery: query,
         totalResults: records.length,
         posts: records.map((_record, _index) => {
            return {
               postUrl: _record.url,
               postIndex: _index + 1,
               postTitle: _record.name,
               postDesc: truncateText(_record.description, 90),
               postTopic: _record.topic,
               postPublishTime: formatTime(new Date(_record.createdAt)),
               postCoverImageUrl: _record.image,
            }
         }),
      })
   )
}
