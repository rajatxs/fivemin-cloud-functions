import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../../middlewares'
import { disconnect } from '../../services/db'
import { getPostCount } from '../../services/post'
import { getAllTopics } from '../../services/topic'
import { servePageContent, serve500Page } from '../../utils'
import { renderDefaultLayout } from '../../utils/template'
import log from '../../utils/log'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { TopicsPageData } from '../../types/template'

async function handler(req: VercelRequest, res: VercelResponse) {
   const topics = getAllTopics()
   let postCount: number

   try {
      postCount = await getPostCount()
   } catch (error) {
      log.error('api:topic', error)
      return serve500Page(res)
   }

   servePageContent(res, await renderDefaultLayout<TopicsPageData>({
      pageTitle: 'Topics - Fivemin',
      pageContent: 'topics',
      postCount,
      topics: topics.map((_topic, _index) => {
         return {
            topicId: _topic.id,
            topicIndex: _index + 1,
            topicUrl: _topic.getRelativeUrl(),
            topicName: _topic.name,
            topicThumbUrl: _topic.getThumbUrl(),
         }
      })
   }))
   await disconnect()
}

export default compose(connectDatabase, handler)
