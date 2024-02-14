import express, { Application, Request, Response } from 'express';
import config from './config/config';
import appService from './appwrite/appService';
import createEmail from './template/mailcontent';
const cron=require('node-cron');
const nodemailer = require('nodemailer');
const port = process.env.PORT || 8000;
const app: Application = express();
let users = [];
async function sendMail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
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
      transporter.sendMail(mailOptions).then((info: any) => {
        console.log('Email sent to:', userData?.email, info.response);
      }).catch((error: any) => {
        console.log('Error in :', userData?.email, error);
      });
    }
  });
}
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const task = cron.schedule('0 0 * * *', () => {
  sendMail();
});

// Start the scheduled task
task.start();
