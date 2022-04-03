

const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(link).then (function(data) {
    let earthData=data;
    console.log(earthData)
    let earthquakeData=earthData.features
    console.log(earthquakeData)
    
    var myMap = L.map('map', {
        center: [36.0522, -90.2437],
        zoom: 3
    });
    
    // Add a tile layer to the mao:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    function color(depth) {
        if (depth > 90) {
            return '#f54242'
        } else if (depth > 70) {
            return '#f56f42'
        } else if (depth > 50) {
            return '#f5c542'
        } else if (depth > 30) {
            return '#f5c542'
        } else if (depth > 10) {
            return '#f5f542'
        } else {
            return '#a7f542'
        }
    }
    // // Loop through the earthquakeData array, and create one marker for each pair of coordinates.
    for (var i = 0; i < earthquakeData.length; i++) {
        let magnitude= earthquakeData[i].properties.mag
   
        let location=earthquakeData[i].geometry.coordinates
        let place=earthquakeData[i].properties.place
          L.circle([location[1],location[0]], {
            fillOpacity: 0.75,
            color: color(location[3]),
            radius: magnitude* 10000
          }).bindPopup(`<h1>${place}</h1> <hr> <h3>Magnitude: ${magnitude}</h3>`).addTo(myMap);
        }
     var legend = L.control({position: "topright",});
        legend.onAdd = function() {
            var div = L.DomUtil.create("div", "legend");
            var color = ['#a7f542', '#f5f542','#f5c542', '#f5c542', '#f56f42', '#f54242'];
            var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
            return div;
        };
            
        legend.addTo(myMap);
    
  });





// //Creating a new marker:
// var marker = L.marker([45.52, -122.67], {
//   draggable: true,
//   title: "My First Marker"
// }).addTo(myMap);


// function markerSize(population) {
//   return Math.sqrt(population) * 50;
// }

// // 
// d3.json(geoData).then(function(data) {
//     earthquakes = data.features
      
//     earthquakes.forEach(function(earthquake){
//         var magnitude = earthquake.properties.mag
//         var location = earthquake.geometry.coordinates

//         L.circle([location[1],location[0]], {
//             color: "black",
//             fillColor: color(location[3]),
//             fillOpacity: .75,
//             radius: magnitude * 10000,
//             // stroke: false
//         }).addTo(myMap);

//     })
// })