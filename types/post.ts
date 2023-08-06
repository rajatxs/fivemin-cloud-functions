import { ObjectId, Binary } from "mongodb"

export interface PostDocument {
   _id: ObjectId
   title: string
   slug: string
   desc: string
   tags: string[]
   topic: string
   coverImageUrl: string
   body: Binary
   stars: number
   authorId: ObjectId
   public: boolean
   createdAt: Date
   updatedAt: Date
}
