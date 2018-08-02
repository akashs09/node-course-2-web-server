// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener("click", printQuote, false);

var counter = 0;
var randNumList = [];
var quotes = [
    {
        quote: '"That isn’t about money, fame, or power. It’s about will, dedication, commitment, and knowing your self-worth. Money can’t buy you values."',
        source: 'Jennifer Hudson',
        citation: 'I Got This: How I Changed My Ways and Lost What Weighed Me Down',
        year: '2012',
        tags: 'Money'
    },
    {
        quote: '"Never give a party if you will be the most interesting person there."',
        source: 'Mickey Friedman',
    },
    {
        quote: '"You always pass failure on the way to success."',
        source: 'Mickey Rooney',
        year: '1920-2014',
        tags: 'Success'
    },
    {
        quote: '"Under the greenwood tree who loves to lie with me ... Here shall he see no enemy but winter and rough weather."',
        source: 'William Shakespeare',
        citation: 'As You Like It, Act II, sc. 5',
        year: '1564-1616',
        tags: 'Winter'
    },
    {
        quote: '"Natural Selection is anything but random."',
        source: 'Richard Dawkins',
        citation: 'The Selfish Gene',
        year: '1976',
        tags: 'Evolution'
    }
];


function printQuote() {
    var quoteObj = getRandomQuote(quotes);

    /* check if certain properties are not in object */
    if(!quoteObj.hasOwnProperty('citation')) {
        quoteObj.citation = '';
    }
    if(!quoteObj.hasOwnProperty('year')) {
        quoteObj.year = '';
    }
    if(!quoteObj.hasOwnProperty('tags')) {
        quoteObj.tags = '';
    }

    var message = '<p class="quote">' + quoteObj.quote + '</p>';
    message += '<p class="source">' + quoteObj.source + '<span class="citation">'+ quoteObj.citation + '</span>\n' + '<span class="year">' + quoteObj.year + '</span>\n' + '<span class="tag">' + quoteObj.tags + '</span>\n' + '</p>'
    var output = document.getElementById('quote-box');
    changeBackgroundColor();
    output.innerHTML = message;
}

function getRandomQuote(quotes) {
    var randNum = getRandomNumber(quotes.length);

    //Make sure that no random number generated is the same for the first 5 times -- if it keep generating until it isn't
    if (counter < 5) {
        while(randNumList.indexOf(randNum) !== -1 ) {
            randNum = getRandomNumber(quotes.length);
        }
        }


    var randomQuote = quotes[randNum];
    counter++;
    randNumList.push(randNum);
    return randomQuote;
}

function getRandomNumber( upper ) {
    var randNum = Math.floor(Math.random() * upper);
    return randNum;
}

// use the getRandomNumber method 3 times and cat those values into the css property of backgroundcolor
function changeBackgroundColor() {
    var red = getRandomNumber(256);
    var green = getRandomNumber(256);
    var blue = getRandomNumber(256);
    var rgbColor = 'rgb(' + red + ',' + green + ',' + blue + ')';
    document.body.style.backgroundColor = rgbColor;
}

//every 10 seconds call the printQuote() method
setInterval(function(){
    printQuote();
}, 10000);

