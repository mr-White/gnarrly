Zones = new Mongo.Collection("zones");

Zones.allow({
  insert: function (userId, zone) {
    return userId && zone.owner === userId;
  },
  update: function (userId, zone, fields, modifier) {
    if (userId !== zone.owner)
      return false;

    return true;
  },
  remove: function (userId, zone) {
    if (userId !== zone.owner)
      return false;

    return true;
  }
});

// Meteor.methods({
  // invite: function (zoneId, userId) {
  //   check(zoneId, String);
  //   check(userId, String);
  //   var zone = Parties.findOne(zoneId);
  //   if (!zone)
  //     throw new Meteor.Error(404, "No such zone");
  //   if (zone.owner !== this.userId)
  //     throw new Meteor.Error(404, "No such zone");
  //   if (zone.public)
  //     throw new Meteor.Error(400,
  //       "That zone is public. No need to invite people.");

  //   if (userId !== zone.owner && ! _.contains(zone.invited, userId)) {
  //     Parties.update(zoneId, { $addToSet: { invited: userId } });

  //     var from = contactEmail(Meteor.users.findOne(this.userId));
  //     var to = contactEmail(Meteor.users.findOne(userId));

  //     if (Meteor.isServer && to) {
  //       // This code only runs on the server. If you didn't want clients
  //       // to be able to see it, you could move it to a separate file.
  //       Email.send({
  //         from: "noreply@socially.com",
  //         to: to,
  //         replyTo: from || undefined,
  //         subject: "Zone: " + zone.name,
  //         text:
  //         "Hey, I just invited you to '" + zone.name + "' on Socially." +
  //         "\n\nCome check it out: " + Meteor.absoluteUrl() + "\n"
  //       });
  //     }
  //   }
  // },
  // rsvp: function (zoneId, rsvp) {
  //   check(zoneId, String);
  //   check(rsvp, String);
  //   if (! this.userId)
  //     throw new Meteor.Error(403, "You must be logged in to RSVP");
  //   if (! _.contains(['yes', 'no', 'maybe'], rsvp))
  //     throw new Meteor.Error(400, "Invalid RSVP");
  //   var zone = Parties.findOne(zoneId);
  //   if (! zone)
  //     throw new Meteor.Error(404, "No such zone");
  //   if (! zone.public && zone.owner !== this.userId &&
  //     !_.contains(zone.invited, this.userId))
  //   // private, but let's not tell this to the user
  //     throw new Meteor.Error(403, "No such zone");

  //   var rsvpIndex = _.indexOf(_.pluck(zone.rsvps, 'user'), this.userId);
  //   if (rsvpIndex !== -1) {
  //     // update existing rsvp entry

  //     if (Meteor.isServer) {
  //       // update the appropriate rsvp entry with $
  //       Parties.update(
  //         {_id: zoneId, "rsvps.user": this.userId},
  //         {$set: {"rsvps.$.rsvp": rsvp}});
  //     } else {
  //       // minimongo doesn't yet support $ in modifier. as a temporary
  //       // workaround, make a modifier that uses an index. this is
  //       // safe on the client since there's only one thread.
  //       var modifier = {$set: {}};
  //       modifier.$set["rsvps." + rsvpIndex + ".rsvp"] = rsvp;
  //       Parties.update(zoneId, modifier);
  //     }

  //     // Possible improvement: send email to the other people that are
  //     // coming to the zone.
  //   } else {
  //     // add new rsvp entry
  //     Parties.update(zoneId,
  //       {$push: {rsvps: {user: this.userId, rsvp: rsvp}}});
  //   }
  // }
// });

// var contactEmail = function (user) {
//   if (user.emails && user.emails.length)
//     return user.emails[0].address;
//   if (user.services && user.services.facebook && user.services.facebook.email)
//     return user.services.facebook.email;
//   return null;
// };
