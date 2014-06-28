ContactManager.module("ContactsApp.List", function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var fetchingContacts = ContactManager.request("contact:entities");

      $.when(fetchingContacts).done(function(contacts){
        var contactsListView = new List.Contacts({
          collection: contacts
        });

        contactsListView.on("childview:contact:show", function(childView, model){
          ContactManager.trigger("contact:show", model.get("id"));
        });

        contactsListView.on("childview:contact:delete", function(childView, model){
          model.destroy();
        });

        ContactManager.regions.main.show(contactsListView);
      });
    }
  }
});
