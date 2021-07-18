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
  


