ContactManager.module("AboutApp", function(AboutApp, ContactManager, Backbone, Marionette, $, _){
  AboutApp.Router = Marionette.AppRouter.extend({
    appRoutes: {
      "about" : "showAbout"
    }
  });

  var API = {
    showAbout: function(){
      AboutApp.Show.Controller.showAbout();
      ContactManager.execute("set:active:header", "about");
    }
  };

  ContactManager.on("about:show", function(){
    ContactManager.navigate("about");
    API.showAbout();
  });

  ContactManager.addInitializer(function(){
    new AboutApp.Router({
      controller: API
    });
  });
});
