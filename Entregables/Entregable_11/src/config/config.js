
import dotenv from 'dotenv';


dotenv.config();

export default {
    port : process.env.PORT || 8080,
    mongo_url : process.env.MONGO_URL,
    mongo_secret : process.env.MONGO_SECRET,
    jwt_sercret : process.env.JWT_SECRET,
    github_client_id : process.env.GITHUB_CLIENT_ID,
    github_client_secret : process.env.GITHUB_CLIENT_SECRET,
    github_callback_url : process.env.GITHUB_CALLBACK_URL,

}