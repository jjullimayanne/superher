// Commonly used values
const access_token = '1036519497119989';
const api_url = "https://www.superheroapi.com/api.php/"+access_token+"/";
const favFalse = '../assets/images/fav.png';
const favTrue = '../assets/images/fav-on.png';

driver();

function driver(){
    const favs = JSON.parse(localStorage.getItem('superheroFavs'));
    if(favs.length==0){
        document.getElementById('results').innerHTML = "Add your favourite Heroes";
        return;
    }
    document.getElementById('results').innerHTML = '';
    favs.forEach((id) => {
        searchHero(id);
    });
}


document.addEventListener('click', (event) => {
    if(event.target.id == 'details_btn'){
        var id = event.target.parentNode.id;
        window.open('./details.html'+'?id='+id, "_self");
    }
    else if(event.target.id == 'add_fav_btn'){
        var id = event.target.parentNode.parentNode.id;
        var favs = JSON.parse(localStorage.getItem('superheroFavs'));
        if (favs.indexOf(id) != -1){
            favs = favs.filter((item) => item!=id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favFalse;
            document.getElementById(id).remove();
        }
        else{
            favs.push(id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favTrue;
        }
    }
});


async function searchHero(id){

    let response = await fetch(api_url+id);
    if (response.ok) { 
        renderCard(await response.json());
    }
    else {
        alert("HTTP-Error: " + response.status);
    }
}


function renderCard(data){
    var cardContainer = document.createElement('DIV');
    cardContainer.className = 'card-container center';
    cardContainer.id = data.id;
    var srcFav;
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));

    if(favs.indexOf(data.id) !== -1){
        srcFav = favTrue;
    }
    else{
        srcFav = favFalse;
    }
    cardContainer.innerHTML = `
        <div class="card-img-container">
            <img src="${data.image.url}">
        </div>
        <div id="details_btn" class="card-name">${data.name}</div>
        <div class="card-btns">
            <img id="add_fav_btn" src="${srcFav}" width="25">
        </div>
    
        <div id="stats-container">
            <div id="stat-names">
                <span>Combat</span>
                <span>Durability</span>
                <span>Intelligence</span>
              
            </div>

            <div id="stat-bars">
                <div class="bar-container">
                    <div class="bar combat" style="width: ${data.powerstats.combat}%;">${data.powerstats.combat}</div>
                </div>
                <div class="bar-container">
                    <div class="bar durability" style="width: ${data.powerstats.durability}%;">${data.powerstats.durability}</div>
                </div>
                <div class="bar-container">
                    <div class="bar intelligence" style="width: ${data.powerstats.intelligence}%;">${data.powerstats.intelligence}</div>
                </div>
               
            </div>
        </div>
    `
    document.getElementById('results').appendChild(cardContainer);
}


