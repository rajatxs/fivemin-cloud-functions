import { getRecentPosts } from '../services/post'
import { getTopicName } from '../services/topic'
import { disconnect } from '../services/db'
import { connectDatabase } from '../middlewares'
import { compose } from '@rxpm/vsfm'
import { formatTime, truncateText } from '../utils'
import { servePageContent, serve500Page } from '../utils/http'
import { renderDefaultLayout } from '../utils/template'
import { getPostCoverImageURL } from '../utils/post'
import log from '../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostDocumentMetadata } from '../types/post'
import type { IndexPageData } from '../types/template'

/**
 * Serves index page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
async function handler(req: VercelRequest, res: VercelResponse) {
   let posts: PostDocumentMetadata[]

   try {
      posts = await getRecentPosts()
   } catch (error) {
      log.error('Failed to get recent posts', error)
      return serve500Page(res)
   }

   servePageContent(
      res,
      await renderDefaultLayout<IndexPageData>({
         pageTitle: 'Fivemin - Empowering Ideas',
         pageContent: 'index',
         posts: posts.map((_post, _index) => {
            return {
               postUrl: `/${_post.slug}`,
               postIndex: _index + 1,
               postTitle: _post.title,
               postDesc: truncateText(_post.desc, 90),
               postTopic: getTopicName(_post.topic),
               postPublishTime: formatTime(_post.createdAt),
               postCoverImageUrl: getPostCoverImageURL(_post.coverImagePath),
            }
         }),
      })
   )

   await disconnect()
}

export default compose(connectDatabase, handler)
