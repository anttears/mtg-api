const Card = require('../models/Card');


const getCardsFromSet = (setName) => {
    return Card.find({setName});
};


module.exports = {getCardsFromSet};
