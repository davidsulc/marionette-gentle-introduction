var ContactManager = new Marionette.Application();

ContactManager.addRegions({
  mainRegion: "#main-region"
});

ContactManager.on("initialize:after", function(){
  ContactManager.ContactsApp.List.Controller.listContacts();
});