import quotes from './assets/quotes.json';

let language: 'russian' | 'english' = 'russian';
const quoteField = document.querySelector('.quote');
const authorField = document.querySelector('.author');
const quoteButton = document.querySelector('.quote-button');
const languageButton = document.querySelector('.language-button');

function getRussianQuote() {
        quoteField.innerHTML = quotes[Math.floor(Math.random() * (quotes.length))].text;
        authorField.innerHTML = quotes[Math.floor(Math.random() * (quotes.length))].author;
}

const getEnglishQuote = async () => {
    const response = await fetch('https://type.fit/api/quotes');
    let result = await response.json();
    quoteField.innerHTML = result[Math.floor(Math.random() * (quotes.length))].text;
    authorField.innerHTML = result[Math.floor(Math.random() * (quotes.length))].author;
}

window.addEventListener('load', getRussianQuote);
quoteButton.addEventListener('click', getRussianQuote);

languageButton.addEventListener('click', () => {
    if (language === 'russian') {
        getEnglishQuote();
        language = 'english';
        quoteButton.innerHTML = 'Another quote';
        languageButton.innerHTML = 'Получить цитаты на русском';
        quoteButton.removeEventListener('click', getRussianQuote);
        quoteButton.addEventListener('click', getEnglishQuote);
    } else {
        getRussianQuote();
        language = 'russian';
        quoteButton.innerHTML = 'Другая цитата';
        languageButton.innerHTML = 'Get quotes is english';
        quoteButton.removeEventListener('click', getEnglishQuote);
        quoteButton.addEventListener('click', getRussianQuote);
    }
})