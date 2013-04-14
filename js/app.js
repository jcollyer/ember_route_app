(function() {

// Handlebars helper to generate lorem ipsum text
Ember.Handlebars.registerHelper('lorem', function(options) {
  var opts = {ptags:true}
  if(options.hash.type) {
    opts.type = options.hash.type;
  }
  if(options.hash.amount) {
    opts.amount = options.hash.amount;
  }
  return new Handlebars.SafeString($('<div></div>').lorem(opts).html());
});

// A helper function to define routes for better code reuse
function sectionRoute(name) {
  return Ember.Route.extend({
    route: name,
    connectOutlets: function(router, context) {
      var SectionView = Ember.View.extend({
        templateName: 'section' + name
      });
      router.get('sectionsController').connectOutlet({viewClass: SectionView});
    }
  });
}

function communityRoute(name) {
  return Ember.Route.extend({
    route: name,
    connectOutlets: function(router, context) {
      var CommunityView = Ember.View.extend({
        templateName: 'community' + name
      });
      router.get('communityController').connectOutlet({viewClass: CommunityView});
    }
  });
}

// A helper function to define a property used to render the navigation. Returns
// true if a state with the specified name is somewhere along the current route.
function stateFlag(name) {
  return Ember.computed(function() {
    var state = App.router.currentState;
    while(state) {
      if(state.name === name) return true;
      state = state.get('parentState');
    }
    return false;
  }).property('App.router.currentState');
}

// Create the application
window.App = Ember.Application.create({

  // Define the main application controller. This is automatically picked up by
  // the application and initialized.
  ApplicationController: Ember.Controller.extend({
    isHome: stateFlag('home'),
    isSections: stateFlag('sections'),
    isCommunity: stateFlag('community'),
    isItems: stateFlag('items'),
    isProgram: stateFlag('programs'),
    isProgram: stateFlag('about'),
    isProgram: stateFlag('news'),
    isProgram: stateFlag('donate'),
    isProgram: stateFlag('store'),
    isContact: stateFlag('contact')
  }),
  ApplicationView: Ember.View.extend({
    templateName: 'application'
  }),

  HomeController: Ember.Controller.extend(),
  HomeView: Ember.View.extend({
    templateName: 'home'
  }),

  SectionsController: Ember.Controller.extend({
    isSectionA: stateFlag('sectionA'),
    isSectionB: stateFlag('sectionB'),
    isSectionC: stateFlag('sectionC'),
    isSectionD: stateFlag('sectionD')
  }),

  CommunityController: Ember.Controller.extend({
    isSectionA: stateFlag('sectionA'),
    isSectionB: stateFlag('sectionB'),
    isSectionC: stateFlag('sectionC'),
    isSectionD: stateFlag('sectionD'),
    isSectionD: stateFlag('sectionE'),
    isSectionD: stateFlag('sectionF'),
    isSectionD: stateFlag('sectionG')
  }),

  SectionsView: Ember.View.extend({
    templateName: 'sections'
  }),

  CommunityView: Ember.View.extend({
    templateName: 'community'
  }),

  ItemsView: Ember.View.extend({
    templateName: 'items'
  }),

  ItemController: Ember.ObjectController.extend(),
  ItemView: Ember.View.extend({
    templateName: 'item'
  }),

  ContactController: Ember.Controller.extend(),
  ContactView: Ember.View.extend({
    templateName: 'contact'
  }),

  AboutController: Ember.Controller.extend(),
  AboutView: Ember.View.extend({
    templateName: 'about'
  }),

  NewsController: Ember.Controller.extend(),
  NewsView: Ember.View.extend({
    templateName: 'news'
  }),

  DonateController: Ember.Controller.extend(),
  DonateView: Ember.View.extend({
    templateName: 'donate'
  }),

  StoreController: Ember.Controller.extend(),
  StoreView: Ember.View.extend({
    templateName: 'store'
  }),

  ProgramsController: Ember.Controller.extend(),
  ProgramsView: Ember.View.extend({
    templateName: 'programs'
  }),


  Router: Ember.Router.extend({
    root: Ember.Route.extend({
      doHome: function(router, event) {
        router.transitionTo('home');
      },
      doSections: function(router, event) {
        router.transitionTo('sections.index');
      },
      doCommunity: function(router, event) {
        router.transitionTo('community.index');
      },
      doItems: function(router, event) {
        router.transitionTo('items.index');
      },
      doPrograms: function(router, event) {
        router.transitionTo('programs');
      },
      doContact: function(router, event) {
        router.transitionTo('contact');
      },
      doAbout: function(router, event) {
        router.transitionTo('about');
      },
      doNews: function(router, event) {
        router.transitionTo('news');
      },
      doDonate: function(router, event) {
        router.transitionTo('donate');
      },
      doStore: function(router, event) {
        router.transitionTo('store');
      },
      home: Ember.Route.extend({
        route: '/',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('home');
        }
      }),
      programs: Ember.Route.extend({
        route: '/programs',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('programs');
        }
      }),
      about: Ember.Route.extend({
        route: '/about',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('about');
        }
      }),
      news: Ember.Route.extend({
        route: '/news',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('news');
        }
      }),
      donate: Ember.Route.extend({
        route: '/donate',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('donate');
        }
      }),
      store: Ember.Route.extend({
        route: '/store',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('store');
        }
      }),
      contact: Ember.Route.extend({
        route: '/contact',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('contact');
        }
      }),
      sections: Ember.Route.extend({
        route: '/sections',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('sections');
        },
        index: Ember.Route.extend({
          route: '/'
        }),
        doSectionA: function(router, event) { router.transitionTo('sections.sectionA'); },
        sectionA: sectionRoute('A'),
        doSectionB: function(router, event) { router.transitionTo('sections.sectionB'); },
        sectionB: sectionRoute('B'),
        doSectionC: function(router, event) { router.transitionTo('sections.sectionC'); },
        sectionC: sectionRoute('C'),
        doSectionD: function(router, event) { router.transitionTo('sections.sectionD'); },
        sectionD: sectionRoute('D')
      }),
      community: Ember.Route.extend({
        route: '/community',
        connectOutlets: function(router, event) {
          router.get('applicationController').connectOutlet('community');
        },
        index: Ember.Route.extend({
          route: '/'
        }),
        doCommunityA: function(router, event) { router.transitionTo('community.communityA'); },
        communityA: communityRoute('A'),
        doCommunityB: function(router, event) { router.transitionTo('community.communityB'); },
        communityB: communityRoute('B'),
        doCommunityC: function(router, event) { router.transitionTo('community.communityC'); },
        communityC: communityRoute('C'),
        doCommunityD: function(router, event) { router.transitionTo('community.communityD'); },
        communityD: communityRoute('D'),
        doCommunityE: function(router, event) { router.transitionTo('community.communityE'); },
        communityE: communityRoute('E'),
        doCommunityF: function(router, event) { router.transitionTo('community.communityF'); },
        communityF: communityRoute('F'),
        doCommunityG: function(router, event) { router.transitionTo('community.communityG'); },
        communityG: communityRoute('G')
      }),
      items: Ember.Route.extend({
        route: '/items',
        index: Ember.Route.extend({
          route: '/',
          connectOutlets: function(router, context) {
            router.get('applicationController').connectOutlet('items');
          }
        }),
        item: Ember.Route.extend({
          route: '/:item_id',
          connectOutlets: function(router, context) {
            var item = router.getPath('itemsController.content').objectAt(context.item_id);
            router.get('itemController').set('content', item);
            router.get('applicationController').connectOutlet('item');
          }
        }),
        doItem: function(router, event) {
          router.transitionTo('item', {item_id: event.context.id});
        }
      })
    })
  })

});

$(function() {
App.initialize();
});


if (document.location.hostname == "localhost") {
 // console.log('y');
  document.write('<script src="http://' + (location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1"></' + 'script>')
}


})();