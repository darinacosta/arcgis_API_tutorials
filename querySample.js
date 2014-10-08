var map, defPopSymbol, onePopSymbol, 
      twoPopSymbol, threePopSymbol, fourPopSymbol,
      fivePopSymbol, map;
      
      var censusCounties = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Specialty/ESRI_StateCityHighway_USA/MapServer/2"

      require(["esri/map", 
      "esri/tasks/query",
      "esri/tasks/QueryTask",
      "esri/symbols/SimpleFillSymbol",
      "esri/InfoTemplate",
      "esri/Color",
      "dojo/domReady!"], 
      function(
        Map,
        Query,
        QueryTask,
        SimpleFillSymbol,
        InfoTemplate,
        Color
      ) {
        map = new Map("map", {
          basemap: "streets",
          center: [-105.498, 38.981], // longitude, latitude
          zoom: 6,
          sliderStyle: "small"
        });
        
        defPopSymbol = new SimpleFillSymbol().setColor(
          new Color([255, 255, 255, 0]));
        
        //Instantiate new query task
        var queryTask = new QueryTask(censusCounties);
        
        //Instantiate query for the query task to run
        var query = new Query();
        
        //The where function is used to create a SQL statement to run against the layer
        query.where = "STATE_NAME = 'Colorado'";
        
        /*Setting returnGeometry to true indicates that the server should return the
        geometric definition of all features that matched the query*/
        query.returnGeometry = true;
        
        //The outFields are the fields that will be returned with the geometry
        query.outFields = ["POP90_SQMI"];
        
        /*The execute method is used on the query task to perform the query. 
        The first argument is the query that we've defined. The second argument is
        a callback function that specifies what to do with the results that are returned 
        from the server as a "featureSet" object after it has run the query*/
        queryTask.execute(query, addPolysToMap);
        
        function addPolysToMap(featureSet){
          var features = featureSet.features;
          var feature;
          for (var i = 0; i < features.length; i++) {
            map.graphics.add(features[i])
          }
        }
      });
