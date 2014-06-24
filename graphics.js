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

    function generateGraphicsArray(){

      //Point Graphic
      var point = new Point(-106.61, 35.1107);
      var pointSymbol = new SimpleMarkerSymbol();
      var pointGraphic = new Graphic(point, pointSymbol)
      graphicsArray.push(pointGraphic);

      //Polyline Graphic
      var polyline = new Polyline();
      var path = [new Point(-106.6, 35.1107), 
                  new Point(-106.5, 35.1107),
                  new Point(-106.5, 35.1)];
      polyline.addPath(path);
      var polylineSymbol = new SimpleLineSymbol();
      var polylineGraphic = new Graphic(polyline, polylineSymbol)
      graphicsArray.push(polylineGraphic);

      //Polygon Graphic
      var polygon = new Polygon();
    }
    
    generateGraphicsArray();
    map.on("load", function(){
      for (i = 0; i < graphicsArray.length; ++i){
        map.graphics.add(graphicsArray[i]) 
      }
    });

  
});
 
 