(function() {
     function SongPlayer(Fixtures) {
        
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
         * @type {Object}
         */
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

            SongPlayer.currentSong = song;
        };
        
        
      //1st try
        
        var playSong = function(song){
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
            debugger
            if (SongPlayer.currentSong !== song) {
                setSong(song);

                playSong(song);
            }
        };

        
        SongPlayer.stopSong = function(){
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
            
        }
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
         
         SongPlayer.next = function(){
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
        .factory('SongPlayer', SongPlayer);
})();