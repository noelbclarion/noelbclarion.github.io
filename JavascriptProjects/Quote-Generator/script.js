const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

// Show New Quote
function newQuote() {
    // Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    console.log(quote);
    if(!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }
    quoteText.textContent = quote.text;
}

// Get Quotes From API.
async function getQuotes() {
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (er) {
        console.log(er);
        // Catch Error Here
    }
}

// On Load
getQuotes();

// Sample Requests
// https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request 
// https://zenquotes.io/api/today - Generate the quote of the day on each request
// https://zenquotes.io/api/random - Generate a random quote on each request
