
//find the country
function findCountry(e){
    e.preventDefault(); //prevent page from refreshing w/ data
    let countryName = document.getElementById('country-input')?.value;
    const url = `https://restcountries.com/v3.1/name/${countryName}`
    fetch(url)
    .then( res => res.json() )
    .then( data => showCountry() ) 
    .catch( err => console.error(err) )
}

//show country function will take in country data and insert into card
function showCountry(data){
    let searchedCountry = data[0]
    if (!searchedCountry){
        console.log('We had trouble fetching your data - Please try a different spelling or different country.')
    }
    let countryName = searchedCountry[name][common]
    let countryCapital = searchedCountry[capital]
    let countryFlag = searchedCountry[flags][png]

    let countryLangList = Object.values(searchedCountry[languages])
    let countryLanguages = Object.values(searchedCountry[languages][0])
    if (countryLangList.length > 1){
        for (let language of countryLangList){
            countryLanguages += `, ${language}`
        }
    }

    let countryCurrList = Object.values(searchedCountry[currencies])
    let countryCurrencies = Object.values(searchedCountry[currencies][0][name])
    if (countryCurrList.length > 1){
        for (let currency of countryCurrList){
            countryCurrencies += `, ${currency[name]}`
        }
    }

    document.getElementById('country-name').innerHTML = `${countryName}`
    document.getElementById('country-currency').innerHTML = `${countryCurrencies}`
    document.getElementById('country-capital').innerHTML = `${countryCapital}`
    document.getElementById('country-languages').innerHTML = `${countryLanguages}`
    document.getElementById('country-image').src = `${countryFlag}`
}

let countrySearchBar = document.getElementById('country-input');
countrySearchBar.addEventListener('submit', e => findCountry(e))