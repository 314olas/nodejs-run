const repl = require("repl");

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

repl.start("$ ").context.getRandomNumber = getRandomNumber;