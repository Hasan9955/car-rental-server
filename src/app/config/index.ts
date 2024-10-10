import dotenv from 'dotenv'
import path from 'path'

dotenv.config({path: path.join(process.cwd(), '.env')}) 


export default {
    mongo_url: process.env.MONGODB_URL,
    node_env: process.env.NODE_ENV,
    port: process.env.PORT, 
    ui_link: process.env.UI_LINK, 
    salt: process.env.BCRYPT_SALT, 
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_access_expire_time: process.env.JWT_ACCESS_EXPIRE_TIME,
    jwt_refresh_expire_time: process.env.JWT_REFRESH_EXPIRE_TIME, 

}


// Get a random string from node: 
// require('crypto').randomBytes(64).toString('hex')