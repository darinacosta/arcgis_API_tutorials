/*
This is a simple script to illustrate the AMD format of the ArcGIS Javascript API. 
When run in a browser, the user of this app is able to add styled point graphics to 
a map embedded in the #map DOM element, and clear these points from the map by 
clicking the #clear element.

ArcGIS Javascript API version: 3.9
Author: Darin Joseph Acosta
Date: June 2014
*/

var map;

//Require all necessary Dojo and ESRI modules in an array using the "require()" function.

require(["esri/map",
        "esri/toolbars/draw",
        "esri/geometry/Point",
        "esri/graphic",
        "esri/Color",
        "esri/symbols/SimpleMarkerSymbol",
        "dojo/dom",
        "dojo/on",
        "dojo/domReady!"], 

  /*
  The second argument of the "require()" function is an anonymous callback function.
  The arguments within this function are hooks which allow the application to access
  the code contained in the modules. The hooks should be listed in the same order that 
  the modules are required. These hooks can be given any name, though ESRI provides
  naming conventions in their documentation. 

  Note: the "dojo/domReady!" module does not need to be passed into the callback function.
  */

  function(Map, 
           Draw,
           Point,
           Graphic,
           Color,
           SimpleMarkerSymbol,
           dom,
           on) {

  /*
  Now it's time to initialize a new map. The first argument in the constructor contains 
  the id of the element within the DOM that the map will inhabit (#map). The second argument
  is a JSON containing applicable map characteristics. 

  To emphasize: the Map object is being pulled from the "esri/map" module.
  In order to instantiate the object, its class must be passed as an argument 
  in the callback function.
  */

  map = new Map("map", {
    basemap: "topo",
    center: [-106.61, 35.1107], // longitude, latitude
    zoom: 11
  });

  /*
  The following code illustrates a few simple functions that the application
  can use through the required modules. Notice that instantiated objects share 
  the same names as the arguments in the anonymous callback function that are 
  associated with the modules.
  */

  map.on("load", function(){
    CreateToolbar(map);
  });

  /*Draw is an object passed through the "esri/toolbars/draw" module to the anonymous
  callback function.*/
  function CreateToolbar(map) {
    var toolbar = new Draw(map);
    toolbar.activate(Draw.POINT, {  
      showTooltips: false 
    });
    toolbar.on("draw-end", AddToMap);
  }

  on(dom.byId("clear"), "click", function(evnt){
    map.graphics.clear();; });
    
  /*SimpleMarkerSymbol belongs to the "esri/symbols/SimpleMarkerSymbol" module*/
  function AddToMap(event) {
    var symbol = new SimpleMarkerSymbol();
    symbol.setSize(60);
    symbol.setColor(new Color([255,0,0,.25]));
    var graphic = new Graphic(event.geometry, symbol);
    map.graphics.add(graphic);
  }
});
