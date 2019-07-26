var express = require('express');
var router = express.Router();
const UserService = require("../service/userService");
const userService = new UserService();
/* GET home page. */
router.get('/', function (req, res, next) {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  userService.getUserRequesTime(ip).then(function (reqTimes) {
    let now = new Date().getTime();
    let requestTimes = userService.filterRequestTime(now,reqTimes );
    if (requestTimes.length < 60) {
      requestTimes.push(now);
      userService.setUserRequestTime(ip, requestTimes);
      res.render('index', { title: requestTimes.length });
    } else {
      res.status(500).send('Error');
    }
  });
});

module.exports = router;



