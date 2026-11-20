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
    //removeing prevoius markers
    if(MARKERS.length>0)
    {
        map.removeLayer(MARKERS[0])
        map.removeLayer(MARKERS[1])
    }
    MARKERS=[]
    MARKERS.push(L.marker([latstart,lonstart]))


    MARKERS.push(L.marker([latend,lonend]))
    MARKERS[0].addTo(map)
    MARKERS[1].addTo(map)

    //connecting the routes
    let link = "https://router.project-osrm.org/route/v1/driving/"+lonstart+","+latstart+";"+lonend+","+latend+"?overview=full&geometries=geojson"
    let response = await fetch(link)
    let info =await response.json()
    let geometry = info["routes"][0]["geometry"]
    console.log(geometry)

//removeing routessss
    if(ROUTE!=null)
    {
        map.removeLayer(ROUTE)
    }
    ROUTE = L.geoJSON(geometry)
    ROUTE.addTo(map)
    map.fitBounds(ROUTE.getBounds())

    //distanceee
    let distance = info["routes"][0]["distance"]
    let h1 = document.getElementById("kilooo")
    h1.innerText = (distance/1000).toFixed(2)
    console.log(distance)
    DISTANCE = info["routes"][0]["distance"]  

    //steppppss
    let H1 = document.getElementById("stepzz")
    H1.innerText = Math.floor((distance/1000)*1300)
 
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