import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../../middlewares'
import { disconnect } from '../../services/db'
import { renderTopicPage } from '../../services/render'
import { getPostCountByTopic, getRecentPostsByTopic } from '../../services/post'
import { getTopicName } from '../../services/topic'
import { servePageContent, serve500Page } from '../../utils'
import log from '../../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostDocumentMetadata } from '../../types/post'

async function handler(req: VercelRequest, res: VercelResponse) {
   const id = String(req.query.id)
   const topicName = getTopicName(id)
   let postCount: number
   let posts: PostDocumentMetadata[]

   try {
      postCount = await getPostCountByTopic(id)
   } catch (error) {
      log.error('service:topic:single', error)
      return serve500Page(res)
   }

   try {
      posts = await getRecentPostsByTopic(id)
   } catch (error) {
      log.error('service:topic:single', error)
      return serve500Page(res)
   }

   servePageContent(res, await renderTopicPage({
      topicName,
      postCount,
      posts: [],
   }))
   await disconnect()
}

export default compose(connectDatabase, handler)
