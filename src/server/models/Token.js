const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    name: {type: String, required: true, max: 100},
    types: {type: [String]},
    subTypes: {type: [String]},
    colorIdentity: {type: [String]},
    colors: {type: [String]},
    power: {type: Schema.Types.Mixed},
    toughness: {type: Schema.Types.Mixed},
    rarity: {type: String},
    text: {type: [String]},
    uuid: {type: String}
});

module.exports = mongoose.model('Token', TokenSchema);
