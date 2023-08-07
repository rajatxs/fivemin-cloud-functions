import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../middlewares'
import { renderPostPage } from '../services/render'
import { getPostBySlug, getPostTopicName } from '../services/post'
import { disconnect } from '../services/db'
import {
   servePageContent,
   serve404Page,
   serve500Page,
   formatTime,
   renderMarkdown,
} from '../utils'
import log from '../utils/log'
import type { PostDocument } from '../types/post'
import type { VercelRequest, VercelResponse } from '@vercel/node'

/**
 * Serves post page
 * @route GET /
 * @param req - Request
 * @param res - Response
 */
async function handler(req: VercelRequest, res: VercelResponse) {
   const slug = String(req.query.slug)
   let doc: PostDocument, postBody: string

   try {
      doc = await getPostBySlug(slug)
   } catch (error) {
      log.error('Failed to get post document', error)
      return serve500Page(res)
   }

   if (!doc) {
      return serve404Page(res)
   }

   try {
      postBody = renderMarkdown(doc.body.toString('utf8'))
   } catch (error) {
      log.error('Failed to render post body', error)
      return serve500Page(res)
   }

   servePageContent(
      res,
      await renderPostPage({
         postTitle: doc.title,
         postTopic: getPostTopicName(doc.topic),
         postTopicUrl: `/t/${doc.topic}`,
         postDesc: doc.desc,
         postPublishTime: formatTime(doc.createdAt),
         postCoverImageUrl: doc.coverImageUrl,
         postBody,
      })
   )

   await disconnect()
}

export default compose(connectDatabase, handler)
