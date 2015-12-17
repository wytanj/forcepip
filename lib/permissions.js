hasPermission = function(userId, obj) {
  return obj && obj.userId === userId;
};
