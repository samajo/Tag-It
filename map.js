mapboxgl.accessToken = 'pk.eyJ1Ijoic2FqMm13IiwiYSI6ImNqY3Y0c3YyYjE2azUycXZ0ZmprZ3dwOWQifQ.jksNLk1fudb_xUeg_ThSoA';
var map = new mapboxgl.Map({
container: 'map',
minZoom: 10,
maxBounds: [
            [-78.654 , 37.964],
            [-78.324 , 38.126]
        ],
style: 'mapbox://styles/saj2mw/cjnc49sx20bih2rmu768iwzaa'});


var stops = [];
// POPUPS CODE

    // Create a popup on click 
    map.on('click', function(e) {   // Event listener to do some code when user clicks on the map

      stops = map.queryRenderedFeatures(e.point, {  // Query the map at the clicked point. See https://www.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/ for an example on how queryRenderedFeatures works and https://www.mapbox.com/mapbox-gl-js/api/#map#queryrenderedfeatures for documentation
        layers: ['bus', 'sign', 'traffic', 'safety', 'condition']    // replace this with the name of the layer from the Mapbox Studio layers panel
    });

      // if the layer is empty, this if statement will exit the function (no popups created) -- this is a failsafe to avoid non-functioning popups
      if (stops.length === 0) {
        return;
    }


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
      popup.setHTML('<h2>' + stops[0].properties.LOCATION + '</h2><h1> UP VOTES: ' + stops[0].properties.UP_VOTES + '</h1><p>' + stops[0].properties.PROJECT_DESCRIPTION + '</p>');
        
      // Add the popup to the map 
      popup.addTo(map);
  });

    $("#tag-space").on('click', function(e) {
        var clickedLayer = e.target.id;
                e.preventDefault();
                e.stopPropagation();

        console.log(e);
        if ($(e.target).hasClass('active')) {
        	$(e.target).removeClass('active');
            map.getCanvas().style.cursor = 'default';
            $("#map").css('cursor', 'default');
        }
        else {
            $(e.target).addClass('active');
            console.log(location.href);
    		map.getCanvas().style.cursor = "url(" + "'https://github.com/samajo/Tag-It/blob/master/img/tagIt.svg')";
        }
    });

    map.on('click', function(e) {
        if ($(document.getElementById("tagIt")).hasClass('active')) {
            var popup = new mapboxgl.Popup({
                closeButton: true,
                closeOnClick: true,
                anchor: 'bottom',
                offset: [0, -15]
            });

            popup.setLngLat(e.lngLat);

            popup.setHTML('<h2>' + 'Here is where you could add your own point, if I knew how to do that.' + '</h2>');

            popup.addTo(map);
        }
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
    [['condition'],['condition']],
    [['safety'],['safety']],
    [['bus'],['bus']],
    [['sign'],['sign']],
    [['traffic'],['traffic']]
    ];

        // functions to perform when map loads
    map.on('load', function () {
        
        
         for (i=0; i<layers.length; i++) {

             // add a button for each layer
             $("#layers-control").append("<img src='img/" + layers[i][1] + "_Btn.svg' style='width:50px;height:50px;'>" + "<a href='#' class='active button-default' id='" + layers[i][0] + "'>" + layers[i][1] + "</a>"); // see http://api.jquery.com/append/
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
        // for (i=0; i<layers.length; i++) {
        //     var votes = [map.queryRenderedFeatures(null, {layers[i]})];
        //     for (u=0; u<votes.length; u++) {
        //         votes[i]
        //     }
        // }
    });
//---------------------------------candyChart----------------------------------------

// Part one - bar chart

        // set the dimensions and margins of the graph
        var bcHeight = 250;
        var bcWidth = 400;
        var margin = {top: 20, right: 20, bottom: 30, left: 40},
            width = bcWidth - margin.left - margin.right,
            height = bcHeight - margin.top - margin.bottom;

        // set the ranges
        var x = d3.scaleBand()
                  .range([0, width])
                  .padding(0.1);
        var y = d3.scaleLinear()
                  .range([height, 0]);

        // append the svg object to the body of the page
        // append a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        var svg = d3.select("#bar-chart")
            
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", 
                  "translate(" + margin.left + "," + margin.top + ")");

        updateBarchart("#bar-chart");

    function updateBarchart(element) {

        var svg = d3.select(element).select("g");   // Using select instead of selectAll selects only the first svg group (g) in the bar chart. 

        svg.html(""); // clears current barchart by replacing contents with empty html

        // map the localstorage variables for each candy to a data array
        var data = []; 
        for (i=0; i<layers.length; i++) {
          // get the session variable for each candy type (the candy count)
          // the format of each element in the array will be {candyType: "candy-bear", candyCount: 3}
          var iTotal = 0;
          var iCat = map.queryRenderedFeatures({layers:[i]});
          var iLength = map.queryRenderedFeatures({layers:[i][0]}).length;
          console.log(layers[i][0]);
          console.log(iLength);
          for (u=0; u<iLength; u++) {
          	iTotal = iTotal + iCat[u].properties.UP_VOTES;
          }
          data.push({tagType: layers[i][1], tagCount: iTotal});
          console.log(iTotal);
        }

        // Scale the range of the data in the domains
        x.domain(data.map(function(d) { return d.tagType; }));
        y.domain([0, d3.max(data, function(d) { return d.tagCount; })]);

        // append the rectangles for the bar chart
        svg.selectAll(".bar")
            .data(data)
          .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.tagType); })
            .attr("width", x.bandwidth())
            .attr("y", function(d) { return y(d.tagCount); })
            
            .attr("height", function(d) { return height - y(d.tagCount); });

        // add the x Axis
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        // add the y Axis
        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y));
    }