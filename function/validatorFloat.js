let isValidfloat = (float) => {
    return Number(float).toString() === float.toString() && float % 1 !== 0;

}

module.exports = isValidfloat;