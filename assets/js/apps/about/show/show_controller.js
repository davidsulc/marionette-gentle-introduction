ContactManager.module("AboutApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showAbout: function(){
      var view = new Show.Message();
      ContactManager.mainRegion.show(view);
    }
  };
});
