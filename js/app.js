console.log('Got it!');

const jokeContainer = document.querySelector('#joke-container');
const jokeText = document.querySelector('#joke');
const jokeAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newJokeBtn = document.querySelector('#new-joke');
const loader = document.querySelector('#loader');

// Show loader function
function loading() {
    loader.hidden = false;
    jokeContainer.hidden = true;
}

// Complete loading, show container, hidden loader
function complete() {
    if(!loader.hidden){
        loader.hidden = true;
        jokeContainer.hidden = false;
    }
}

// Get joke from API

async function getJoke(){

    // Show loading 
    loading();
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

        // Stop loading, show joke container
        complete();
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
