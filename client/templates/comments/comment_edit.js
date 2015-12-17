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
  'submit form': function(e) {
    e.preventDefault();

    var currentCommentId = this._id;
    var $body = $(e.target).find('[name=body]');

    var commentProperties = {
      body: $body.val(),
      commentId: template.data._id
    };

    var errors = validatecomment(commentProperties);
    if (!commentProperties.body)
      return Session.set('commentEditErrors', errors);

    Comments.update(currentCommentId, {$set: commentProperties}, function(error) {
      if (error) {
        // display the error to the user
        throwError(error.reason);
      } else {
        Router.go('CommentPage', {_id: currentCommentId});
      }
    });
  },

  'click .delete': function(e) {
    e.preventDefault();

    if (confirm("Delete this Comment?")) {
      var currentCommentId = this._id;
      Comments.remove(currentCommentId);
      Router.go('home');
    }
  }
});
