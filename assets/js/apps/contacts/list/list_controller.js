ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request("contact:entities");

      $.when(fetchingContacts).done(function(contacts){
        var contactsListView = new List.Contacts({
          collection: contacts
        });

        contactsListView.on("itemview:contact:show", function(childView, model){
          ContactManager.trigger("contact:show", model.get('id'));
        });

        contactsListView.on("itemview:contact:edit", function(childView, model){
          var view = new ContactManager.ContactsApp.Edit.Contact({
            model: model,
            asModal: true
          });

          view.on("form:submit", function(data){
            if(model.save(data)){
              childView.render();
              ContactManager.dialogRegion.close();
              childView.flash("success");
            }
            else{
              view.triggerMethod("form:data:invalid", model.validationError);
            }
          });

          ContactManager.dialogRegion.show(view);
        });

        contactsListView.on("itemview:contact:delete", function(childView, model){
          model.destroy();
        });

        ContactManager.mainRegion.show(contactsListView);
      });
    }
  }
});