function updateMap(){
    console.log("Updating data...")
    fetch("https://corona-api.com/countries")
    .then(response => response.json())
    .then(rsp =>{
        console.log(rsp.data)
        rsp.data.forEach(element => {
            latitude = element.coordinates.latitude,
            longitude = element.coordinates.longitude,
            cases = element.latest_data.confirmed
            
            if (cases >= 255){
                color="rgb(255,0,0)"
            }
            else{
                color = `rgb(${cases}, 0, 0)`
            }

            new mapboxgl.Marker({
                draggable: false,
                color: color
                }).setLngLat([longitude, latitude])
                .addTo(map);
        });
            // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl());

    })
}

updateMap()
let interval = 10000000;
setInterval(updateMap , interval)
