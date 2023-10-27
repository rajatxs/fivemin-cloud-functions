import { getRecentPosts } from '../services/post'
import { getTopicName } from '../services/topic'
import { disconnect } from '../services/db'
import { connectDatabase } from '../middlewares'
import { compose } from '@rxpm/vsfm'
import { formatTime } from '../utils'
import { servePageContent, serve500Page } from '../utils/http'
import { renderDefaultLayout } from '../utils/template'
import { getPostCoverImageURL } from '../utils/post'
import log from '../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostDocumentMetadata } from '../types/post'
import type { IndexPageData } from '../types/template'
import meta from '../public/data/meta.json'

/**
 * Serves index page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
async function handler(req: VercelRequest, res: VercelResponse) {
   const limit = 12

   let posts: PostDocumentMetadata[]
   let pageIndex = Number(req.query.i || 0)

   try {
      posts = await getRecentPosts(limit, pageIndex * limit)
   } catch (error) {
      log.error('Failed to get recent posts', error)
      return serve500Page(res)
   }

   servePageContent(
      res,
      await renderDefaultLayout<IndexPageData>({
         pageTitle: 'Fivemin',
         pageContent: 'index',
         pageUrlEndpoint: '',
         openGraphDesc: meta.openGraphDescription,
         posts: posts.map((_post, _index) => {
            return {
               postUrl: `/${_post.slug}`,
               postIndex: _index + 1,
               postTitle: _post.title,
               postDesc: _post.desc,
               postTopic: getTopicName(_post.topic),
               postPublishTime: formatTime(_post.createdAt),
               postCoverImageUrl: getPostCoverImageURL(_post.coverImage.path),
            }
         }),
         pageIndex,
      })
   )

   await disconnect()
}

export default compose(connectDatabase, handler)
