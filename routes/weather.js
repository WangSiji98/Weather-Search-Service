var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var url = require('url');


/* GET home page. */
router.get('/', function(req, res, next) {

    let location = url.parse(req.url,true).query.location;

    tomorrowUrl = 'https://api.tomorrow.io/v4/timelines?timesteps=1d&units=imperial&timezone=America/Los_Angeles&apikey=bxXGGszV2nxyzGKk35CSIp2FBFFaMdBl&fields=temperatureApparent&fields=humidity&fields=windSpeed&fields=weatherCode&fields=temperatureMin&fields=temperatureMax&fields=cloudCover&fields=visibility&fields=sunriseTime&fields=sunsetTime&fields=uvIndex&fields=temperature&fields=pressureSurfaceLevel&fields=precipitationProbability&location=' + location;

    request(tomorrowUrl, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            console.log(data)
            console.log("准备写入文件");
            fs.writeFile('./public/json/weather_local_2.txt', data,  function(err) {
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
