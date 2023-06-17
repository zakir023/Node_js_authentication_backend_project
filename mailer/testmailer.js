const nodeMailer = require("../config/nodemailer");
const User = require("../models/user");

exports.loginAlert = (user) => {
  console.log("inside alert mailer");

  nodeMailer.transporter.sendMail(
    {
      from: "reachsaurabhnegi@gmail.com",
      to: user.email,
      subject: "new login alert",
      html: "<h1>login loginAlert</h1>",
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
