angular.module('alexPlayer', [])
    .directive('alexPlayer', function() {
        return {
            restrict: 'A',
            scope: {
                alexPlayer: '='
            },
            controller: function(){
            },
            link: function(scope, elem, attrs) {
                var player = angular.element(elem[0].querySelector('.ap-video'))[0],
                    progressBar = angular.element(elem[0].querySelector('.ap-progress-bar'))[0],
                    currentIndex = 0,
                    config = {
                        REWIND_STEP: 5
                    };

                scope.videoInfo = [];
                scope.alexPlayer.then(function(info){
                    scope.videoInfo = info;
                    scope.load(scope.videoInfo[0]);
                });

                scope.load = function(video) {
                    player.currentTime = 0;
                    scope.activeVideo = video;
                    player.src = video.path;
                    player.load();
                };

                // controls
                scope.toggleMute = function(){
                    player.volume = player.volume === 1 ? 0 : 1;
                };

                scope.rewindBack = function(){
                    player.currentTime = player.currentTime > config.REWIND_STEP ? player.currentTime - config.REWIND_STEP : 0;
                };

                scope.togglePlay = function(){
                    player.paused ? player.play() : player.pause()
                };

                scope.chooseVideo = function(video) {
                    if (video !== scope.activeVideo) {
                        scope.load(video);
                        play();
                    }
                };

                function play() {
                    if (player.paused) {
                        player.play();
                    }
                }
                
                scope.rewindForward = function(){
                    player.currentTime = player.duration > player.currentTime + config.REWIND_STEP ? player.currentTime + config.REWIND_STEP : player.duration;
                };

                scope.next = function(){
                    player.currentTime = 0;
                    if (currentIndex < scope.videoInfo.length) {
                        currentIndex++;
                    }
                    scope.load(scope.videoInfo[currentIndex]);
                    play();
                };

                scope.previous = function(){
                    if (player.currentTime>2) {
                        player.currentTime = 0;
                        return;
                    }
                    player.currentTime = 0;
                    if (currentIndex > 0) {
                        currentIndex--;
                    }
                    scope.load(scope.videoInfo[currentIndex]);
                    play();
                };
                // /controls
                
                // states
                scope.isMuted = function() {
                    return player.volume === 0
                };

                scope.isPlaying = function() {
                    return !player.paused        
                };
                // /states
                
                function updateProgressBar(){
                    progressBar.value = Math.floor((100 / player.duration) * player.currentTime);
                }

                player.addEventListener('timeupdate', updateProgressBar, false);
            },
            templateUrl: 'src/player.html'
        };
    });

