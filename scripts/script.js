
const marvelApp = {};
// const heroes = ['Spider-man', 'Wolverine', 'Peepee Man'];

marvelApp.init = function () {
    // marvelApp.getData();
    marvelApp.searchHero();
}

marvelApp.apiKey = '520507c36ce0546fbac236621e58b165';

//------API call for Hero Character---------------------------
//Have the hero variable from searchHero function as parameter
marvelApp.getData = function (hero) {
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters?name=${hero}`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
        }
    }).then(res => {
        marvelApp.displayResults(res.data.results);
        // console.log('what is this', res.data.results);
        const heroID = res.data.results[0].id;
        marvelApp.getEventsData(heroID);
        marvelApp.getSeriesData(heroID);
    });
}

//------API call for Hero Events ------------
marvelApp.getEventsData = function (heroID) {
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters/${heroID}/events`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
            limit: 50,

        }
    }).then(res => {
        marvelApp.eventResults(res.data.results);
        // marvelApp.arrayRandomizer(res.data.results);
        // console.log(res.data.results);
    })
};

//------API call for Hero Series-------------
marvelApp.getSeriesData = function (heroID) {
    $.ajax({
        url: `https://gateway.marvel.com:443/v1/public/characters/${heroID}/series`,
        method: 'GET',
        dataType: 'json',
        data: {
            apikey: marvelApp.apiKey,
            limit: 50,
            // count:,
        }
    }).then(res => {
        marvelApp.seriesResults(res.data.results);
        // marvelApp.arrayRandomizer(res.data.results);
        // console.log(res.data.results);
    })
};

//Search bar function for Characters
marvelApp.searchHero = function () {
    $("form.search").on('submit', function (e) {
        e.preventDefault();
        let hero = $(".hero").val();
        $(".hero").val('');
        // console.log(hero);

        //Pass hero variable into getData function as an argument
        $("#series").html('');
        $("#events").html('');
        marvelApp.getData(hero);
    })
}

marvelApp.displayResults = function (characters) {
    // console.log(characters);
    characters.forEach((character) => {
        if (character.name) {
            $('#character').html('');
            $('#character').append(`
            <div class = 'character-container'>
            <h2>${character.name}</h2>
            <p class = 'bio'>${character.description}</p>
            <img src='${character.thumbnail.path}.jpg' alt = 'blah'>
            </div>
            `)
        }
    });
}

//EVENTS FUNCTION for Appending Information
marvelApp.eventResults = function (comicevents) {
    console.log(comicevents);
    comicevents.forEach((comicevent) => {
        //if no description is available, append empty
        let description = comicevent.description;
        if (description === null) {
            let description = '';
            marvelApp.eventAppend(coimcevent, description);
        } else {
            marvelApp.eventAppend(comicevent, description);
        }
    });
}

marvelApp.eventAppend = function (comicevent, description) {
    $('#events').append(`
        <div class='single-event-container'>
            <h2>${comicevent.title}</h2>
            <p class = 'title'>${description}</p>
            <img src='${comicevent.thumbnail.path}.jpg' alt = 'blah'>
        </div>
    `);
}


//SERIES FUNCTION for Appending Information
marvelApp.seriesResults = function (comicsseries) {
    console.log(comicsseries);
    const comix = comicsseries.filter(function(comic){
        console.log(comic.thumbnail.path);
        return comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    })
    console.log(comix);

    //create array of 20 unique random numbers between 0 and comix.length. foreach grab the index for the comix array.
    // comicsseries.forEach((comicseries) => {
    //     let description = comicseries.description;
    //     //if no description is available, append empty
    //     if (description === null) {
    //         let description = '';
    //         marvelApp.appendSeries(comicseries, description);
    //     } else {
    //         marvelApp.appendSeries(comicseries, description);
    //     }
        // let thumbnail.path = comicseries.thumbnail.path;
        // if (thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/6/d0/598e2ab495a36"){
        //     let ${'.single-series-container'} = 
        // }
//     });
}

marvelApp.appendSeries = function (comicseries, description) {
    $('#series').append(`
        <div class = 'single-series-container'>
            <h2>${comicseries.title}</h2>
            <p class = 'title'>${description}</p>
            <img src='${comicseries.thumbnail.path}.jpg' alt = 'blah'>
        </div>
    `)
}

const comicArray = []
marvelApp.arrayRandomizer = function(comicArray){
    const index = Math.floor(Math.random() * comicArray.length)
    return comicArray.length[index];
}
for (index = 0; index < 20; index++){
    comicArray.push(marvelApp.arrayRandomizer);
    }




//have a search bar in a sticky nav/fixed nav so it scrolls with user.
//create function that allows for any Marvel character to be called into a search bar
//create function to call in image and bio of searched character and link to DOM
//make two custom buttons that link to 'series' and 'events' paramater in marvel API
//have the buttons call specific series and events paramater associated with selected characrer
//populate the covers of these series/events into the DOM by linking to the thumbnail paramater in API.
//limit the amount of thumpnails called in to 40, as there are 1000's of issues that would have to be called in otherwise.
//Let thumbnails have a boarder and box shadow on click to indicate user owns this issue
//Have button at end of page that scrolls back to top of page on click.


//---------Document Ready---------\\
$(function () {

    marvelApp.init();



});