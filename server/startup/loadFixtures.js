// Parties
Meteor.startup(function () {
  if (Parties.find().count() === 0) {
    var parties = [
      {'name': 'Dubstep-Free Zone',
        'description': 'Fast just got faster with Nexus S.'},
      {'name': 'All dubstep all the time',
        'description': 'Get it on!'},
      {'name': 'Savage lounging',
        'description': 'Leisure suit required. And only fiercest manners.'}
    ];
    for (var i = 0; i < parties.length; i++)
      Parties.insert({name: parties[i].name, description: parties[i].description});
  }
});

// Zones
Meteor.startup(function() {
  if (Zones.find().count() === 0) {
    var zones = [
      {
        'name': 'Edge at Allen',
        'location': {
          "latitude" : 33.107180341660346,
          "longitude" : -96.66756391525269
        }
      },
      {
        'name': 'Lively Skatepark',
        'location': {
          "latitude" : 32.823205829253524,
          "longitude" : -96.95271492004395
        }
      }
    ];
    for (var i = 0; i < zones.length; i++) {
      Zones.insert({name: zones[i].name, location: zones[i].location});
    }
  }
});