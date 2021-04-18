console.log('Got it!');

const jokeContainer = document.querySelector('#joke-container');
const jokeText = document.querySelector('#joke');
const jokeAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newJokeBtn = document.querySelector('#new-joke');

// Get joke from API

async function getJoke(){
    
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        // If joke's length greater than 50 add long-joke class to it, else remove class
        if(data.value.length > 50){
            jokeText.classList.add('long-joke');
        }
        else{
            jokeText.classList.remove('long-joke');
        }
        jokeText.innerText = data.value;

        // Author alway isn't Duy, is it!
        jokeAuthor.innerText = 'Isn\'t Duy ♫';
    }
    catch(error){
        getQuote();
        console.log('Whoops, no quote here ', error);
    }
}

// Tweet Joke
function tweetJoke(){

    const joke = jokeText.innerText;
    const author = jokeAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${joke}-${author}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners
newJokeBtn.addEventListener('click', getJoke);
twitterBtn.addEventListener('click', tweetJoke);

// On load

getJoke();