'use restrict'
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var ArtistSchema=new Schema({
    name:String,
    description:String,
    image:String
});

module.exports=mongoose.exports('Artist',ArtistSchema);