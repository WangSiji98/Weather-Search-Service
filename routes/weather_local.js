var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");


/* GET home page. */
router.get('/', function(req, res, next) {
    var fs = require("fs");
    let weather_json = null;
    // 异步读取
    fs.readFile('./public/json/weather_local.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        // console.log(data.toString());
        weather_json = JSON.parse(data.toString());
        res.send(weather_json);
    });
});

module.exports = router;
