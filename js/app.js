const jokeContainer = document.querySelector('#joke-container');
const jokeText = document.querySelector('#joke');
const jokeAuthor = document.querySelector('#author');
const twitterBtn = document.querySelector('#twitter');
const newJokeBtn = document.querySelector('#new-joke');
const loader = document.querySelector('#loader');
let countErrorWhenGetJokeFromAPI = 0;

function showSpinnerLoading() {
    loader.hidden = false;
    jokeContainer.hidden = true;
}

function removeSpinnerLoading() {
    if(!loader.hidden){
        loader.hidden = true;
        jokeContainer.hidden = false;
    }
}

async function getJokeFromAPI(){
    showSpinnerLoading();

    countErrorWhenGetJokeFromAPI++;
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
        jokeAuthor.innerText = 'Isn\'t Duy ♫';

        removeSpinnerLoading();
        countErrorWhenGetJokeFromAPI = 0;
    }
    catch(error){
        if(countErrorWhenGetJokeFromAPI<10){
            getJokeFromAPI();
        }
        else{
            console.log('Whoops! There are no joke', error);
        }
    }
}

function tweetJokeOnTwitter(){
    const joke = jokeText.innerText;
    const author = jokeAuthor.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${joke}-${author}`;

    window.open(twitterUrl, '_blank');
}

// Event Listeners
newJokeBtn.addEventListener('click', getJokeFromAPI);
twitterBtn.addEventListener('click', tweetJokeOnTwitter);

// On load
getJokeFromAPI();
