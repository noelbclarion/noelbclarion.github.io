const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

//
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
function newQuote() {
    loading();
    // Pick a random quote from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 150) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    
    // Set quote, hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes From API.
async function getQuotes() {
    loading();
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
// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listener
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

// Sample Requests
// https://zenquotes.io/api/quotes - Generate a JSON array of 50 random quotes on each request 
// https://zenquotes.io/api/today - Generate the quote of the day on each request
// https://zenquotes.io/api/random - Generate a random quote on each request
