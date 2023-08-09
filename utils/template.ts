import { join } from 'path'
import { renderFile, Options } from 'ejs'
import { LAYOUT_DIR, PAGE_DIR } from '../config'
import meta from '../data/meta.json'

const defaultOptions: Options = {
   includer: (_file) => {
      return {
         filename: join(PAGE_DIR, `${_file}.ejs`),
      }
   },
}

function resolveDataObject(data: any) {
   if (typeof data === 'object') {
      let keywords: string[]

      if (!Reflect.has(data, 'pageDesc')) {
         Reflect.set(data, 'pageDesc', meta.defaultDescription)
      }

      if (Reflect.has(data, 'pageKeywords') && Array.isArray(data['pageKeywords'])) {
         keywords = meta.defaultKeyworkds.concat(data['pageKeywords'])
      } else {
         keywords = meta.defaultKeyworkds
      }
      Reflect.set(data, 'pageKeywords', keywords)

      if (!Reflect.has(data, 'pageType')) {
         Reflect.set(data, 'pageType', meta.openGraphType)
      }

      if (!Reflect.has(data, 'pageCoverImage')) {
         Reflect.set(data, 'pageCoverImage', meta.openGraphImage)
      }
   } else {
      Reflect.set(data, 'pageDesc', meta.defaultDescription)
      Reflect.set(data, 'pageKeywords', meta.defaultKeyworkds)
      Reflect.set(data, 'pageType', meta.openGraphType)
      Reflect.set(data, 'pageCoverImage', meta.openGraphImage)
   }

   return data
}

/**
 * Returns computed page with default options
 * @param file - Template file name
 * @param data - Template data
 */
export function renderTemplate<T>(file: string, data: T): Promise<string> {
   return renderFile(file, data, defaultOptions)
}

/**
 * Returns computed page with specified layout
 * @param name - Layout name
 * @param data - Page template data
 */
export function renderLayout<T>(name: string, data: T): Promise<string> {
   return renderFile(join(LAYOUT_DIR, `${name}.ejs`), data, defaultOptions)
}

/**
 * Returns computed page with default layout
 * @param data - Page template data
 */
export function renderDefaultLayout<T>(data: T): Promise<string> {
   return renderFile(
      join(LAYOUT_DIR, 'default-layout.ejs'),
      resolveDataObject(data),
      defaultOptions
   )
}
