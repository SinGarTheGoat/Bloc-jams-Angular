(function() {
    function SongPlayer($rootScope, Fixtures) {

        var SongPlayer = {};


        //Did I write this right?
        /**
         * @atribute currentAlbum
         * @desc assigns the result of the function Fixtures.getAlbum() the the varible currentAlbum
         */

        var currentAlbum = Fixtures.getAlbum();

        //        SongPlayer.currentSong = null; moved down not sure about the move or what why we changed it from  var SongPlayer.currentSong = null;
        /**
         * @desc Buzz object audio file
         * @type {number}
         */

        /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
        SongPlayer.currentTime = null;

        var currentBuzzObject = null;

        /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
            });


            SongPlayer.currentSong = song;
        };


        //1st try

        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }


        /**
         * @function getSongIndex
         * @desc converts the currently playoing song and returns a new object
         */

        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };

        //moved from above
        SongPlayer.currentSong = null;

        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);

                playSong(song);
            }
        };


        SongPlayer.stopSong = function() {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;

        }

        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            if (currentSongIndex >= currentAlbum.songs.length) {

                SongPlayer.stopSong();
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }

        }

        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        SongPlayer.formatTime = function(time){

            return time;

        }

        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                SongPlayer.stopSong();
                //SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        return SongPlayer;


    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
