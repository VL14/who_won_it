// Animation for header
var card = document.querySelector(".card");
var playing = false;

card.addEventListener('click',function() {
  if(playing)
    return;
  
  playing = true;
  anime({
    targets: card,
    scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
    rotateY: {value: '+=180', delay: 200},
    easing: 'easeInOutSine',
    duration: 400,
    complete: function(anime){
       playing = false;
    }
  });
});

// Leaflet Map
var stateURL = "http://127.0.0.1:5000/state";

function stateStyle(feature) {
    return {
        fillColor: getColor(feature[10]),
        weight: 1,
        opacity: 1,
        color: 'gray',
        fillOpacity: 0.7
    };
}

// Function to change state color based on margin of victory
function getColor(mov) {
    return  mov > 10 ? '#0571b0' :
            (mov >= 5 && mov <= 10) ? '#92c5de' :
            (mov >= -5 && mov <= 5) ? '#ffffbf' :
            (mov >= -5 && mov <= -10) ? '#f4a582' :
            mov < -10 ? '#ca0020' :
                        '#ffffff';
}



// Create array with state name and coordinates to merge with state API data
for (i=0; i<51; i++) {
  var stateNames = [];
  
  Object.entries(test.features[i].properties).map(([key, value]) => stateNames.push(value));
  
  var stateCoordinates =
    Object.entries(test.features[i].geometry).map(([key, value]) => (value));
}
  
console.log(stateNames);

// Call API for state-level data
d3.json(stateURL).then(function(stateLevelData) {
  var features = stateLevelData;
  var features_2016 = features.filter(state => (state[1]==2016));
  var fullData = Object.assign({}, features_2016, stateCoordinates);

  console.log(features_2016);

  createFeatures(fullData);
});

function createFeatures(fullData) {
  // Create circle markers with popups for election results data
  for(var i=0; i < fullData.length; i++) {  
    var elections = L.circle(fullData.geometry, {
      color: 'white',
      radius: 100 
    });
  }

  console.log(elections);

  // Create layer for electoral vote data per state
    var electoralVotes = L.Class.extend({
        initialize: function(latLng, label, options) {
            this._latlng = fullData.coordinates;
            this._label = fullData.state;
            L.Util.setOptions(this, options);
        },
        options: {
            offset: new L.Point(0, 2)
        },
        onAdd: function(map) {
            this._map = map;
            if (!this._container) {
                this._initLayout();
            }
            map.getPanes().overlayPane.appendChild(this._container);
            this._container.innerHTML = this._label;
            map.on('viewreset', this._reset, this);
            this._reset();
        },
        onRemove: function(map) {
            map.getPanes().overlayPane.removeChild(this._container);
            map.off('viewreset', this._reset, this);
        },
        _reset: function() {
            var pos = this._map.latLngToLayerPoint(this._latlng);
            var op = new L.Point(pos.x + this.options.offset.x, pos.y - this.options.offset.y);
            L.DomUtil.setPosition(this._container, op);
        },
        _initLayout: function() {
            this._container = L.DomUtil.create('div', 'leaflet-label-overlay');
        }
    }); 

  // Create GeoJSON layer of state coordinates for color coding
  var statesDataCoded = L.geoJSON(statesData, {
    style: stateStyle,
  });

  // Call createMap function
  createMap(statesDataCoded, elections, electoralVotes, fullData);
}

function createMap(statesDataCoded, elections, electoralVotes, fullData) {
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var overlayMaps = {
    States: statesDataCoded,
    Election_Results: elections,
    Electoral_Votes: electoralVotes
    // Turnout Rate: turnout2016
  };

  var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4,
    layers: [lightmap, statesDataCoded]
  });

  // Create popups
  // var winner = 
  // elections.bindPopup("<p>Winner: " + fullData.winner + "</p><br><p>Margin of Victory: " + fullData.mov + "</p>").addTo(myMap)
 
  // Create the layer control
  L.control.layers(overlayMaps, null, {
      collapsed: false,
  }).addTo(myMap);

  // Add color-coded legend to map
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
        var div = L.DomUtil.create('div', 'info legend');
        var margins = ["Democrat (>15%)","Democrat (5-15%)","Swing State (5%)", "Republican (5-15%)", "Republican (>15%)"];
        var colors = ['#0571b0','#92c5de', '#ffffbf', '#f4a582', '#ca0020'];

        // loop through our arrays and generate a label with a colored square for each item
        for (var i = 0; i < margins.length; i++) {
            div.innerHTML +=
            '<i style="background:' + colors[i] + '"></i> ' + margins[i] + '<br>';
            }
        return div;
        };    

    legend.addTo(myMap);

    $(".leaflet-control-layers").prepend("<h5><label>Layer Control</label></h5>");
    $("div.info.legend").prepend("<h5><label>Margin Of Victory</label></h5>");
}

// Other API URLs for charts
var turnoutURL = "http://127.0.0.1:5000/turnout"
var yearURL = "http://127.0.0.1:5000/year"

// Build bar chart for turnout %
d3.json(turnoutURL).then(function(turnoutData) {
  totalVotes = turnoutData.map(row => row[2]);
  eligibleVotes = turnoutData.map(row => row[3]);
  
  var turnoutPercentage = [];
  for (var i = 0; i < totalVotes.length; i++) {
    turnoutPercentage.push(totalVotes[i] / eligibleVotes[i]);
  }
  
  var trace1 = [{
    type: "bar",
    x: turnoutData.map(row => row[1]),
    y: turnoutPercentage 
  }]

  var layout = {
    xaxis: {
      title: "Year",
      range: [1972,2020],
      tickangle: -45,
      tickmode: 'linear',
      tick0: 1972,
      dtick: 4 
    },
    yaxis: {
      title: "Voter Turnout (%)",
      showgrid: true,
      tickformat: ',.0%',
      range: [0.4, 0.7]
    }
  }

    Plotly.newPlot("bar", trace1, layout);

  });

// Build bar chart for 3rd party candidate votes
d3.json(yearURL).then(function(yearData) {
  
  d3.json(turnoutURL).then(function(turnoutData) {
    otherVotes = yearData.map(row => row[9]);
    totalVotes = turnoutData.map(row => row[2]);
    
    var votePercentage = [];
    for (var i = 0; i < otherVotes.length; i++) {
      votePercentage.push(otherVotes[i] / totalVotes[i]);
    }

  var trace2 = [{
    type: "bar",
    x: yearData.map(row => row[1]),
    y: votePercentage,
    orientation: "v"
  }]

  var layout2 = {
    xaxis: {
      title: "Year",
      range: [1972,2020],
      tickangle: -45,
      tickmode: 'linear',
      tick0: 1972,
      dtick: 4 
    },
    yaxis: {
      title: "3rd Party Votes (%)",
      showgrid: true,
      tickformat: ',.0%',
      range: [0,0.2]
    }
  }

    Plotly.newPlot("bar-other", trace2, layout2);
  });
});