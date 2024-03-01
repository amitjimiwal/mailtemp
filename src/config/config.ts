// Purpose: Configuration file for the application. You have to Load env using dotenv package.
require('dotenv').config();
const config={
     hostEmail:String(process.env.HOST_EMAIL),
     hostEmailPassword:String(process.env.HOST_PASSWORD),
     hostLoginPassword:String(process.env.HOST_LOGIN_PASS),
     appwriteURL:String(process.env.VITE_APPWRITE_ENDPOINT),
     appwriteProjectID:String(process.env.VITE_APPWRITE_PROJECT_ID),
     databaseID:String(process.env.VITE_APPWRITE_DATABASE_ID),
     userReadCollectionID:String(process.env.VITE_APPWRITE_USER_READ_COLLECTION_ID),
     userCollectionID:String(process.env.VITE_APPWRITE_USER_COLLECTION_ID),
     appwriteAPIKey:String(process.env.VITE_APPWRITE_API_KEY),
}
export default config;