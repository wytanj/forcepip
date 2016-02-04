Trades = new Mongo.Collection('trades');

var tradeCounter = Trades.find().count();


Trades.allow({
  update: function(userId, trade) { return hasPermission(userId, post); },
  remove: function(userId, trade) { return hasPermission(userId, post); },
});

Trades.deny({
  update: function(userId, trade, tradeAttributes) {
    // may only edit the following two fields:
    return (_.without(tradeAttributes, 'instrument', 'trigger').length > 0);
  }
});

validateTrade = function (tradeAttributes) {
  var errors = {};

  if (!tradeAttributes.instrument)
    errors.body = "Please fill in an instrument";

  return errors;
};

Meteor.methods({
  tradeInsert: function(tradeProperties) {
    // check(this.userId, String);
    // check(tradeAttributes, {
    //   tradeId: String,
    //   body: String
    // });

    // var tradeId = this._id;
    // var trade = Trades.findOne(tradeAttributes.tradeId);

    var trade = _.extend(tradeProperties, {
      // tradeId: tradeId,
      author: Meteor.user().username,
      submitted: new Date(),
      commentsCount: 0,
      upvoters: [],
      votes: 0,
      tradeCounter: tradeCounter + 1,
    });

    var tradeID = Trades.insert(trade)
    console.log('This is the tradeID' + tradeID)
    return {
      _id: tradeID
    }
    }
});

// var otherAttributes = {
//   instrument: 'EUR_USD',
//   state: 1, // 1= upcoming, 2 = live, 3 = past
//   buy: true,
//   stopLoss: 1.1140,
//   takeProfit: 1.4444,
//   tradeCount: tradeCounter + 1,
//   triggerPrice: 0,
//   triggered: false
// };

// Sample Trade(live):  EDIT OLD Trade, EUR/USD, Buy @ 1.0648, SL @ 1.0920, TP @ 1.1148, Trade 192/2015.
// Sample Trade(upcoming): New Trade, Oil, Buy Stop @ 36.90. TP @ 49.90. Sell Stop (act as SL) @ 32.40, Small Lot.. Trade 194/2015
