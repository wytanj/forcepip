Trades = new Mongo.Collection('Trades');

Meteor.methods({
  tradeInsert: function(tradeAttributes) {
    check(this.userId, String);
    check(commentAttributes, {
      postId: String,
      body: String
    });

    var user = Meteor.user();
    var trade = Trades.findOne(tradeAttributes.tradeId);  
    }
});
