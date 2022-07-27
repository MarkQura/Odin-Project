const sumAll = function(a, b) {
    if (typeof(a) != `number` || typeof(b) != `number`) return "ERROR"
    if (a < 0 || b < 0) return "ERROR"
    
    let number = Math.abs(a - b) + 1;

    return (number/2) * (2 + (number - 1))
}

// Do not edit below this line
module.exports = sumAll;
