Template.adminCreateTrade.onCreated(function ()
{
  Session.set('adminCreateTradeErrors', {})
})

Template.adminCreateTrade.helpers({
  errorMessage: function (field) {
    return Session.get('adminCreateTradeErrors')[field]
  }
})

Template.adminCreateTrade.events({
  'submit form': function (e) {
    e.preventDefault();

    const currentUserId = Meteor.userId();
    console.log(currentUserId);

    var tradeProperties = {
      triggerPrice: $(e.target).find('[name=triggerPrice]').val(),
      buysell: $(e.target).find('[name=buysell]').val(),
      stopLoss: $(e.target).find('[name=stopLoss]').val(),
      takeProfit: $(e.target).find('[name=takeProfit]').val(),
      instrument: $(e.target).find('[name=instrument]').val()
    }

    Meteor.call('tradeInsert', tradeProperties, function (error, result) {
      if(error)
        return throwError(error.reason)
      window.alert('trade created');
      Router.go('home')
    })
  }
})
