'use restrict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
    number: String,
    name: String,
    duration: String,
    file: String,
    album: { type: Schema.ObjectId, ref: 'Album' }
});

module.exports = mongoose.exports('Song', SongSchema);