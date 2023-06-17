const User = require("../models/user");
const alertMailer = require("../mailer/testmailer");
const resetMailer = require("../mailer/resetpasswordmailer");
const bcrypt = require("bcrypt");
const sendOtop = require("../mailer/resetpasswordmailer");

// render forget password page
module.exports.forgetPassword = function (req, res) {
  return res.render("forgetpassword", {
    title: "ForgetPassword",
  });
};

module.exports.send_dummy_password = async (req, res) => {
  const email = await req.body.email;
  console.log(email);

  try {
    const user = await User.find({ email: email });

    if (user.length !== 0) {
      console.log(user);

      var chars =
        "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
      var string_length = 8;
      var randomstring = "";
      for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }

      var k = randomstring;

      console.log(k, "Mail Send");
      var mail = user[0].email;
      console.log(mail);
      var name = user[0].name;
      console.log(name);
      resetMailer.resetMail(k, mail, name);

      var otp;

      let newpassword = await bcrypt.hash(k, 10);
      console.log("new pass", newpassword);
      User.updateOne({ password: newpassword }, function (err, user) {
        req.flash("success", "Password Reset and send  Successfully");
        return res.render("user_sign_in");
      });
    } else {
      console.log("User Not found");
      req.flash("error", "Email Does not Exist");
      return res.redirect("back");
    }
  } catch (err) {
    console.log("error", err);
  }
};
