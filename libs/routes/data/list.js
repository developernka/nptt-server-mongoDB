var express = require('express');
var passport = require('passport');
var router = express.Router();

var TestData = require('../../model/data/testData');

router.get('/:key?', function (req, res) {
    var key = req.params.key;
    var respKeys = {_id:false};
    
    if(key != undefined){
        respKeys[key] = true;
    }else{
        res.send("Field Name Required");
    }

    TestData.find(proQuery(req.query), respKeys,{sort:{updatedAt:-1}}, function(err, testDatas){
        var respArray = [];
        testDatas.forEach((v)=>{
            if(respArray.indexOf(v[key]) == -1 && v[key] != ""){
                respArray.push(v[key]);
            }
        });
        res.send(respArray.join());
        //res.json({error:(err?err:false), data: testDatas});
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
