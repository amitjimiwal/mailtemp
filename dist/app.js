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
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const appService_1 = __importDefault(require("./appwrite/appService"));
const mailcontent_1 = __importDefault(require("./template/mailcontent"));
const nodemailer = require('nodemailer');
const app = (0, express_1.default)();
const schedule = require('node-schedule');
let users = [];
function sendMail() {
    return __awaiter(this, void 0, void 0, function* () {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            auth: {
                user: config_1.default.hostEmail,
                pass: config_1.default.hostEmailPassword
            }
        });
        //fetch all users
        users = yield appService_1.default.getUsers();
        users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
            const unReadReads = yield appService_1.default.getUserUnReads(user.userID);
            const userData = yield appService_1.default.getUserEmail(user.userID);
            //2.configure email content.
            if (unReadReads.length > 0) {
                const mailOptions = {
                    from: config_1.default.hostEmail,
                    to: userData === null || userData === void 0 ? void 0 : userData.email,
                    subject: 'ReadLogs Reminder',
                    html: (0, mailcontent_1.default)(unReadReads, (userData === null || userData === void 0 ? void 0 : userData.name) || "")
                };
                //3. send email
                yield new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions).then((info) => {
                        console.log('Email sent to:', userData === null || userData === void 0 ? void 0 : userData.email, info.response);
                        resolve(info);
                    }).catch((error) => {
                        console.log('Error in :', userData === null || userData === void 0 ? void 0 : userData.email, error);
                        reject(error);
                    });
                }); //dummy promise
            }
        }));
    });
}
schedule.scheduleJob('12 18 * * *', () => {
    sendMail();
});
