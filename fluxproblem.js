Posts = new Mongo.Collection("posts");


if (Meteor.isClient) {
State.modify('chosenPost', (state = false) => {
let postNumber=State.get('postNumber');
  return Posts.findOne({number: postNumber});
});

State.modify('postNumber', (state = false) => {
switch(Action.type()) {
    case 'POST1':
      return 1;
    case 'POST2':
      return 2;
    default:
      return 1;
};
});
}


if (Meteor.isServer) {
  Meteor.startup(function () {
if (Posts.find().count()==0) {
Posts.insert({number: 1, title: "First Post"});
Posts.insert({number: 2, title: "Second Post"});
}
  });
};
