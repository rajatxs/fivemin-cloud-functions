export const ENV = (String(process.env.FIVEMIN_ENV) === 'production')? 'prod': 'dev'
export const DB_URL = String(process.env.FIVEMIN_MONGODB_CONN_URL)
export const DB_NAME = String(process.env.FIVEMIN_MONGODB_DB_NAME)
export const CLOUDINARY_CLOUD_NAME = String(process.env.FIVEMIN_CLOUDINARY_ID)
export const HOST_URL = String(process.env.FIVEMIN_HOST_URL)
export const CONTACT_EMAIL = String(process.env.FIVEMIN_CONTACT_EMAIL)
export const ALGOLIA_APP_ID = String(process.env.FIVEMIN_ALGOLIA_APP_ID)
export const ALGOLIA_API_KEY = String(process.env.FIVEMIN_ALGOLIA_API_KEY)
