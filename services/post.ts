import { postCollection } from './db'
import { PostDocumentMetadata, PostAggregatedDocument } from '../types/post'

/**
 * Returns single `PostDocument` document by given `slug`
 * @param slug - Post slug
 */
export async function getPostBySlug(
   slug: string
): Promise<PostAggregatedDocument | null> {
   const res = await postCollection()
      .aggregate<PostAggregatedDocument>([
         {
            $match: {
               slug,
               public: true,
               deleted: false,
            },
         },
         {
            $lookup: {
               from: 'posts',
               localField: 'related',
               foreignField: '_id',
               as: 'relatedPosts',
               pipeline: [
                  {
                     $match: {
                        public: true,
                        deleted: false,
                     },
                  },
                  {
                     $project: {
                        tags: 0,
                        body: 0,
                        deleted: 0,
                        public: 0,
                        related: 0,
                     },
                  },
               ],
            },
         },
      ])
      .toArray()

   if (Array.isArray(res) && res.length > 0) {
      return res[0]
   } else {
      return null
   }

   // return postCollection().findOne<PostDocument>({ slug, public: true, deleted: false })
}

/**
 * Returns list of recent post metadata
 * @param limit - Number of posts
 * @param skip - Skip number of posts
 */
export function getRecentPosts(limit: number = 6, skip: number = 0) {
   return postCollection()
      .find<PostDocumentMetadata>(
         {
            public: true,
            deleted: false,
         },
         {
            projection: {
               body: false,
            },
            limit,
            skip,
         }
      )
      .sort({ createdAt: -1 })
      .toArray()
}

/**
 * Returns list of recent post metadata by given `topic`
 * @param topic - Topic Id
 * @param limit - Number of posts
 */
export function getRecentPostsByTopic(
   topic: string,
   limit: number = 6,
   skip: number = 0
): Promise<PostDocumentMetadata[]> {
   return postCollection()
      .find<PostDocumentMetadata>(
         { public: true, deleted: false, topic },
         { projection: { body: false }, limit, skip }
      )
      .sort({ createdAt: -1 })
      .toArray()
}

/** Returns number of public posts */
export function getPostCount(): Promise<number> {
   return postCollection().countDocuments({ public: true, deleted: false })
}

/**
 * Returns number of public posts by given `topic`
 * @param topic - Topic Id
 */
export function getPostCountByTopic(topic: string): Promise<number> {
   return postCollection().countDocuments({ public: true, deleted: false, topic })
}
