
const marvelApp = {};
// const heroes = ['Spider-man', 'Wolverine', 'Peepee Man'];

marvelApp.init = function () {
    // marvelApp.getData();
    marvelApp.searchHero();
    marvelApp.redBorder();
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
            <div class = 'wrapper' 
                <div class = 'character-container'>
                    <h2>${character.name}</h2>
                    <div class = 'character-img'>
                        <img src='${character.thumbnail.path}.jpg' alt = 'blah'>
                    </div>    
                    <p class = 'bio'>${character.description}</p>
                </div>
                <div class = 'buttons-series-events'>
                    <button class = 'button-series'>Series</button>
                    <button class = 'button-events'>Events</button>
                </div> 
            </div>       
            `)
        }
    });
}

//EVENTS FUNCTION for Appending Information
marvelApp.eventResults = function (comicsEvents) {
    console.log(comicsEvents);
    //filter out any events that do not have a cover image.
    const events = comicsEvents.filter(function(comic) {
        // console.log(comic.thumbnail.path);
        return comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    });
        events.forEach((comicevent) => {
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

    
    // marvelApp.eventAppend = function (comicevent, description) {
    //     $('#events').append(`
    //         <div class='single-event-container'>
    //             <h2>${comicevent.title}</h2>
    //             <p class = 'title'>${description}</p>
    //             <img src='${comicevent.thumbnail.path}.jpg' alt = 'blah'>
    //         </div>
    //     `);
    // }

//SERIES FUNCTION for Appending Information
marvelApp.seriesResults = function (comicsSeries) {
    console.log(comicsSeries);
    //filter out any series that do not have a cover image
    const comix = comicsSeries.filter(function(comic){
        // console.log(comic.thumbnail.path);
        return comic.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available';
    })
    comix.forEach((comicseries) => {
        let description = comicseries.description;
        //if no description is available, append empty
        if (description === null) {
            let description = '';
            marvelApp.appendSeries(comicseries, description);
        } else {
            marvelApp.appendSeries(comicseries, description);
        };
    });
}

marvelApp.eventAppend = function (comicevent, description) {
    $('#events').append(`
            <div class='single-event-container'>
                <h2>${comicevent.title}</h2>
                <img src='${comicevent.thumbnail.path}.jpg' alt = 'blah'>
                <p class = 'title'>${description}</p>
            </div>
        `);
    }

marvelApp.redBorder = function(){
    $('img').on('click').toggleClass('.red-border');
}    
        // $('img.checkable').click(function(){
        //     $(this).toggleClass('checked')
        // });    
    // $('img').imgCheckbox();

//     const randomComics = [];
//     for (var i = 0; i < 20; i++)
//         randomComics.push(getRandomComics);
    
// }

//create array of 20 unique random numbers between 0 and comix.length. foreach grab the index for the comix array.


marvelApp.shuffle = function(array) {
    for (let i = array.length; i < 20; i--) {
        const j = Math.floor(Math.random() * i + 1);
        [array[i], array[j]] = [array[j], array[i]];
        return j;
    }
}


// function getRandomComics(comicArray){
//     var index = Math.floor(Math.random() * comicArray.length);
//     return comicArray[index];
// }

// const comicArray = []
// marvelApp.arrayRandomizer = function(comicArray){
//     const index = Math.floor(Math.random() * comicArray.length)
//     return comicArray.length[index];
// }
// for (index = 0; index < 20; index++){
//     comicArray.push(marvelApp.arrayRandomizer);
//     }
    
    marvelApp.appendSeries = function (comicseries, description) {
        $('#series').append(`
        <div class = 'single-series-container'>
            <h2>${comicseries.title}</h2>
            <img src='${comicseries.thumbnail.path}.jpg' alt = 'blah'>
            <p class = 'title'>${description}</p>
        </div>
        `)
    };
    
    
    
    
    
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
