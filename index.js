document.getElementById('country-button').addEventListener('click', findCountry);

// //find the country
function findCountry(e){
    e.preventDefault(); //prevent page from refreshing w/ data
    let countryName = document.getElementById('country-input')?.value;
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    console.log(url);
    fetch(url)
        .then( res => res.json() )
        .then( data => showCountry(data) ) 
        .catch( err => console.error(err) )
}

//show country function will take in country data and insert into card
function showCountry(data){
    if(data && data.length > 0){
        const toTurnOn = document.getElementsByClassName('is-invisible')[0];
        toTurnOn.classList.replace('is-invisible', 'is-visible');
    }

    let searchedCountry = data[0]
    if (!searchedCountry){
        console.log('We had trouble fetching your data - Please try a different spelling or different country.');
        return;
    }
    let countryName = searchedCountry['name']['common']
    let countryCapital = searchedCountry['capital']
    let countryFlag = searchedCountry['flags']['png']

    let countryLangList = Object.values(searchedCountry['languages']);
    let countryLanguages;
    if (countryLangList.length === 1){
        countryLanguages = countryLangList[0];
    } else {
        countryLanguages = countryLangList.join(', ');
    }

    let countryCurrList = Object.values(searchedCountry['currencies']);
    let countryCurrencies
    if (countryCurrList.length === 1) {
        countryCurrencies = countryCurrList[0]['name'];
    } else {
        countryCurrencies = countryCurrList.map(currency => currency['name']).join(', ');
    }

    document.getElementById('country-name').innerHTML = `${countryName}`
    document.getElementById('country-currency').innerHTML = `Currencies: ${countryCurrencies}`
    document.getElementById('country-capital').innerHTML = `Capital: ${countryCapital}`
    document.getElementById('country-languages').innerHTML = `Language(s):${countryLanguages}`
    document.getElementById('country-image').src = `${countryFlag}`
}

// let countrySearchBar = document.getElementById('country-enter');
// countrySearchBar.addEventListener('submit', e => findCountry(e));