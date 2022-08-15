var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require("fs");
var url = require('url');

/* GET home page. */
router.get('/', function(req, res, next) {

    let reqInput = url.parse(req.url,true).query.input;

    let placeUrl = 'https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyD_ojwI96rsE2bDCU5tyH0eUDeSuCmPveM&type=(cities)&input=' + reqInput;

    request(placeUrl, function (error, response, data) {
        if (!error && response.statusCode == 200) {
            let predictionList = JSON.parse(data).predictions;
            let returnDataList = [];
            for (var i = 0; i < predictionList.length; ++i) {
                let address = predictionList[i].description.split(',');
                let tmp = [];
                tmp.push(address[0]);
                tmp.push(address[1].substr(1, 2));
                returnDataList.push(tmp);
            }
            returnJson =JSON.stringify(returnDataList);
            // fs.writeFile('./public/json/auto_complete_local.txt', returnJson,  function(err) {
            //     if (err) {
            //         return console.error(err);
            //     }
            //     console.log("数据写入成功！");
            // });

            res.send(returnJson);
        }
    });
});

module.exports = router;
