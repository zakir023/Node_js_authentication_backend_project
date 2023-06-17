module.exports.home = function (req, res) {
  console.log(req.cookies);

  console.log(req.body);
  return res.render("home");
};
