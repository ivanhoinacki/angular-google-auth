(function() {
    'use strict';

    angular
    .module('app.partials.authentication')
    .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($stateProvider, $urlRouterProvider) {

        $stateProvider
        .state('login', {
            url: '',
            templateUrl : 'app/partials/authentication/login/login.tmpl.html',
            controller  : 'LoginController',
            controllerAs: 'vm'
        })
        .state('profile', {
            url: '/profile',
            templateUrl : 'app/partials/authentication/profile/profile.tmpl.html',
            controller  : 'ProfileController',
            controllerAs: 'vm'
        });
    }
})();
