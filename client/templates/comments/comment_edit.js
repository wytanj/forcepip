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

    var commentProperties = {
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val()
    }

    var errors = validatecomment(commentProperties);
    if (errors.title || errors.url)
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
