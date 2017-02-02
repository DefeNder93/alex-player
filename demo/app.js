angular.module('demoApp', ['alexPlayer'])
    .controller('MainController', function($scope, $http){
        $scope.getVideosInfo = function() {
            return $http.get('json/videos.json');
        };
        $scope.videoInfoPromise = $scope.getVideosInfo().then(function(r){
            return r.data;
        });
    });