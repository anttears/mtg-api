const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const SetSchema = new Schema({
    name: {type: String, required: true, max: 100},
    setSize: {type: Number},
    code: {type: String}
});

module.exports = mongoose.model('Set', SetSchema);
