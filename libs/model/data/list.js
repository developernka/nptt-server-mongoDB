var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var List = new Schema({
    type:{ type:String, required:true },
    value:{ type:String, required:true }
},{timestamps:true});

module.exports = mongoose.model('List', List);
