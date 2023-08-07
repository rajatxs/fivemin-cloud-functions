export interface PageTemplateMetaData {
   title: string
}

export interface IndexPagePostTemplateData {
   postUrl: string
   postIndex: number
   postTitle: string
   postDesc: string
   postTopic: string
   postPublishTime: string
   postCoverImageUrl: string
}
export interface IndexPageTemplateData {
   title: string
   posts: IndexPagePostTemplateData[]
}

export interface PostPageTemplateData {
   postTitle: string
   postTopic: string
   postTopicUrl: string
   postDesc: string
   postPublishTime: string
   postCoverImageUrl: string
   postBody: string
}

export interface StatusPageTemplateData {
   message: string
   imageUrl: string
   desc: string
}
