
const privateRouteMiddle = (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(" ")[1];
    if (token) {
      next();
    } else {
      res.json({ msg: "You are not Logged in please login!!"});
    }
  }
  else{
    res.json({ msg: "You are not Logged in please login!!"});
  }
  
};

module.exports = privateRouteMiddle;
