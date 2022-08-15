var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");

/* GET home page. */
router.get('/', function(req, res, next) {
    var fs = require("fs");
    let temperature_json = null;
    // 异步读取
    fs.readFile('./public/json/daily_temperature_local.txt', function (err, data) {
        if (err) {
            return console.error(err);
        }
        // console.log(data.toString());
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

        res.send(JSON.stringify(return_temperature_data));
    });
});

module.exports = router;


