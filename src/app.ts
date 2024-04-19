import express, { Application, Request, Response } from 'express';
import sendMail from './utils/sendMail';
import cron from 'node-cron';
const app: Application = express();
const port = process.env.PORT || 8000;
app.get('/live', (req: Request, res: Response) => {
  res.send('Server working fine!');
});
cron.schedule('9 21 * * *', async () => {
  await sendMail();
  console.log('running a task every minute');
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});