ContactManager.module("HeaderApp", function(Header, ContactManager, Backbone, Marionette, $, _){
  var API = {
    listHeader: function(){
      Header.List.Controller.listHeader();
    }
  };

  ContactManager.commands.setHandler("set:active:header", function(name){
    ContactManager.HeaderApp.List.Controller.setActiveHeader(name);
  });

  Header.on("start", function(){
    API.listHeader();
  });
});
