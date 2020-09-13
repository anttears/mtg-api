const Set = require('../models/Set');
const Card = require('../models/Card');
const Token = require('../models/Token');

const createToken = async (token, setName) => {
    const existingToken = await Token.find({name: token.name});
    if (existingToken.length) {
        // TODO add setName if required
        return existingToken;
    }

    const newToken = new Token({
        setName,
        ...token
    });

    newToken.save((err, savedToken) => {
        if (err) {
            throw new Error(err);
        }
        return savedToken;
    });
};

const createTokens = (tokens, setName) => {
    tokens.forEach(token => {
        createToken(token, setName);
    });
};

const createCard = async (card, setName) => {
    const existingCard = await Card.find({name: card.name});
    if (existingCard.length) {
        // TODO add setName if required
        return existingCard;
    }

    const newCard = new Card({
        setName,
        ...card
    });

    newCard.save((err, saveCard) => {
        if (err) {
            throw new Error(err);
        }
        return saveCard;
    });
};

const createCards = (cards, setName) => {
    cards.forEach(card => {
        createCard(card, setName);
    });
};

const createSet = async (set) => {
    const name = set.name;
    const existingSet = await Set.find({name});
    if (existingSet.length) {
        return existingSet;
    }

    const newSet = new Set({
        name,
        setSize: set.setSize,
        code: set.code
    });

    newSet.save((err, savedSet) => {
        if (err) {
            throw new Error('Cannot save new set');
        }
        return savedSet;
    });
};

const uploadSet = (set) => {
    createSet(set); // await if you need the set
    createCards(set.cards, set.name);
    createTokens(set.tokens, set.name);
};

module.exports = {uploadSet, createCards};
