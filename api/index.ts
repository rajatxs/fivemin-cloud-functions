import { getRecentPosts } from '../services/post'
import { getTopicName } from '../services/topic'
import { disconnect } from '../services/db'
import { connectDatabase } from '../middlewares'
import { compose } from '@rxpm/vsfm'
import { renderIndexPage } from '../services/render'
import { servePageContent, serve500Page, formatTime, truncateText } from '../utils'
import { getPostCoverImageURL } from '../utils/post'
import log from '../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostDocumentMetadata } from '../types/post'

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
      await renderIndexPage({
         title: 'Fivemin - Empowering Ideas',
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
