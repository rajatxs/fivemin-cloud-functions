import { compose } from '@rxpm/vsfm'
import { connectDatabase } from '../middlewares'
import { getPostBySlug } from '../services/post'
import { getTopicName } from '../services/topic'
import { disconnect } from '../services/db'
import { formatTime, getOpenGraphImageURL, getTimeFormat } from '../utils'
import { servePageContent, serve404Page, serve500Page } from '../utils/http'
import { getPostCoverImageURL } from '../utils/post'
import { renderDefaultLayout, getTimeInfo } from '../utils/template'
import { parseBlockDocument } from '../utils/block-parser'
import log from '../utils/log'
import type { BlockDocument } from '@rxpm/fivemin-block-parser/lib/types'
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
      if (doc.format === 'block') {
         postBody = parseBlockDocument(doc.body as BlockDocument)
      } else {
         postBody = ''
      }
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
         pageCoverImage: getOpenGraphImageURL(doc.coverImage.path),
         pageDesc: doc.desc,
         pageType: 'article',
         pageContent: 'post',
         postId: doc._id.toString(),
         postTopic: getTopicName(doc.topic),
         postTopicUrl: `/t/${doc.topic}`,
         postDesc: doc.desc,
         postTags: doc.tags.sort((a, b) => a.length - b.length).slice(0, 3),
         postPublishTime: getTimeInfo(doc.createdAt),
         postLastUpdateTime: getTimeInfo(doc.updatedAt),
         postCoverImageUrl: getPostCoverImageURL(doc.coverImage.path),
         postCoverImageRefName: doc.coverImage.refName,
         postCoverImageRefUrl: doc.coverImage.refUrl,
         postBody,
         postLicense: doc.license,
         relatedPosts: doc.relatedPosts.map((_relPost, _index) => {
            return {
               postUrl: `/${_relPost.slug}`,
               postIndex: _index + 1,
               postTitle: _relPost.title,
               postDesc: _relPost.desc,
               postTopic: getTopicName(_relPost.topic),
               postPublishTime: formatTime(_relPost.createdAt),
               postCoverImageUrl: getPostCoverImageURL(_relPost.coverImage.path),
            }
         }),
         autoHideNavbar: true,
      })
   )

   await disconnect()
}

export default compose(connectDatabase, handler)
