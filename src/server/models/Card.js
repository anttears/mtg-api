const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CardSchema = new Schema({
    name: {type: String, required: true, max: 200},
    setName: {type: String, required: true, max: 200},
    types: {type: [String]},
    subTypes: {type: [String]},
    colors: {type: [String]},
    convertedManaCost: {type: Number, required: true},
    manaCost: {type: [Schema.Types.Mixed]},
    rarity: {type: String},
    power: {type: Schema.Types.Mixed},
    toughness: {type: Schema.Types.Mixed},
    colorIdentity: {type: [String]},
    abilities: {type: [String]},
    flavorText: {type: String},
    uuid: {type: String}
});

module.exports = mongoose.model('Card', CardSchema);
