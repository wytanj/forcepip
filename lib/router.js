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

Router.route('/rates',{
    name: 'rates',
    template: 'rates'
  });

  Router.route('/about',{
      name: 'about',
      template: 'about'
    });
