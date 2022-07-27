const removeFromArray = function() {
    let args = Array.from(arguments);
    let arr = args.shift();

    for (const elem of args) {
        let index = arr.indexOf(elem);
        if (index === -1) continue;
        arr.splice(index, 1);
    }
    return arr;
};

// Do not edit below this line
module.exports = removeFromArray;
