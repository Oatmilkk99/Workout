const map = L.map('map').setView([-1.15081,36.90106], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let button = document.getElementById("confirmed")
let start_loc = document.getElementById("start_loc")
let end_loc = document.getElementById("end_loc")
let link = "https://nominatim.openstreetmap.org/search?format=json&limit=1&q="

button.addEventListener("click",triggerconfirm)
async function triggerconfirm()
{
    //TO DO : show the start and end location on the map
    let complete_link = link + start_loc.value 
    console.log(complete_link)
    let response = await fetch(complete_link)
    let info = await response.json()
    console.log(info[0]["lon"])
}

    