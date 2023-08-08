import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../middlewares'
import { disconnect } from '../services/db'
import { renderTopicsPage } from '../services/render'
import { getAllTopics } from '../services/topic'
import { servePageContent } from '../utils'
import type { VercelRequest, VercelResponse } from '@vercel/node'

async function handler(req: VercelRequest, res: VercelResponse) {
   const topics = getAllTopics()

   servePageContent(res, await renderTopicsPage({
      topics: topics.map((_topic, _index) => {
         return {
            topicId: _topic.id,
            topicUrl: _topic.getRelativeUrl(),
            topicName: _topic.name,
            topicThumbUrl: _topic.getThumbUrl(),
         }
      })
   }))
   await disconnect()
}

export default compose(connectDatabase, handler)
