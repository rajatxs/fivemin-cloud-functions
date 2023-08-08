import { join } from 'path'
import { renderFile, Options } from 'ejs'
import { LAYOUT_DIR, PAGE_DIR } from '../config'

const defaultOptions: Options = {
   includer: (_file) => {
      return {
         filename: join(PAGE_DIR, `${_file}.ejs`),
      }
   },
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
   return renderFile(join(LAYOUT_DIR, 'default-layout.ejs'), data, defaultOptions)
}
