const nodeMailer = require("../config/nodemailer");
const User = require("../models/user");
const session = require("express-session");

exports.resetMail = (k, user, name) => {
  console.log("inside Reset mailer");
  console.log(user);
  // console.log(k);
  var otp;

  nodeMailer.transporter.sendMail(
    {
      from: "reachsaurabhnegi@gmail.com",
      to: user,

      subject: "Password Reset Successfully",
      html: `<!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Your Email Subject Line</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 14px;
            line-height: 1.4;
            color: #333;
            background-color: #fff;
            margin: 0;
            padding: 0;
          }
      
          table {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            border-collapse: collapse;
          }
      
          td {
            padding: 10px;
            border: 1px solid #ccc;
            text-align: left;
            vertical-align: top;
          }
      
          img {
            max-width: 100%;
            height: auto;
            display: block;
            border: 0;
            margin: 0 auto;
          }
      
          a {
            color: #0078e7;
            text-decoration: none;
          }
          .pass{
            font-size: 20px;
          }
      
          h1 {
            font-size: 24px;
            margin: 20px 0;
            text-align: center;
          }
      
          p {
            margin: 10px 0;
            text-align: justify;
          }
        </style>
      </head>
      <body>
        <table>
          <!-- <tr> 
            <td>
              <img src="https://yourcompany.com/images/logo.png" alt="Your Company Logo">
            </td>
          </tr>  -->
          <tr>
            <td>
              <h1>Hi, ${name} your password was successfully changed</h1>
              <p class="pass">Your new password is ${k}</p>
              <p>This is a generic password change it ASAP</p>
              <p>Don't forget to change this password </p>
            </td>
          </tr>
          <tr>
            <td>
              <p>Regards,</p>
              <p>Saurabh </p>
            </td>
          </tr>
        </table>
      </body>
      </html>`,
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail", err);
      }
      console.log("mail sent", info);
      return;
    }
  );
};
