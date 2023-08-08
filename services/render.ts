import { join } from 'path'
import { renderFile } from 'ejs'
import { PAGE_DIR, VIEW_PARTIAL_DIR, LAYOUT_DIR } from '../config'
import type {
   IndexPageTemplateData,
   PostPageTemplateData,
   StatusPageTemplateData,
   TopicsPageTemplateData,
   TopicPageTemplateData,
} from '../types'

/**
 * Returns computed index page content
 * @param data - Page template data
 */
export async function renderIndexPage(data: IndexPageTemplateData): Promise<string> {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: data.title,
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, 'index.ejs'), { posts: data.posts }),
      partialFooter: await renderFile(join(VIEW_PARTIAL_DIR, 'footer.ejs'), {}),
   })
}

/**
 * Returns computed post page content
 * @param data - Page template data
 */
export async function renderPostPage(data: PostPageTemplateData) {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: `${data.postTitle} - Fivemin`,
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, 'post.ejs'), data),
      partialFooter: await renderFile(join(VIEW_PARTIAL_DIR, 'footer.ejs'), {}),
   })
}

/**
 * Returns computed topics page content
 * @param data - Page template data
 */
export async function renderTopicsPage(data: TopicsPageTemplateData): Promise<string> {
   return renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: "Topics - Fivemin",
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, 'topics.ejs'), data),
      partialFooter: await renderFile(join(VIEW_PARTIAL_DIR, 'footer.ejs'), {}),
   })
}

/**
 * Returns computed topic page content
 * @param data - Page template data
 */
export async function renderTopicPage(data: TopicPageTemplateData): Promise<string> {
   return renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: `${data.topicName} - Fivemin`,
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, 'topic.ejs'), data),
      partialFooter: await renderFile(join(VIEW_PARTIAL_DIR, 'footer.ejs'), {}),
   })
}

/** Returns computed 404 error page content */
export async function render404Page() {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: 'Page not found - Fivemin',
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, '_status.ejs'), {
         imageUrl: 'images/404.svg',
         message: 'Page not found',
         desc: "Oops! The page you're looking for can't be found.",
      } as StatusPageTemplateData),
      partialFooter: '',
   })
}

/** Returns computed 500 error page content */
export async function render500Page() {
   return await renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), {
      pageTitle: 'Internal Server Error - Fivemin',
      partialHeader: await renderFile(join(VIEW_PARTIAL_DIR, 'header.ejs'), {}),
      partialMain: await renderFile(join(PAGE_DIR, '_status.ejs'), {
         imageUrl: 'images/500.svg',
         message: 'Something went wrong',
         desc: 'Oops! Something went wrong on our end. Please try again later',
      } as StatusPageTemplateData),
      partialFooter: '',
   })
}
