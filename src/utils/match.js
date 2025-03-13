const findAllOccurrencesMatchAll = (str, substr) => {
    const regex = new RegExp(substr, "g");
    const matches = [...str.matchAll(regex)];
    return matches.map((match) => match.index);
};

const matchUtils = {
    findAllOccurrencesMatchAll,
};

export default matchUtils;
