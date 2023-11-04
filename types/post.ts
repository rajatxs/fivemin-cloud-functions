import { ObjectId, Binary } from "mongodb"
import type { BlockDocument } from '@rxpm/fivemin-block-parser/lib/types'

export interface PostCoverImage {
   id: string
   path: string
   refName: string
   refUrl: string
}

export type PostRelatedDocument = Omit<PostDocument, 'tags'|'body'|'related'|'deleted'|'public'>

export type PostDocumentFormat = 'md'|'block'

export interface PostDocument {
   _id: ObjectId
   title: string
   slug: string
   desc: string
   tags: string[]
   topic: string
   body: Binary | BlockDocument
   stars: number
   authorId: ObjectId
   public: boolean
   format: PostDocumentFormat
   coverImage: PostCoverImage
   license: string
   relatedPosts: PostRelatedDocument[]
   createdAt: Date
   updatedAt: Date
}

export type PostDocumentMetadata = Omit<PostDocument, 'body'|'related'|'deleted'|'public'>

export interface PostSearchRecord {
   objectID: string
   name: string
   topic: string
   description: string
   tags: string[]
   url: string
   image: string
   createdAt: string
   updatedAt: string
}

export interface PostFeedData {
   popular: PostDocumentMetadata[]
   technology: PostDocumentMetadata[]
   science: PostDocumentMetadata[]
   programming: PostDocumentMetadata[]
}
