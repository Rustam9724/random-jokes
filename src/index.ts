import quotes from './assets/quotes.json';
import '../src/styles/style.scss';

let language: 'russian' | 'english' = 'russian';
const quoteField: HTMLParagraphElement = document.querySelector('.quote');
const authorField: HTMLParagraphElement = document.querySelector('.author');
const quoteButton = document.querySelector('.quote-button');
const languageButton = document.querySelector('.language-button');

function getRussianQuote() {
        quoteField.style.animation = 'disappearance 0.5s ease-in forwards';
        authorField.style.animation = 'disappearance 0.5s ease-in forwards';
        setTimeout(() => {
            quoteField.innerHTML = `"${quotes[Math.floor(Math.random() * (quotes.length))].text}"`;
            authorField.innerHTML = quotes[Math.floor(Math.random() * (quotes.length))].author;
        }, 500);
        setTimeout(() => {
            quoteField.style.animation = 'appearance 0.5s ease-in forwards';
            authorField.style.animation = 'appearance 0.5s ease-in forwards';
        }, 1000)
}

const getEnglishQuote = () => {
    quoteField.style.animation = 'disappearance 0.5s ease-in forwards';
    authorField.style.animation = 'disappearance 0.5s ease-in forwards';
    setTimeout(async () => {
        const response = await fetch('https://type.fit/api/quotes');
        let result = await response.json();
        quoteField.innerHTML = `"${result[Math.floor(Math.random() * (quotes.length))].text};`
        authorField.innerHTML = result[Math.floor(Math.random() * (quotes.length))].author;
    }, 500)
    setTimeout(() => {
        quoteField.style.animation = 'appearance 0.5s ease-in forwards';
        authorField.style.animation = 'appearance 0.5s ease-in forwards';
    }, 1000)
}

quoteButton.addEventListener('click', getRussianQuote);

languageButton.addEventListener('click', () => {
    if (language === 'russian') {
        getEnglishQuote();
        language = 'english';
        quoteButton.innerHTML = 'Another quote';
        languageButton.innerHTML = 'Цитаты на русском';
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