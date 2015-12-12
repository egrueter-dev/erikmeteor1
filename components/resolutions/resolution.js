Resolutions = new Mongo.Collection('resolutions');

//Client code associated with resolutions

if (Meteor.isClient) {
  Meteor.subscribe('resolutions')

  Template.resolution.events({
    'click .toggle-checked': function() {
      Meteor.call('updateResolution', this._id, !this.checked);
    },
    'click .delete': function() {
      Meteor.call('deleteResolution', this._id);
    },
    'click .toggle-private': function() {
      Meteor.call('setPrivate', this._id, !this.private);
    }
  });
}

// Server code associated with resolutions
if (Meteor.isServer) {
  Meteor.publish('resolutions', function() {
    return Resolutions.find({
      $or: [
        { private: {$ne: true} },
        { owner: this.userId }
      ]
    });
  });
}


/// All methods associated with resolutions
Meteor.methods({
  addResolution: function(title) {
    Resolutions.insert({
      title: title,
      createdAt: new Date(),
      owner: Meteor.userId()
    });
  },
  deleteResolution: function(id) {
    Resolutions.remove(id);
  },
  updateResolution: function(id, checked_state) {
    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Resolutions.update(this._id, {$set: {checked: checked_state}});
  },
  setPrivate: function(id, private) {
    var res = Resolutions.findOne(id);
    if(res.owner !== Meteor.userId()) {
      throw new Meteor.Error('not-authorized')
    }
    Resolutions.update(id, {$set: {private: private}});
  }
});


