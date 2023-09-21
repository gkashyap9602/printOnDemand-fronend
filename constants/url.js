let fileUrll = process.env.NODE_ENV == 'development' ? process.env.CF_IMG_URL_DEV : process.env.NODE_ENV == 'production' ? process.env.CF_IMG_URL_PROD : process.env.NODE_ENV == 'test' ? process.env.CF_IMG_URL_STAG : undefined
let fileUrl = fileUrll+'/static_images/'
export default fileUrl;