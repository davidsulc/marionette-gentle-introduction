ContactManager.module('ContactsApp.List', function(List, ContactManager, Backbone, Marionette, $, _){
  List.Controller = {
    listContacts: function(){
      var loadingView = new ContactManager.Common.Views.Loading();
      ContactManager.mainRegion.show(loadingView);

      var fetchingContacts = ContactManager.request("contact:entities");

      var contactsListLayout = new List.Layout();
      var contactsListPanel = new List.Panel();

      $.when(fetchingContacts).done(function(contacts){
        var filteredContacts = ContactManager.Entities.FilteredCollection({
          collection: contacts,
          filterFunction: function(filterCriterion){
            var criterion = filterCriterion.toLowerCase();
            return function(contact){
              if(contact.get('firstName').toLowerCase().indexOf(criterion) !== -1
                || contact.get('lastName').toLowerCase().indexOf(criterion) !== -1
                || contact.get('phoneNumber').toLowerCase().indexOf(criterion) !== -1){
                  return contact;
              }
            };
          }
        });

        var contactsListView = new List.Contacts({
          collection: filteredContacts
        });

        contactsListPanel.on("contacts:filter", function(filterCriterion){
          filteredContacts.filter(filterCriterion);
        });

        contactsListLayout.on("show", function(){
          contactsListLayout.panelRegion.show(contactsListPanel);
          contactsListLayout.contactsRegion.show(contactsListView);
        });

        contactsListPanel.on("contact:new", function(){
          var newContact = new ContactManager.Entities.Contact();

          var view = new ContactManager.ContactsApp.New.Contact({
            model: newContact
          });

          view.on("form:submit", function(data){
            var highestId = contacts.max(function(c){ return c.id; }).get('id');
            data.id = highestId + 1;
            if(newContact.save(data)){
              contacts.add(newContact);
              view.trigger("dialog:close");
              var newContactView = contactsListView.children.findByModel(newContact);
              // check whether the new contact view is displayed (it could be
              // invisible due to the current filter criterion)
              if(newContactView){
                newContactView.flash("success");
              }
            }
            else{
              view.triggerMethod("form:data:invalid", newContact.validationError);
            }
          });

          ContactManager.dialogRegion.show(view);
        });

        contactsListView.on("itemview:contact:show", function(childView, model){
          ContactManager.trigger("contact:show", model.get('id'));
        });

        contactsListView.on("itemview:contact:edit", function(childView, model){
          var view = new ContactManager.ContactsApp.Edit.Contact({
            model: model
          });

          view.on("form:submit", function(data){
            if(model.save(data)){
              childView.render();
              view.trigger("dialog:close");
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

        ContactManager.mainRegion.show(contactsListLayout);
      });
    }
  }
});