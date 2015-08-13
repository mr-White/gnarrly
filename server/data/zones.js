// Meteor.publish("zones", function (options, searchString) {
//   if (searchString == null)
//     searchString = '';

//   Counts.publish(this, 'numberOfParties', Zones.find({
//     'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
//     $or:[
//       {$and:[
//         {"public": true},
//         {"public": {$exists: true}}
//       ]},
//       {$and:[
//         {owner: this.userId},
//         {owner: {$exists: true}}
//       ]},
//       {$and:[
//         {invited: this.userId},
//         {invited: {$exists: true}}
//       ]}
//     ]}), { noReady: true });
//   return Zones.find({
//     'name' : { '$regex' : '.*' + searchString || '' + '.*', '$options' : 'i' },
//     $or:[
//       {$and:[
//         {"public": true},
//         {"public": {$exists: true}}
//       ]},
//       {$and:[
//         {owner: this.userId},
//         {owner: {$exists: true}}
//       ]},
//       {$and:[
//         {invited: this.userId},
//         {invited: {$exists: true}}
//       ]}
//     ]} ,options);
// });
Meteor.publish('zones',function(){
  return Zones.find({});
})