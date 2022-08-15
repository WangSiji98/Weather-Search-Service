var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {

    let location = url.parse(req.url,true).query.location;

    tomorrowUrl = 'https://api.tomorrow.io/v4/timelines?timesteps=1d&units=imperial&timezone=America/Los_Angeles&apikey=bxXGGszV2nxyzGKk35CSIp2FBFFaMdBl&fields=temperatureMin&fields=temperatureMax&location=' + location;

    request(tomorrowUrl, function (error, response, data) {
        temperature_json= JSON.parse(data.toString());

        let temperature_data = temperature_json.data.timelines[0].intervals;

        let return_temperature_data = [];
        for (var i = 0; i < temperature_data.length; ++i) {
            let daily_temp = temperature_data[i];
            let date = new Date(daily_temp.startTime);
            let tmp = [];
            tmp.push(date.getTime());
            tmp.push(daily_temp.values.temperatureMin);
            tmp.push(daily_temp.values.temperatureMax);
            return_temperature_data.push(tmp);
        }

        console.log(data)
        console.log("准备写入文件");
        fs.writeFile('./public/json/d2.txt', JSON.stringify(return_temperature_data),  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("数据写入成功！");
        });

        res.send(JSON.stringify(return_temperature_data));
        // res.send(data);
    });
});

module.exports = router;
