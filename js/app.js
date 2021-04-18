console.log('Got it!');

// Get quote from API

async function getQuote(){
    
    const apiUrl = 'https://api.chucknorris.io/jokes/random';

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log(data.value);
    }
    catch(error){
        getQuote();
        console.log('Whoops, no quote here ', error);
    }
}

// On load

getQuote();