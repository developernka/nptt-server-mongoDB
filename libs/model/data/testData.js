var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TestData = new Schema({
    jobtype: { type:String, required:true },
    kva: { type:String, required:true },

    stage: { type:String, required:true },
    test: { type:String, required:true},
    dateoftest : { type:Date },

    setno: { type:String },
    workorder: { type:String, required: function(){ return this.setno === undefined; } },
    slno: { type:String, required: function(){ return this.setno === undefined; }  },
    customer: { type:String },

    testdata: { type: JSON, required:true, default:{} },
    rev: { type:String, default:0 }

}, { timestamps: true });

module.exports = mongoose.model('TestData', TestData);
