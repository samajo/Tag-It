mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqMm13IiwiYSI6ImNqY3Y0c3YyYjE2azUycXZ0ZmprZ3dwOWQifQ.jksNLk1fudb_xUeg_ThSoA';
var map = new mapboxgl.Map({
container: 'map',
minZoom: 10,
maxBounds: [
            [-78.654 , 37.964],
            [-78.324 , 38.126]
        ],
style: 'mapbox://styles/saj2mw/cjnc49sx20bih2rmu768iwzaa'});

// POPUPS CODE

    // Create a popup on click 
    map.on('click', function(e) {   // Event listener to do some code when user clicks on the map

      var stops = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
        layers: ['transit', 'safety', 'infrastructure']    // replace this with the name of the layer from the Mapbox Studio layers panel
    });

      // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
      if (stops.length === 0) {
        return;
    }

    console.log(stops);

    // Initiate the popup
    var popup = new mapboxgl.Popup({ 
        closeButton: true, // If true, a close button will appear in the top right corner of the popup. Default = true
        closeOnClick: true, // If true, the popup will automatically close if the user clicks anywhere on the map. Default = true
        anchor: 'bottom', // The popup's location relative to the feature. Options are 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left' and 'bottom-right'. If not set, the popup's location will be set dynamically to make sure it is always visible in the map container.
        offset: [0, -15] // A pixel offset from the centerpoint of the feature. Can be a single number, an [x,y] coordinate, or an object of [x,y] coordinates specifying an offset for each of the different anchor options (e.g. 'top' and 'bottom'). Negative numbers indicate left and up.
    });

      // Set the popup location based on each feature
      popup.setLngLat(stops[0].geometry.coordinates);

      // Set the contents of the popup window
      popup.setHTML('<h2>' + stops[0].properties.LOCATION + '</h2><p>' + stops[0].properties.PROJECT_DESCRIPTION + '</p>');
            // stops[0].properties.stop_id will become the title of the popup (<h3> element)
            // stops[0].properties.stop_name will become the body of the popup


        // popup.setHTML('<p>' + stops[0].properties.stop_name + '</p>')
        

      // Add the popup to the map 
      popup.addTo(map);  // replace "map" with the name of the variable in line 4, if different
  });

// ADD GEOJSON DATA (static layers)

    // // See example at https://www.mapbox.com/mapbox-gl-js/example/live-geojson/
    // var staticUrl = 'https://opendata.arcgis.com/datasets/9558966205c94817bde9048333145707_1.geojson';
    // map.on('load', function () {
        
    //     window.setInterval(function() { // window.setInterval allows you to repeat a task on a time interval. See https://www.w3schools.com/jsref/met_win_setinterval.asp
    //         map.getSource('capital-project').setData(staticUrl); // https://www.mapbox.com/mapbox-gl-js/api/#map#getsource        
    //     }, 120000); // 2000 is in milliseconds, so every 2 seconds. Change this number as needed but be aware that more frequent requests will be more processor-intensive, expecially for large datasets.
        
    //     map.addSource('capital-project', { type: 'geojson', data: staticUrl });
    //     map.addLayer({
    //         "id": "capital-project",
    //         "type": "circle",
    //         "source": "capital-project",
    //         "paint": {
    //             "circle-radius": 5, 
    //             "circle-color": "#ef4031"
    //         }
    //     });
    // });

// SHOW/HIDE LAYERS
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

        // [layerMachineName, layerDisplayName]
        // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
        // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
        [['safety'], ['Safety']],
        [['infrastructure'], ['Infrastructure']],
        [['transit'], ['Transit']]
     
        // add additional live data layers here as needed
    ]; 

    var colors = [ // an array of the color values for each legend item
    '#D4F4DD',
    '#17BEBB',
    '#0E7C7B',
    ];

        // functions to perform when map loads
    map.on('load', function () {
        
        
        for (i=0; i<layers.length; i++) {

            // add a button for each layer
            $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        }

        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {

                var clickedLayer = e.target.id;

                e.preventDefault();
                e.stopPropagation();

                var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
                console.log(visibility);

                if (visibility === 'visible') {
                    map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                    $(e.target).removeClass('active');
                } else {
                    $(e.target).addClass('active');
                    map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
                }
        });
    });


    // for loop to create individual legend items
    for (i=0; i<layers.length; i++) {
        var layer =layers[i][1]; // name of the current legend item, from the layers array
        var color =colors[i]; // color value of the current legend item, from the colors array 
        
        var itemHTML = "<div><span class='legend-key'></span><span>" + layer + "</span></div>"; // create the HTML for the legend element to be added
        var item = $(itemHTML).appendTo("#legend"); // add the legend item to the legend
        var legendKey = $(item).find(".legend-key"); // find the legend key (colored circle) for the current item
        legendKey.css("background", color); // change the background color of the legend key
    }

    // var capproj = $.get(function(data) {
    //     return data;
    // });

    // for (i = 1, i <= capproj.features.properties.PROJECT_TYPE)
    // // functions to perform when map loads
    // map.on('load', function () {
        
        
    //     for (i=0; i<layers.length; i++) {

    //         // add a button for each layer
    //         $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
    //     }

    //     // show/hide layers when button is clicked
    //     $("#layers-control>a").on('click', function(e) {

    //             var clickedLayer = e.target.id;

    //             e.preventDefault();
    //             e.stopPropagation();

    //             var visibility = map.getLayoutProperty(clickedLayer, 'visibility');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#getlayoutproperty
    //             console.log(visibility);

    //             if (visibility === 'visible') {
    //                 map.setLayoutProperty(clickedLayer, 'visibility', 'none');  // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
    //                 $(e.target).removeClass('active');
    //             } else {
    //                 $(e.target).addClass('active');
    //                 map.setLayoutProperty(clickedLayer, 'visibility', 'visible'); // see https://www.mapbox.com/mapbox-gl-js/api/#map#setlayoutproperty
    //             }
    //     });
    // });