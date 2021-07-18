// Had to make the color of the markers first for future reference
// Create Marker Color function
function markerColor(mag) {

    if (mag >= 5) {
        return "rgb(240, 107, 107)" 
    } else {
        if (mag > 4) {
            return "rgb(240, 167, 107)"
        } else {
            if (mag > 3) {
                return "rgb(243, 186, 77)"
            } else {
                if (mag > 2) {
                    return "rgb(243, 219, 77)"
                } else {
                    if (mag > 1) {
                        return "rgb(226, 243, 77)"
                    } else {
                        return "rgb(183, 243, 77)"
                    }
                }
            }
        }
    };
  }
  
  
  // I wanted a funtion that could create the map and the leyend of it, but was kind of triky since
  // I didn't know how to without using command to create multiple layers using just one layer.
  function createMap(earthquakes) {
  
    // This part creates the layer
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "light-v10",
        accessToken: API_KEY
    });

    // These 4 will just be commands I used just to make the map a funtion
    var baseMaps = {
      "Light": lightmap
    };
    var overlayMaps = {
      "Earthquakes": earthquakes
    };
    var myMap = L.map("map", {
      center: [0, 0],
      zoom: 2,
      layers: [lightmap, earthquakes]
    });
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  
    // These is the legend for the map
    var legend = L.control({position: 'bottomright'});
  
    legend.onAdd = () => {
      var div = L.DomUtil.create('div', 'info legend');
      var magnitudesForMap = [4.75, 5.0, 5.25, 5.5, 5.75];
  
      magnitudesForMap.forEach(Data_m => {
        var range = `${Data_m} - ${Data_m+0.25}`;
        if (Data_m >= 5.75) {range = `${Data_m}+`}
        var html = `<div class="legend-item">
              <div style="height: 25px; width: 25px; background-color:${markerColor(Data_m)}"> </div>
              <div class=legend-text>Magnitude:- <strong>${range}</strong></div>
          </div>`
        div.innerHTML += html
      });
      return div;
    };
    legend.addTo(myMap);
  }
  
  // This part creates the markers.
  function Markers(response) {
  
      var earthquakes = response.features;
      var earthquakeMarkers = []
  
      for (var index = 0; index < earthquakes.length; index++) {
          var earthquake = earthquakes[index];
  
          var circle_markers = L.circleMarker([ earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0] ], {
                  radius: earthquake.properties.mag * 2,
                  fillColor: markerColor(earthquake.properties.mag),
                  fillOpacity: 0.75,
                  stroke: false
              }
              ).bindPopup("<h4>" + earthquake.properties.place + "</h4><hr><p>" + new Date (earthquake.properties.time) + "</p>" + "<p><b>Magnitude: " +  earthquake.properties.mag + "<b></p>");
  
          earthquakeMarkers.push(circle_markers);
      }
      createMap(L.layerGroup(earthquakeMarkers));
  
  }
  
  
  // Hard a hard time making d3 a funtion, so I just made everything first before running it with the json.
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", Markers);

