const { Client, Databases, Account ,Query} = require("node-appwrite");
import config from "../config/config";

class AppService {
     client = new Client();
     private databases;
     account;
     constructor() {
          this.client
               .setEndpoint(config.appwriteURL)
               .setProject(config.appwriteProjectID)
               .setKey(config.appwriteAPIKey);
          this.databases = new Databases(this.client);
          this.account = new Account(this.client);
     }
     async getUsers() {
          try {
               const users = await this.databases.listDocuments(
                    config.databaseID,
                    config.userCollectionID
               );
               return users.documents;
          } catch (error) {
               console.error("Error fetching users:", error);
          }
     }
     //fetch reads corresponding to a user id
     async getUserUnReads(userID: string) {
          try {
               const userReads = await this.databases.listDocuments(
                    config.databaseID,
                    config.userReadCollectionID,
                    [
                         Query.equal("userID", [userID])
                    ]
               );
               //sort the reads based on isRead
               const unReadReads=userReads.documents.filter((a: { isRead: boolean; }) => a.isRead===false);
               return unReadReads;
          } catch (error) {
               console.error("Error fetching user reads:", error);
          }
     }
}

const appService = new AppService();
export default appService;
