import express, { Application, Request, Response } from 'express';
import config from './config/config';
import appService from './appwrite/appService';
const nodemailer = require('nodemailer');
const port=process.env.PORT || 8000;
const app: Application = express();
// async function sendMail() {
//      const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//                user: config.hostEmail,
//                pass: config.hostEmailPassword
//           }
//      })


//      //2.configure email content.
//      const mailOptions = {
//           from: config.hostEmail,
//           to: 'pankajjimi1234@gmail.com',
//           subject: 'Welcome to NodeJS App',
//           text: 'This is an email using nodemail in nodejs',
//      }

//      //3. send email
//      try {
//           const result = await transporter.sendMail(mailOptions);
//           console.log('Eamil sent successfully')
//      } catch (error) {
//           console.log('Email send failed with error:', error)
//      }
// }

(async () => {
     try {
       const users = await appService.getUserUnReads("65b8882ce0377b21267e");
       console.log(users);
     } catch (error) {
       console.error("Error:", error);
     }
   })();
// sendMail();

app.listen(port, () => {
     console.log(`Server is running on port ${port}`);
});
