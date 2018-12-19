function vilidLength({ maxLength, minLength }, data) {
    if (maxLength && minLength) {
        return (
            data.trim().length >= minLength && data.trim().length <= maxLength
        );
    }
    if (maxLength) {
        return data.trim().length <= maxLength;
    }
    if (minLength) {
        return data.trim().length >= minLength;
    }
}
function vilidEmpty(data) {
    return data.trim().length > 0;
}
function vilidDataFun(keys, data) {}

module.exports = {
    vilidDataFun
};
