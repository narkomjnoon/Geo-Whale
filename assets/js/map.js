let markers = [];
function cacherMarqueurs() {
    for (let i = 0; i < markers.length; i++) { 
        mymap.removeLayer(markers[i]); 
    };
    markers = [];
};
var mymap = L.map('map00').setView([49.12, -123.47], 7.499);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(mymap);

function ajoutmarkers(){
    let postdata = $('#search').serializeArray();
    $.ajax({
        type: 'POST',
        url: '/curl',
        data: postdata,
        dataType: 'json',
        success: function (result) {
            for (let i = 0; i < result.length; i++) {
                const element = result[i];
                // console.log(element);
                let lat = element['latitude']
                let long = element['longitude']
                let quantity = element['quantity']
                let species = element['species']
                let setQant = '<br>Quantité : Inconnue';
                let newMarker = L.marker([lat, long])
                    .addTo(mymap)
                    .bindPopup('')

                let mapopup = newMarker.getPopup();
                if (quantity !== null) {
                    setQant = '<br>Quantité : ' + quantity
                }
                mapopup.setContent('lat : ' + lat + '<br>long : ' + long + setQant + '<br>Espèces : ' + species)
                markers.push(newMarker);
            }
            loader.className = 'hidden';
        }
    });
}

$(function () {
    $('#search').submit(function (e) {
        e.preventDefault();
        if (markers.length > 0) {
            console.log("TOTO");
            cacherMarqueurs();
            console.log(markers.length)
            ajoutmarkers();
        } else {
            ajoutmarkers();
        }
    });
})

// APPARTITION LOADER
let loader = document.getElementById('loader');
let hidden = document.getElementsByClassName('hidden');
let visible = document.getElementsByClassName('visible');
let bouton = document.getElementById('submit');


    bouton.onclick = function afficher() {
    if(loader.className==='hidden'){
        loader.className = 'visible';
    } else{
        loader.className = 'hidden';
    }
}