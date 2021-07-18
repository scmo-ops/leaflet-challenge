// This section creates a tile layer that will be the background of the map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "light-v10",
  accessToken: API_KEY
});

// Create the map with our layers
var map = L.map("map", {
    center: [37.7750, -120.5050],
    zoom: 5
});

// This section querys the url
var url='https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
d3.json(url, function(earthquakeData) {
    function circleColor(color) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(color.properties.mag),
            color: "#000000",
            radius: getRadius(color.properties.mag),
            stroke: true,
            weight: 0.5 
        };
    }

    function color_marker(mag) {
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
        }
        };
        function radiusMagnitude(radius) {
            if (magnitude ===0 ) {
                return1;
            }
            return radius*4;
        }
}

