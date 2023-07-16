const userModel = require("../model/userModel");

const registerMiddle = async (req, res, next) => {
    const {email}=req.body
  try {
    const data = await userModel.findOne({email});

    if (data) {
      res.json({ msg: "User is already registered please login !!" });
    } 
    else {
      next();
    }
  } catch (err) {
    console.log(err);
    console.log("Something is wrong with register");
  }
};

module.exports = registerMiddle;
