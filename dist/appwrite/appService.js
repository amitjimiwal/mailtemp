"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { Client, Databases, Account, Query } = require("node-appwrite");
const node_appwrite_1 = require("node-appwrite");
const config_1 = __importDefault(require("../config/config"));
class AppService {
    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(config_1.default.appwriteURL)
            .setProject(config_1.default.appwriteProjectID)
            .setKey(config_1.default.appwriteAPIKey);
        this.databases = new Databases(this.client);
        this.account = new Account(this.client);
        this.users = new node_appwrite_1.Users(this.client);
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.databases.listDocuments(config_1.default.databaseID, config_1.default.userCollectionID);
                return users.documents.filter((a) => a.isEmailReminder === true);
            }
            catch (error) {
                console.error("Error fetching users:", error);
            }
        });
    }
    //fetch reads corresponding to a user id
    getUserUnReads(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userReads = yield this.databases.listDocuments(config_1.default.databaseID, config_1.default.userReadCollectionID, [
                    Query.equal("userID", [userID])
                ]);
                //sort the reads based on isRead
                const unReadReads = userReads.documents.filter((a) => a.isRead === false);
                return unReadReads;
            }
            catch (error) {
                console.error("Error fetching user reads:", error);
            }
        });
    }
    getUserEmail(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.users.get(userID);
                return user;
            }
            catch (error) {
                console.error("Error fetching user email:", error);
            }
        });
    }
}
const appService = new AppService();
exports.default = appService;
