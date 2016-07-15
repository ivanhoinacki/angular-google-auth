(function() {
    'use strict';

    angular
    .module('app.partials.authentication')
    .controller('ProfileController', ProfileController);

    /* @ngInject */
    function ProfileController($rootScope, $timeout, $http, Utils, $scope, SESSION) {
        var vm = this;

        (function init(){
            addEvents();
            getProfile();
        })();

        function addEvents(){
            vm.form            = {};
            vm.listCombinacao  = [];
            vm.listInteger     = [];
            vm.listString      = [];
            vm.processaString  = processaString;
            vm.processaInteger = processaInteger;
            vm.execCombinacao  = execCombinacao;
            vm.counter         = SESSION.timer;
        }

        $scope.onTimeout = function(){
            SESSION.timer = vm.counter++;
            mytimeout = $timeout($scope.onTimeout,1000);
        }

        var mytimeout = $timeout($scope.onTimeout,1000);

        function getProfile(){
            var url = 'https://www.googleapis.com/plus/v1/people/me?access_token='+$rootScope.globals.currentUser.authdata;
            return $http.get(url).then(function(response) {
                vm.form = response.data
            },
            function(errorMessage){

            });
        }

        function processaString(string){
            if(!angular.equals(string, undefined)){
                var array = string.split(' ');
                vm.listString = Utils.processavalores(array);
            }
        }

        function processaInteger(int){
            if(!angular.equals(int, undefined)){
                var array = int.split(' ');
                vm.listInteger = Utils.processavalores(array);
            }
        }

        function execCombinacao(){
            if((angular.isArray(vm.listString))&&(angular.isArray(vm.listInteger))){
                vm.listCombinacao = [];
                for (var i = 0; i < vm.listInteger.length; i++) {
                    vm.listCombinacao.push(Utils.combinacao(vm.listString, vm.listInteger[i]));
                }
            }
        }
    }
})();
