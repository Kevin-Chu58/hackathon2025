const sortStrings = (a, b) => {
    if (a.length !== b.length) {
        return a.length - b.length;
    }
    return a.localeCompare(b);
};

const sortUtils = {
    sortStrings,
};

export default sortUtils;
