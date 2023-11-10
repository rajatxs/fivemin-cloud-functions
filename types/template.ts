import type { IndexPagePostTemplateData } from './index'

export interface TimeInfo {
   value: Date
   format: string
   readable: string
}

export interface PageData {
   pageTitle: string
   pageContent: string
   pageDesc?: string
   pageKeywords?: string[]
   pageType?: string
   pageUrlEndpoint?: string
   pageCoverImage?: string
   openGraphDesc?: string
   autoHideNavbar?: boolean
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
   popularPosts: PartialPostViewData[]
   technologyPosts: PartialPostViewData[]
   sciencePosts: PartialPostViewData[]
   programmingPosts: PartialPostViewData[]
   pageIndex: number
}

export interface PostPageData extends PageData {
   postId: string
   postTitle: string
   postTopic: string
   postTopicUrl: string
   postDesc: string
   postTags: string[]
   postPublishTime: TimeInfo
   postLastUpdateTime: TimeInfo
   postCoverImageUrl: string
   postCoverImageRefName: string
   postCoverImageRefUrl: string
   postBody: string
   postLicense: string
   relatedPosts: IndexPagePostTemplateData[]
}

export interface TopicsPageData extends PageData {
   postCount: number
   topics: PartialTopicViewData[]
}

export interface TopicPageData extends PageData {
   topicName: string
   postCount: number
   posts: PartialPostViewData[]
   pageIndex: number
}

export interface StatusPageData extends PageData {
   statusImageUrl: string
   statusMessage: string
   statusDesc: string
}

export interface PrivacyPageData extends PageData {
   contactEmail: string
}

export type TermsPageData = PrivacyPageData

export interface SearchPageData extends PageData {
   searchQuery: string
   totalResults: number
   posts: PartialPostViewData[]
}
