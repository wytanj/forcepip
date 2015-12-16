Template.commentEdit.onCreated(function() {
  Session.set('commentEditErrors', {});
});

Template.commentEdit.helpers({
  errorMessage: function(field) {
    return Session.get('commentEditErrors')[field];
  },
  errorClass: function (field) {
    return !!Session.get('commentEditErrors')[field] ? 'has-error' : '';
  }
});

Template.commentEdit.events({
  'submit form': function(e, template) {
    e.preventDefault();

    var $body = $(e.target).find('[name=body]');
    var comment = {
      body: $body.val()
    };

    var errors = {};
    if (! comment.body) {
      errors.body = "Please write some content";
      return Session.set('commentEditErrors', errors);
    }

    Meteor.call('commentEdit', comment, function(error, commentId) {
      if (error){
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
