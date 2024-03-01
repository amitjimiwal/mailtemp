import express, { Application, Request, Response } from 'express';
import config from './config/config';
import appService from './appwrite/appService';
import createEmail from './template/mailcontent';
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
app.get('/', (req: Request, res: Response) => {
  res.send('Server is running');
});

app.get('/sendmail', async (req: Request, res: Response) => {
  try {
    console.log('Sending mail');
    await sendMail(); 
    res.send("Done");
  } catch (error) {
    console.log('Error in sending mail:', error);
    res.status(500).send("{ error: 'Error in sending mail' }");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
