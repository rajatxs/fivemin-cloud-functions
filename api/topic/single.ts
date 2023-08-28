import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../../middlewares'
import { disconnect } from '../../services/db'
import { getPostCountByTopic, getRecentPostsByTopic } from '../../services/post'
import { getTopicName } from '../../services/topic'
import { formatTime, truncateText } from '../../utils'
import { getPostCoverImageURL } from '../../utils/post'
import { renderDefaultLayout } from '../../utils/template'
import { servePageContent, serve500Page } from '../../utils/http'
import log from '../../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostDocumentMetadata } from '../../types/post'
import type { TopicPageData } from '../../types/template'

async function handler(req: VercelRequest, res: VercelResponse) {
   const limit = 6
   const id = String(req.query.id)
   const topicName = getTopicName(id)
   let postCount: number
   let posts: PostDocumentMetadata[]
   let pageIndex = Number(req.query.i || 0)

   try {
      postCount = await getPostCountByTopic(id)
   } catch (error) {
      log.error('service:topic:single', error)
      return serve500Page(res)
   }

   try {
      posts = await getRecentPostsByTopic(id, limit, pageIndex * limit)
   } catch (error) {
      log.error('service:topic:single', error)
      return serve500Page(res)
   }

   servePageContent(res, await renderDefaultLayout<TopicPageData>({
      pageTitle: topicName,
      pageContent: 'topic',
      pageUrlEndpoint: `/t/${id}`,
      topicName,
      postCount,
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
      pageIndex,
   }))

   await disconnect()
}

export default compose(connectDatabase, handler)
