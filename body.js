if (Meteor.isClient) {
  //subscribe to a collection provided by the server
  // Helpers
  //
  Template.body.helpers({
    resolutions: function() {
      if(Session.get('hideFinished')) {
        return Resolutions.find({checked: {$ne: true}});
      } else {
        return Resolutions.find();
      }
    },
    hideFinished: function() {
      return Session.get('hideFinished');
    }
  });

  Template.resolution.helpers({
    isOwner: function() {
      return this.owner === Meteor.userId();
    }
  });

  ///body Events

  Template.body.events({
    'submit .new-resolution': function(event) {
      var title = event.target.title.value;
      Meteor.call('addResolution', title)
      event.target.title.value = '';
      return false
    },
    'change .hide-finished': function(event) {
      Session.set('hideFinished', event.target.checked);
    }
  });

  Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
  ///
}

/// Secure methods kind of like private methods?

Meteor.methods({
});
