var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {

    let location = url.parse(req.url,true).query.location;

    tomorrowUrl = 'https://api.tomorrow.io/v4/timelines?timesteps=1h&units=imperial&timezone=America/Los_Angeles&apikey=yiTEf7JxulomOpszdtBl58vQwEKJS2df&fields=temperature&fields=humidity&fields=windSpeed&fields=windDirection&fields=pressureSeaLevel&location=' + location;

    request(tomorrowUrl, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log(data)
            console.log("准备写入文件");
            fs.writeFile('./public/json/h2.txt', data,  function(err) {
                if (err) {
                    return console.error(err);
                }
                console.log("数据写入成功！");
            });
        }
        res.send(data);
    });
});

module.exports = router;
