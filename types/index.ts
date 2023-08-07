export interface PageTemplateMetaData {
   title: string
}

export interface IndexPageTemplateData {
   title: string
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
