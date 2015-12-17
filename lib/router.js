Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound'
});

Router.route('/', {
  name: 'home',
  template: 'mainApp'});

  Router.route('/create',{
    name: 'adminCreateTrade',
    template: 'adminCreateTrade'
  });
