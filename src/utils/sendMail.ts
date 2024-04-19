import config from "../config/config";
const nodemailer = require('nodemailer');
import appService from '../appwrite/appService';
import createEmail from '../template/mailcontent';
let users = [];
async function sendMail() {
     const transporter = nodemailer.createTransport({
          service: 'gmail',
          host: 'smtp.gmail.com',
          port: 587,
          secure: false,
          auth: {
               user: config.hostEmail,
               pass: config.hostEmailPassword
          }
     })
     //fetch all users
     users = await appService.getUsers();
     users.forEach(async (user: { userID: string; }) => {
          const unReadReads = await appService.getUserUnReads(user.userID);
          const userData = await appService.getUserEmail(user.userID);
          //2.configure email content.
          if (unReadReads.length > 0) {
               const mailOptions = {
                    from: config.hostEmail,
                    to: userData?.email,
                    subject: 'ReadLogs Reminder',
                    html: createEmail(unReadReads, userData?.name || "")
               }
               //3. send email
               await new Promise((resolve, reject) => {
                    transporter.sendMail(mailOptions, (err: any, info: any) => {
                         if (err) {
                              console.log('Error in :', userData?.email, err);
                              reject(err);
                         } else {
                              console.log('Email sent to:', userData?.email, info.response);
                              resolve(info);
                         }
                    });
               });
          }
     })
}
export default sendMail;