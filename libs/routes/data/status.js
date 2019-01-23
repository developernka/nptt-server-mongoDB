var express = require('express');
var passport = require('passport');
var router = express.Router();

var TestData = require('../../model/data/testData');

router.get('/', function (req, res) {
    TestData.find(proQuery(req.query), { __v:false, testdata:false, rev:false }, function(err, testDatas){
        res.json({error:(err?err:false), data: testDatas});
    });
});

function proQuery(query){
    var tempQuery={};
    for( var k in query){
        tempQuery[k] = {
            $regex: new RegExp('^' + query[k].replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '$', 'i')
        }
    }
    return tempQuery;
}

module.exports = router;
