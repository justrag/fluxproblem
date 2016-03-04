Posts = new Mongo.Collection("posts");


if (Meteor.isClient) {
	State.modify('chosenPost', (state = false) => {
		let postNumber = State.get('postNumber');
		let p = Posts.findOne({
			number: postNumber
		});
		console.debug("Should change the chosenPost state to: %o", p);
		return p;
	});

	State.modify('postNumber', (state = false) => {
		switch (Action.type()) {
			case 'POST1':
				return 1;
			case 'POST2':
				return 2;
			case 'POST3':
				return 3;
			default:
				return state;
		};
	});
}


if (Meteor.isServer) {
	Meteor.startup(function() {
		if (Posts.find().count() == 0) {
			Posts.insert({
				number: 1,
				title: "First Post"
			});
			Posts.insert({
				number: 2,
				title: "Second Post"
			});
		}
	});
};