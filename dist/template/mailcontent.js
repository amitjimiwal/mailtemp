"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createEmail(reads, username) {
    return `<!DOCTYPE html>
     <html lang="en">
     <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>ReadLogs</title>
         <style>
             /* Customize colors, fonts, padding, margins, etc. here */
             body {
                 font-family: sans-serif;
                 margin: 0;
                 padding: 20px;
             }
     
             .container {
                 max-width: 700px;
                 margin: 0 auto;
             }
     
             .header {
                 display: flex;
                 align-items: center;
                 margin-bottom: 20px;
             }
     
             .logo {
                 width: 100px;
                 height: 100px;
             }
     
             .greeting {
                 font-size: 18px;
                 margin-left: 20px;
             }
     
             .card {
                 margin-bottom: 20px;
                 padding: 15px;
                 border: 1px solid #ddd;
                 border-radius: 5px;
                 display: flex;
                 align-items: center;
             }
     
             .card-image {
                 width: 60px;
                 height: 60px;
                 margin-right: 20px;
             }
     
             .card-title {
                 font-size: 16px;
                 font-weight: bold;
             }
     
             .card-button {
                 background-color: #4CAF50;
                 color: white;
                 padding: 10px 15px;
                 border: none;
                 border-radius: 5px;
                 cursor: pointer;
                 text-decoration: none;
             }
     
             .footer {
                 text-align: center;
                 font-size: 12px;
                 margin-top: 20px;
             }
         </style>
     </head>
     <body>
         <div class="container">
             <div class="header">
                 <img src="https://res.cloudinary.com/dejzy9q65/image/upload/v1707928921/logo_lmq9jl.png" alt="Org Logo" class="logo">
                 <span class="greeting">Hi ${username}, This is Your Daily Reminder to Complete Reading Your Saved Reads</span>
             </div>
             ${reads.map((read) => ` <div class="card">
               <img src="${read.previewImage} alt="${read.title}" class="card-image">
               <div class="card-content">
                   <span class="card-title">${read.title}</span>
                   <a href="https://readlogs.vercel.app/" class="card-button">Read</a>
               </div>
           </div>`)}
             <div class="footer">
                 Copyright &copy; 2024 ReadLogs. All rights reserved.
             </div>
         </div>
     </body>
     </html>
     `;
}
exports.default = createEmail;
