var map;
var graphicsArray = [];

require([
  "esri/map",

  //Geometry Modules
  "esri/geometry/Geometry",
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",

  //Graphic & Style Modules
  "esri/graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/Color",
  "esri/InfoTemplate",

  "dojo/domReady!",
  "esri/geometry"], 

  function(
    Map,

    //Geometry Hooks
    Geometry, 
    Point, 
    Polyline, 
    Polygon,

    //Graphic & Style Hooks
    Graphic,
    SimpleMarkerSymbol,
    SimpleLineSymbol,
    SimpleFillSymbol,
    Color,
    InfoTemplate

  ) {
  
    map = new Map("map", {
      basemap: "topo",
      center: [-106.61, 35.1107], // longitude, latitude
      zoom: 13
    });

    function generateGraphicsArray(){

      //Begin Point Graphic

      //Initialize geographic point location
      var point = new Point(-106.61, 35.1107); 

      //Initialize style that will be applied to point   
      var pointSymbol = new SimpleMarkerSymbol(); 

      //Initialize attributes that will be applied to point 
      var pointAttributes = {city: "Albuquerque",  
                             state: "New Mexico"};

      //Initialize pop-up template in which the point attributes will appear when clicked
      var pointInfoTemplate = new InfoTemplate("Albuquerque Test"); 

      //Instantiate a new graphic class and pass the point, style, and attributes as an argument
      //Set the info template graphic that will appear when the point is clicked
      var pointGraphic = new Graphic(point, pointSymbol,     
        pointAttributes).setInfoTemplate(pointInfoTemplate)
      graphicsArray.push(pointGraphic);


      //Polyline Graphic
      var polyline = new Polyline();
      var path = [new Point(-106.6, 35.1107), 
                  new Point(-106.59, 35.1107),
                  new Point(-106.59, 35.1)];
      polyline.addPath(path);
      var polylineSymbol = new SimpleLineSymbol();
      var polylineGraphic = new Graphic(polyline, polylineSymbol)
      graphicsArray.push(polylineGraphic);

     //Polygon Graphic
      var polygon = new Polygon();
      var ring = [[-106.6, 35.11], 
                  [-106.62, 35.1],
                  [-106.65, 35.1],
                  [-106.6, 35.11]];
      polygon.addRing(ring);
      var fillSymbol = new SimpleFillSymbol().setColor(new Color([235, 0, 0, .25]));
      var polygonGraphic = new Graphic(polygon, fillSymbol);
      graphicsArray.push(polygonGraphic);
    }
    
    generateGraphicsArray();
    map.on("load", function(){
      for (i = 0; i < graphicsArray.length; ++i){
        map.graphics.add(graphicsArray[i]) 
      }
    });

  
});
 