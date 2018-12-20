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

// SHOW/HIDE LAYERS
// See example at https://www.mapbox.com/mapbox-gl-js/example/toggle-layers/
    
    // var layers = [  // an array of the layers you want to include in the layers control (layers to turn off and on)

    //     // [layerMachineName, layerDisplayName]
    //     // layerMachineName is the layer name as written in your Mapbox Studio map layers panel
    //     // layerDisplayName is the way you want the layer's name to appear in the layers control on the website
    //     [['safety'], ['Safety']],
    //     [['infrastructure'], ['Infrastructure']],
    //     [['transit'], ['Transit']]
     
    //     // add additional live data layers here as needed
    // ]; 

    var layers = [
    'Transit',
    'Vehicular',
    'Public Transit',
    'Street',
    'Sidewalk',
    'Bicycle'
    ];

    var colors = [ // an array of the color values for each legend item
    '#D4F4DD',
    '#17BEBB',
    '#0E7C7B',
    '#D4F4DD',
    '#17BEBB',
    '#0E7C7B',
    ];

        // functions to perform when map loads
    map.on('load', function () {
        
        
        //  for (i=0; i<layers.length; i++) {

        //      // add a button for each layer
        //      $("#layers-control").append("<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
        // }
        // for (i=0; i<layers.length; i++) {

        //     // add a button for each layer
        //     console.log(layers[i]);
        //     $("#layers-control").append("<label class='container'>" + layers[i] + "<input type='checkbox'> <span class='checkmark'></span> </label>"); // see http://api.jquery.com/append/
        // }
        // show/hide layers when button is clicked
        $("#layers-control>a").on('click', function(e) {
                console.log("hi");
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
    // for (i=0; i<layers.length; i++) {
    //     var layer =layers[i]; // name of the current legend item, from the layers array
    //     var color =colors[i]; // color value of the current legend item, from the colors array 
        
    //     var itemHTML = "<div><span class='legend-key'></span><span>" + layer + "</span></div>"; // create the HTML for the legend element to be added
    //     var item = $(itemHTML).appendTo("#legend"); // add the legend item to the legend
    //     var legendKey = $(item).find(".legend-key"); // find the legend key (colored circle) for the current item
    //     legendKey.css("background", color); // change the background color of the legend key
    // }

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

    // // Select SVG from HTML and specify margins, width and height
    // var barchart = d3.select("#part-one").selectAll("#bar-chart");
    
    // var bcMargin = {top: 20, right: 100, bottom: 30, left: 100};
    
    // var bcWidth = +barchart.attr("width") - bcMargin.left - bcMargin.right;
    
    // console.log(bcWidth);

    // var bcHeight = +barchart.attr("height") - bcMargin.top - bcMargin.bottom;

    // // Set up a d3 scale for the X-values. Scales in d3 help map data to a visual representation. They don't create anything visual, they just help to sort and convert data. Read more about d3 scales at https://github.com/d3/d3-scale
    
    // var x = d3.scaleBand()
    // .rangeRound([0, bcWidth])
    // .padding(0.5);

    //     // scaleBand() creates a Band scale which is used in a bar chart. Discrete output values are automatically computed by the scale by dividing the continuous range into uniform bands. Read more at https://github.com/d3/d3-scale/blob/master/README.md#scaleBand.

    //     // rangeRound(min, max) translates the values in the data set to values within a set range, in this case a range from 0 (min) to the width of the SVG (max). Read more at https://github.com/d3/d3-scale/blob/master/README.md#band_rangeRound
        
    //     // padding(value) sets the inner and outer padding of each band to a percentage of the band width (a value between 0 and 1). Read more at https://github.com/d3/d3-scale/blob/master/README.md#band_padding

    // // Set up a d3 scale for the Y-values
    // var y = d3.scaleLinear().rangeRound([bcHeight, 0]);

    // var barchartG = barchart.append("g")
    // .attr("transform", "translate(" + bcMargin.left + "," + bcMargin.top + ")");

    // d3.json("data/barchart.json", function(error, data) {   // Change this file location to use a different file
        
    //     // Standard error reporting function, just in case
    //     if (error) throw error;

    //     // Returning the data from the json. Change d.Letter and d.Freq below to use the key names in the json you are using
    //     data.forEach(function(d) {
    //         d.Letter = d.Letter;
    //         d.Freq = +d.Freq; // The + sign here converts data to a number. This is a fail-safe to make sure the data is consistent, since the data needs to be numeric for the scaleLinear() function to work. 
    //     });

    //     // Scale the range of the data
    //     x.domain(data.map(function(d) { return d.Letter; }));
    //     y.domain([0, d3.max(data, function(d) { return d.Freq; })]);

    //     // Set up and append an x-axis
    //     barchartG.append("g")
    //     .attr("class", "axis axis-x")
    //     .attr("transform", "translate(0," + bcHeight + ")")
    //     .call(d3.axisBottom(x));    // d3.axisBottom(scale) constructs an bottom-facing axis in the SVG, read more at https://github.com/d3/d3-axis/blob/master/README.md#axisBottom

    //     // Set up and append a y-axis
    //     barchartG.append("g")   // "g" here is an SVG group (like an Illustrator layer)
    //     .attr("class", "axis axis-y")
    //     .call(d3.axisLeft(y).ticks(5)) // d3.axisLeft(scale) constructs an axis at the left of the SVG. Read more at https://github.com/d3/d3-axis/blob/master/README.md#axisLeft. d3.axis.ticks() determines the number of ticks on the axis. Read more at https://github.com/d3/d3-axis/blob/master/README.md#axis_ticks
        
    //     // append a label to the y-axis
    //     .append("text")
    //     .attr("transform", "rotate(-90)")
    //     .attr("y", 6)
    //     .attr("dy", "0.7em")    // We are modifying the y-coordinates because the text has been rotated 90 degrees
    //     .attr("text-anchor", "end")
    //     .text("Frequency");


    //     // Append the bars to the bar chart
    //     // Note that the following code is standard d3 for adding data-driven elements to the DOM. It may seem confusing that we are selecting elements before adding them, but that's just the way d3 works! As a standard, d3 will always add data-driven elements to the DOM using the following code:
        
    //     //      elementToAddTo
    //     //          .selectAll(elementsToAdd)
    //     //          .data(data)
    //     //          .enter()
    //     //          .append(elementType)
        
    //     barchartG.selectAll(".bar")
    //     .data(data)
    //     .enter().append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function(d) { return x(d.Letter); })
    //     .attr("y", function(d) { return y(d.Freq); })
    //     .attr("width", x.bandwidth())
    //     .attr("height", function(d) { return bcHeight - y(d.Freq); });
    // });
