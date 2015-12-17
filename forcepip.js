if (Meteor.isClient) {
  console.log("is client");
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    console.log("is server");
  });
}
