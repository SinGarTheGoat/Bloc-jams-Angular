//angular.module('blocJams', []);angular.module('blocJams', []);
 //angular.module('blocJams', ['ui.router']);
 (function() {
     function config($stateProvider, $locationProvider) {
        $locationProvider
            .html5Mode({
                enabled: true,
                requireBase: false
         });
         
         $stateProvider
         .state('landing', {
             controller: 'LandingCtrl as landing',
             url: '/',
             templateUrl: '/templates/landing.html'
           })
         .state('album', {
             controller: 'AlbumCtrl as album'
             url: '/album',
             templateUrl: '/templates/album.html'
         })
         .state('collection', {
             url: '/collection',
             controller: 'CollectionCtrl as collection',
             templateUrl: '/templates/collection.html'
         });
    
     }
 
 angular.module('blocJams', ['ui.router']);
     angular
         .module('blocJams', ['ui.router'])
         .config(config);
 })();