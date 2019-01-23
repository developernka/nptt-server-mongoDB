var express = require('express');
var passport = require('passport');
var router = express.Router();

var List = require('../../model/data/list');

router.get('/', function (req, res) {
    List.find(proQuery(req.query), { __v:false }, {sort: {updatedAt: -1}}, function(err, listItems){
        res.json({error:(err?err:false), data: listItems});
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
