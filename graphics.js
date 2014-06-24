
var map;
var graphicsArray = [];

require([
  "esri/map",

  //Geometry Modules
  "esri/geometry/Geometry",
  "esri/geometry/Point",
  "esri/geometry/Polyline",
  "esri/geometry/Polygon",

  //Graphic Modules
  "esri/graphic",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",

  "dojo/domReady!",
  "esri/geometry"], 

  function(
    Map,

    //Geometry Hooks
    Geometry, 
    Point, 
    Polyline, 
    Polygon,

    //Graphic Hooks
    Graphic,
    SimpleMarkerSymbol,
    SimpleLineSymbol

  ) {
  
    map = new Map("map", {
      basemap: "topo",
      center: [-106.61, 35.1107], // longitude, latitude
      zoom: 13
    });

    var point = new Point(-106.61, 35.1107);
    var markerSymbol = new SimpleMarkerSymbol();
    var pointGraphic = new Graphic(point, markerSymbol)
    graphicsArray.push(pointGraphic);

    var polyline = new Polyline();
    var path = [new Point(-106.6, 35.1107), 
                new Point(-106.5, 35.1107),
                new Point(-106.5, 35.1)];
    polyline.addPath(path);
    var lineSymbol = new SimpleLineSymbol();
    var lineGraphic = new Graphic(polyline, lineSymbol)
    graphicsArray.push(lineGraphic);
    
    map.on("load", function(){
      for (i = 0; i < graphicsArray.length; ++i){
        map.graphics.add(graphicsArray[i]) 
      }
    });

  
});
 