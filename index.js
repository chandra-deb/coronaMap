function updateMap(){
    console.log("Updating data...")
    fetch("https://corona-api.com/countries")
    .then(response => response.json())
    .then(rsp =>{
        console.log(rsp.data)
        rsp.data.forEach(array => {
            latitude = array.coordinates.latitude,
            longitude = array.coordinates.longitude,
            cases = array.latest_data.confirmed,
            countryName = array.name
            
            if (cases >= 255){
                color="rgb(255,0,0)"
            }
            else{
                color = `rgb(${cases}, 0, 0)`
            }
            
            // let testingTemplate = "<style>h1{position:absolute; display: none; left:100px;}</style><h1>" + cases + "</h1>";

            var popup = new mapboxgl.Popup({
                offset:[0, -70],
                closeButton:false
                }
            ).setHTML(
                "<h1>" + cases + countryName + "</h1>"
            );

            let marker = new mapboxgl.Marker({
                draggable: false,
                color: color
                })
                .setLngLat([longitude, latitude])
                .addTo(map)
                marker.setPopup(popup);
                
            // get the marker element
            const element = marker.getElement();
            element.id = 'marker'
            // hover event listener
            element.addEventListener('mouseenter', () => popup.addTo(map));
            element.addEventListener('mouseleave', () => popup.remove());
        });
            
            // Add zoom and rotation controls to the map.
            map.addControl(new mapboxgl.NavigationControl());
            var geocoder = new MapboxGeocoder({
                accessToken: mapboxgl.accessToken,
                });
                 
            document.getElementById('geocoder').appendChild(geocoder.onAdd(map));

    })
}

updateMap()
let interval = 10000000;
setInterval(updateMap , interval)
