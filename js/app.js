console.log('Got it!');

// Get quote from API

async function getQuote(){
    
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response = await fetch(apiUrl);
        const data = await response.json();
        
        console.log(data);
    }
    catch(error){
        // getQuote();
        console.log('Whoops, no quote here ', error);
    }
}

// On load

getQuote();