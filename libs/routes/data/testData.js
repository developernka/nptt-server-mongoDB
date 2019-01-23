var express = require('express');
var passport = require('passport');
var router = express.Router();

var TestData = require('../../model/data/testData');

router.get('/', function (req, res) {
    TestData.find(proQuery(req.query), {__v:false}, function(err, testDatas){
        res.json({error:(err?err:false), data: testDatas});
    });
});

router.post('/:id?', function (req, res) {
    if(req.params.id != undefined){
        TestData.findById(req.params.id,(err, testData)=>{
            saveTestData(req, testData, function(err){
                res.json({error:(err?err:false),data:"ID found and Updated. ID("+testData._id+")"});
            });

            // for(var k in req.query){
            //     testData[k] = req.query[k];
            //     testData.testData[k] = req.query[k];
            // }
            // for(var k in req.body){
            //     testData.testData[k] = req.body[k];
            //     testData[k] = req.body[k];
            // }
            // testData.modified = Date.now();
            // testData.save((err)=>{
            //     res.json({error:(err?err:false),data:"ID found and Updated. ID("+testData._id+")"});
            // });
        });
    }else{
        TestData.find(proQuery(req.query), {__v:false}, function(err, testDatas){
            if(err){
                res.json({error:err, data:""});
            }else{
                if(testDatas.length == 0){
                    var testData = new TestData();
                    saveTestData(req, testData, function(err){
                        res.json({error:(err?err:false),data: "New Data Inserted. ID("+testData._id+")"});
                    });
                    // for(var k in req.query){
                    //     testData[k] = req.query[k];
                    //     testData.testData[k] = req.query[k];
                    // }
                    // for(var k in req.body){
                    //     testData.testData[k] = req.body[k];
                    //     testData[k] = req.body[k];
                    // }
                    // testData.modified = Date.now();
                    // testData.save((err)=>{
                    //     res.json({error:(err?err:false), data: "New Data Inserted. ID("+testData._id+")"});
                    // });
                }
                else if(testDatas.length == 1){
                    var testData = new TestData(testDatas[0]);
                    saveTestData(req, testData, function(err){
                        res.json({error:(err?err:false),data: "Found and Updated. ID("+testData._id+")"});
                    });

                    // for(var k in req.query){
                    //     testData[k] = req.query[k];
                    //     testData.testData[k] = req.query[k];
                    // }
                    // for(var k in req.body){
                    //     testData.testData[k] = req.body[k];
                    //     testData[k] = req.body[k];
                    // }
                    // testData.modified = Date.now();
                    // testData.save((err)=>{
                    //     //testData.addToStatus();
                    //     res.json({error:(err?err:false), data: "Found and Updated. ID("+testData._id+")"});
                    // });
                }
                else{
                    res.json({error:err,data:testDatas});
                }
            }
        });
    }
});

function saveTestData(req, testData, cb){
    for(var k in req.query){
        testData[k] = req.query[k];
        testData.testdata[k] = req.query[k];
    }
    for(var k in req.body){
        testData.testdata[k] = req.body[k];
        testData[k] = req.body[k];
    }
    testData.modified = Date.now();
    testData.save((err)=>{
        // if(!err){
        //     testData.addToStatus();
        // }
        cb(err);
        //res.json({error:(err?err:false),data:"ID found and Updated. ID("+testData._id+")"});
    });
}

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
