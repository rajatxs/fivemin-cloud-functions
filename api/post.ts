import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../middlewares'
import { getPostBySlug } from '../services/post'
import { getTopicName } from '../services/topic'
import { disconnect } from '../services/db'
import { formatTime, renderMarkdown, getOpenGraphImageURL } from '../utils'
import { servePageContent, serve404Page, serve500Page } from '../utils/http'
import { getPostCoverImageURL } from '../utils/post'
import { renderDefaultLayout } from '../utils/template'
import log from '../utils/log'
import type { PostDocument } from '../types/post'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import type { PostPageData } from '../types/template'

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
      await renderDefaultLayout<PostPageData>({
         pageTitle: doc.title,
         postTitle: doc.title,
         pageKeywords: doc.tags,
         pageUrlEndpoint: `/${doc.slug}`,
         pageCoverImage: getOpenGraphImageURL(doc.coverImagePath),
         pageDesc: doc.desc,
         pageType: 'article',
         pageContent: 'post',
         postTopic: getTopicName(doc.topic),
         postTopicUrl: `/t/${doc.topic}`,
         postDesc: doc.desc,
         postPublishTime: formatTime(doc.createdAt),
         postCoverImageUrl: getPostCoverImageURL(doc.coverImagePath),
         postBody,
      })
   )

   await disconnect()
}

export default compose(connectDatabase, handler)
