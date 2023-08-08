import { renderLayout } from '../utils/template'
import type {
   TopicPageTemplateData,
} from '../types'

/**
 * Returns computed topic page content
 * @param data - Page template data
 */
export function renderTopicPage(data: TopicPageTemplateData): Promise<string> {
   return renderLayout('default-layout', {
      pageTitle: `${data.topicName} - Fivemin`,
      pageContent: 'topic',
      ...data,
   })
}

/** Returns computed 404 error page content */
export function render404Page() {
   return renderLayout('default-layout', {
      pageTitle: 'Page not found - Fivemin',
      pageContent: '_status',
      statusImageUrl: 'images/404.svg',
      statusMessage: 'Page not found',
      statusDesc: "Oops! The page you're looking for can't be found.",
   })
}

/** Returns computed 500 error page content */
export function render500Page() {
   return renderLayout('default-layout', {
      pageTitle: 'Internal Server Error - Fivemin',
      pageContent: '_status',
      statusImageUrl: 'images/500.svg',
      statusMessage: 'Something went wrong',
      statusDesc: 'Oops! Something went wrong on our end. Please try again later',
   })
}
