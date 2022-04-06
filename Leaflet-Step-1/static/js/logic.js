

const link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

d3.json(link).then (function(data) {
    let earthData=data;
    console.log(earthData)
    let earthquakeData=earthData.features
    console.log(earthquakeData)
    
    var myMap = L.map('map', {
        center: [39.7392, -88.9903],
        zoom: 5
    });
    
    // Add a tile layer to the mao:
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);

    function color(depth) {
        if (depth > 90) {
            return '#ea2c2c'
        } else if (depth > 70) {
            return '#ea822c'
        } else if (depth > 50) {
            return '#ee9c00'
        } else if (depth > 30) {
            return '#eecc00'
        } else if (depth > 10) {
            return '#d4ee00'
        } else {
            return '#98ee00'
        }
    }
    // // Loop through the earthquakeData array, and create one marker for each pair of coordinates.
    for (var i = 0; i < earthquakeData.length; i++) {
        let magnitude= earthquakeData[i].properties.mag
        
        let location=earthquakeData[i].geometry.coordinates
        let depth=location[2]
        let place=earthquakeData[i].properties.place
          L.circle([location[1],location[0]], {
            color: 'black',
            weight: 0.25,
            fillOpacity: 0.75,
            fillColor: color(depth),
            radius: magnitude* 10000
          }).bindPopup(`<h1>${location[1]},${location[0]} </h1> <br> <h1>${place} </h1> <hr> <h2>Depth: ${depth}</h2> <h2>Magnitude: ${magnitude}</h2>`).addTo(myMap);
        }

        var legend = L.control({position: 'bottomright'});

    legend.onAdd = function (map) {

        var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Car", "ball"],
        labels = ["http://datentaeter.de/wp-content/uploads/2016/06/flag_de.png","http://datentaeter.de/wp-content/uploads/2016/06/flag_de.png"];

    // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
            grades[i] + (" <img src="+ labels[i] +" height='50' width='50'>") +'<br>';
         }

        return div;
    };

    legend.addTo(map);
      
    // var legend = L.control({position: "topright",});
    //     legend.onAdd = function() {
    //         var div = L.DomUtil.create("div", "info legend");
    //         var colors = ['#a7f542', '#f5f542','#f5c542', '#f5c542', '#f56f42', '#f54242'];
    //         var labels = ["-10-10", "10-30", "30-50", "50-70", "70-90", "90+"];
    //         for(var i = 0; i < labels.length; i++){
    //             div.innerHTML += "<i style='background:"+ colors[i]+"></i>" ;
    //         }
    //         return div;
    //     };
    // legend.addTo(myMap);
       
    
  });



