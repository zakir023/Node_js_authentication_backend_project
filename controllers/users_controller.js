const User = require("../models/user");
const alertMailer = require("../mailer/testmailer");
const resetMailer = require("../mailer/resetpasswordmailer");
const bcrypt = require("bcrypt");
const sendOtop = require("../mailer/resetpasswordmailer");

module.exports.profile = function (req, res) {
  return res.render("profile", {
    title: "Profile",
  });
};

module.exports.signup = function (req, res) {
  if (req.isAuthenticated()) {
    return res.render("profile", {
      title: "profile",
    });
  }
  return res.render("user_sign_up", {
    title: "Signup",
  });
};

module.exports.signin = function (req, res, next) {
  if (req.isAuthenticated()) {
    // Check if user exists in database
    User.findOne({ email: req.user.email }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        // User not found in database, log out and redirect back to sign-in page
        //   req.logout();
        return res.redirect("/signin");
      }
      // User found in database, render profile page
      return res.render("profile", {
        title: "profile",
      });
    });
  } else {
    return res.render("user_sign_in", {
      title: "Signin",
    });
  }
};

// get signup data

module.exports.create = async function (req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const newUser = new User({
        name,
        email,
        password,
      });
      newUser.save();
      return res.redirect("/users/sign-in");
    } else {
      return res.redirect("back");
    }
  } catch (err) {
    console.log(err);
  }
};

// create session

module.exports.createSession = function (req, res) {
  req.flash("success", "Login Successfully");

  return res.redirect("/");
};

module.exports.destroySession = function (req, res) {
  req.logout(function (err) {
    if (err) {
      console.log("err");
    }
  });
  console.log("logged out");
  req.flash("success", "Logout Successfully");
  res.redirect("/");
};

module.exports.changePassword = function (req, res) {
  return res.render("changepass", {
    title: "Change Password",
  });
};

module.exports.updatePassword = async function (req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(err);
    } else {
      if (req.user.email == req.body.email && req.body.opass) {
        let isMatched = await bcrypt.compare(req.body.opass, user.password);
        console.log(isMatched);
        console.log(req.body.opass);
        console.log(user.password);
        if (!isMatched) {
          console.log("Invalid Password ");
        } else {
          let newpass = await bcrypt.hash(req.body.npass, 10);

          User.findByIdAndUpdate(
            req.params.id,
            { password: newpass },
            function (err, user) {
              req.flash("success", "Password Updated Successfully");
              return res.redirect("back");
            }
          );
        }
      }
    }
  } catch (err) {
    console.log("errrr");
  }
};

// render forget password page
module.exports.forgetPassword = function (req, res) {
  return res.render("forgetpassword", {
    title: "ForgetPassword",
  });
};

module.exports.randomNum = async function (req, res) {
  const email = await req.body.email;

  try {
    const user = await User.findById(req.params.id);

    var chars =
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var string_length = 8;
    var randomstring = "";
    for (var i = 0; i < string_length; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }

    var k = randomstring;

    var mail = req.user.email;
    var name = req.user.name;
    console.log(req.user.name);
    resetMailer.resetMail(k, mail, name);

    console.log(req.params.id, "save");

    // console.log(k);

    var otp;
    //    console.log(req.session);

    let newpassword = await bcrypt.hash(k, 10);
    console.log("new pass", newpassword);
    User.findByIdAndUpdate(
      req.params.id,
      { password: newpassword },
      function (err, user) {
        req.flash("success", "Password Reset Successfully");
        return res.redirect("back");
      }
    );
  } catch (err) {
    console.log("error", err);
  }
};
