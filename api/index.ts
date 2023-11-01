import { getPopularPosts, getRecentPostsByTopic, parsePostViewDataList, getPostFeedData } from '../services/post'
import { disconnect } from '../services/db'
import { connectDatabase } from '../middlewares'
import { compose } from '@rxpm/vsfm'
import { servePageContent, serve500Page } from '../utils/http'
import { renderDefaultLayout } from '../utils/template'
import log from '../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostDocumentMetadata, PostFeedData } from '../types/post'
import type { IndexPageData } from '../types/template'
import meta from '../public/data/meta.json'

/**
 * Serves index page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
async function handler(req: VercelRequest, res: VercelResponse) {
   let feedData: PostFeedData
   let pageIndex = Number(req.query.i || 0)

   try {
      feedData = await getPostFeedData()
   } catch (error) {
      log.error('Failed to get post feed data', error)
      return serve500Page(res)
   }

   servePageContent(
      res,
      await renderDefaultLayout<IndexPageData>({
         pageTitle: 'Fivemin',
         pageContent: 'index',
         pageUrlEndpoint: '',
         openGraphDesc: meta.openGraphDescription,
         popularPosts: parsePostViewDataList(feedData.popular),
         technologyPosts: parsePostViewDataList(feedData.technology),
         sciencePosts: parsePostViewDataList(feedData.science),
         programmingPosts: parsePostViewDataList(feedData.programming),
         pageIndex,
      })
   )

   await disconnect()
}

export default compose(connectDatabase, handler)
