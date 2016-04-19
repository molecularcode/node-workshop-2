function getFortune(randNum) {
    var quotes = [
        "Happiness is a method of life, not a destination",
        "Dont't cry because it's over, smile because it happened",
        "Be yourself, everyone else is already taken",
        "You only live once, but if you do it right, once is enough",
        "Insanity is doing the same thing, over and over again, but expecting different results",
        "Life is what happens to you while you're busy making other plans",
        "I have not failed. I've just found 10,000 ways that won't work",
        "I solemnly swear that I am up to no good",
        "For every minute you are angry you lose sixty seconds of happiness",
        "If you can't explain it to a six year old, you don't understand it yourself"
    ];
    return quotes[randNum];
}

getFortune(Math.floor(Math.random() * 10));


module.exports = {
    getFortune: getFortune
};