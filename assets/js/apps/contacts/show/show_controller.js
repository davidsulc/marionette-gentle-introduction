ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showContact: function(id){
      var contacts = ContactManager.request("contact:entities");
      var model = contacts.get(id);
      var contactView = new Show.Contact({
        model: model
      });

      ContactManager.mainRegion.show(contactView);
    }
  }
});
