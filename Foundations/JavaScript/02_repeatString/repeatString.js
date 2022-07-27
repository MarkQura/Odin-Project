const repeatString = function(str, times) {
    let strF = ""

    if (times < 0) {
        return "ERROR";
    }

    for (let i = 0; i < times; ++i)
        strF = strF.concat(str);

    return strF
};

// Do not edit below this line
module.exports = repeatString;
