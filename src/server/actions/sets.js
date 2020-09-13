const Set = require('../models/Set');

const getSetList = async () => {
    return Set.find({});
};

module.exports = {getSetList};
