// Commonly used values
const access_token = "1036519497119989";
const api_url = "https://www.superheroapi.com/api.php/"+access_token+"/";
const favFalse = '../assets/images/fav,png';
const favTrue = '../assets/images/fav-on.png';

driver();

async function driver(){
    const id = extractId();
    const data = await getInfo(id);
    renderPage(data);
}

// Handling the click events
document.addEventListener('click', (event) => {
    // Fav button
    if(event.target.id == 'fav_btn'){
        var id = event.target.parentNode.parentNode.name;
        var favs = JSON.parse(localStorage.getItem('superheroFavs'));
        if (favs.indexOf(id) != -1){            // Remove from fav
            favs = favs.filter((item) => item!=id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favFalse;
            customAlert('failure','Removed from fav');
        }
        else{                                   // Add to fav
            favs.push(id);
            localStorage.setItem('superheroFavs',JSON.stringify(favs));
            event.target.src = favTrue;
            customAlert('success','Added to fav');
        }
    }
});



//Extracting ID from url
function extractId(){
    const url = location.search;
    return url.substring(url.indexOf('=')+1);
}

// Function to call the API
async function getInfo(id){
    let response = await fetch(api_url+id);
    if(response.ok){
        var jsonData = await response.json();
        console.log(jsonData);
        return jsonData;
    }
    else{
        alert("HTTP-Error: ",response.status);
    }
}


function renderPage(data){
    document.getElementById('data-container').name = data.id;

    // Setting image of the hero
    var image = document.getElementById('image');
    image.firstElementChild.src = `${data.image.url}`;
    
    // Setting the fav icon
    var favs = JSON.parse(localStorage.getItem('superheroFavs'));
    if(favs.indexOf(data.id) != -1){
        image.lastElementChild.src = favTrue;
    }
    else{
        image.lastElementChild.src = favFalse;
    }


    // Powerstats

//appearance":{"gender":"Male","race":"Human","height":["6'2","188 cm"],"weight":["210 lb","95 kg"]


    const nameCard = document.getElementsByClassName('nameCard');
    nameCard[0].innerHTML = `${data.name}`;

    const combat = document.getElementsByClassName('combat');
    combat[0].innerHTML = `${data.powerstats.combat}`;
    combat[0].style = `width: ${data.powerstats.combat}%;`;

    const durability = document.getElementsByClassName('durability');
    durability[0].innerHTML = `${data.powerstats.durability}`;
    durability[0].style = `width: ${data.powerstats.durability}%;`;

    const intelligence = document.getElementsByClassName('intelligence');
    intelligence[0].innerHTML = `${data.powerstats.intelligence}`;
    intelligence[0].style = `width: ${data.powerstats.intelligence}%;`;

    const gender =  document.getElementsByClassName('gender');
    gender[0].innerHTML = `${data.appearance.gender}`;

    const height =  document.getElementsByClassName('height');
    height[0].innerHTML = `${data.appearance.height}`;

    const weight =  document.getElementsByClassName('weight');
    weight[0].innerHTML = `${data.appearance.weight}`;



    
}

// Converting JSON objects to paragraph
function makePresentable(jsonData){
    var str='';
    for (var key in jsonData){
        str += 
            '<p><b>'+key.charAt(0).toUpperCase()+key.slice(1) +'</b> : '+ jsonData[key]+ '</p>';
    }
    return str;
}
