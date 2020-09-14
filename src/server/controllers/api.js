const cards = require('../actions/cards');
const sets = require('../actions/sets');

const getCardsFromSet = async (req, res) => {
    const cardList = await cards.getCardsFromSet(req.params.setName);
    res.json(cardList).end();
};

const getSetList = async (req, res) => {
    const setList = await sets.getSetList();
    res.json(setList).end();
};

module.exports = {getSetList, getCardsFromSet};
