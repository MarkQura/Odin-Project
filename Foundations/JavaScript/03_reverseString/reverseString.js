const reverseString = function(str) {
    let strF = "";

    for (let i = str.length - 1; 0 <= i; --i) {
        strF = strF.concat(str[i]);
    }

    return strF;
};

// Do not edit below this line
module.exports = reverseString;
