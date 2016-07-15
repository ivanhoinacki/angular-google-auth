(function() {
    'use strict';

    angular
    .module('app.partials.authentication')
    .controller('LoginController', LoginController);

    /* @ngInject */
    function LoginController(SESSION, $scope, $state, $location, GPlusAuthService, GPSession, toastr, $timeout) {

        var vm = this;
        (function init(){
            resetCredentiais();
            addEvents();
        })();

        function addEvents(){
            vm.loginClick = loginClick;
            vm.sucess     = sucess;
        }

        vm.counter = 0;
        $scope.onTimeout = function(){
            SESSION.timer = vm.counter++;
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        var mytimeout = $timeout($scope.onTimeout,1000);

        function resetCredentiais(){
            GPSession.ClearCredentials();
        }

        function loginClick(provider) {
            vm.dataLoading = true;
            GPlusAuthService.signIn(vm.sucess);
        }

        function sucess(data){
            if(!angular.equals(data.status.google_logged_in, false)){
              console.log(data);
                GPSession.SetCredentials(data);
                $state.go('profile');
            }
        }
    }
})();
