export interface PageData {
   pageTitle: string
   pageContent: string
}

export interface PartialPostViewData {
   postUrl: string
   postIndex: number
   postTitle: string
   postDesc: string
   postTopic: string
   postPublishTime: string
   postCoverImageUrl: string
}

export interface PartialTopicViewData {
   topicId: string
   topicIndex: number
   topicUrl: string
   topicName: string
   topicThumbUrl: string
}


export interface IndexPageData extends PageData {
   posts: PartialPostViewData[]
}

export interface PostPageData extends PageData {
   postTitle: string
   postTopic: string
   postTopicUrl: string
   postDesc: string
   postPublishTime: string
   postCoverImageUrl: string
   postBody: string
}

export interface TopicsPageData extends PageData {
   postCount: number
   topics: PartialTopicViewData[]
}

export interface TopicPageData extends PageData {
   topicName: string
   postCount: number
   posts: PartialPostViewData[]
}

export interface StatusPageData extends PageData {
   statusImageUrl: string
   statusMessage: string
   statusDesc: string
}
