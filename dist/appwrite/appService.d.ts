import { Users } from "node-appwrite";
declare class AppService {
    client: any;
    private databases;
    account: any;
    users: Users;
    constructor();
    getUsers(): Promise<any>;
    getUserUnReads(userID: string): Promise<any>;
    getUserEmail(userID: string): Promise<import("node-appwrite").Models.User<import("node-appwrite").Models.Preferences> | undefined>;
}
declare const appService: AppService;
export default appService;
