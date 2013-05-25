ContactManager.module("ContactsApp.Show", function(Show, ContactManager, Backbone, Marionette, $, _){
  Show.Controller = {
    showContact: function(id){
      var fetchingContact = ContactManager.request("contact:entity", id);
      $.when(fetchingContact).done(function(contact){
        var contactView;
        if(contact !== undefined){
          contactView = new Show.Contact({
            model: contact
          });
        }
        else{
          contactView = new Show.MissingContact();
        }

        ContactManager.mainRegion.show(contactView);
      });
    }
  }
});
