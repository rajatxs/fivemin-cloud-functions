import { ObjectId, Binary } from "mongodb"

export interface PostCoverImage {
   id: string
   path: string
   refName: string
   refUrl: string
}

export interface PostDocument {
   _id: ObjectId
   title: string
   slug: string
   desc: string
   tags: string[]
   topic: string
   body: Binary
   stars: number
   authorId: ObjectId
   public: boolean
   coverImage: PostCoverImage
   related: ObjectId[]
   createdAt: Date
   updatedAt: Date
}

export type PostDocumentMetadata = Omit<PostDocument, 'body'>

export type PostRelatedDocument = Omit<PostDocument, 'tags'|'body'|'related'|'deleted'|'public'>

export interface PostAggregatedDocument extends Omit<PostDocument, 'related'> {
   relatedPosts: PostRelatedDocument[]
}

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
