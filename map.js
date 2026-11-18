const map = L.map('map').setView([-1.15081,36.90106], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let button = document.getElementById("confirmed")
let start_loc = document.getElementById("start_loc")
let end_loc = document.getElementById("end_loc")
let link = "https://photon.komoot.io/api/?q="

button.addEventListener("click",triggerconfirm)
async function triggerconfirm()
{
    //TO DO : show the start and end location on the map

    let itemsstart = await getlatandlong(start_loc)
    let latstart = itemsstart[0]
    let lonstart = itemsstart[1]

    let itemsend = await getlatandlong(end_loc)
    let latend = itemsend[0]
    let lonend = itemsend[1]
    
    map.setView([latstart,lonstart],5)
    L.marker([latstart,lonstart]).addTo(map)

    L.marker([latend,lonend]).addTo(map)

    //connecting the routes
    let link = "https://router.project-osrm.org/route/v1/driving/"+lonstart+","+latstart+";"+lonend+","+latend+"?overview=full&geometries=geojson"
    let response = await fetch(link)
    let info =await response.json()
    let geometry = info["routes"][0]["geometry"]
    console.log(geometry)

    let connect_lines_route = L.geoJSON(geometry).addTo(map)
    map.fitBounds(connect_lines_route.getBounds())

    //distanceee
    let distance = info["routes"][0]["distance"]
    console.log(distance)
    DISTANCE = info["routes"][0]["distance"]  

 
}


async function getlatandlong(location)
{
    let complete_link = link + location.value 
    console.log(complete_link)
    let response = await fetch(complete_link)
    let info = await response.json()
    let lon = info["features"][0]["geometry"]["coordinates"][0]
    let lat = info["features"][0]["geometry"]["coordinates"][1]
    return[lat,lon]
} 