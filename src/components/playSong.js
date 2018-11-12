/* This controls playSong audio of a song object.

Playsong takes two arrays, notes and timestamps 
notes: selects the audio file to play
times: sets a Timeout for timing accuracy.

*/

const playSong = (notes, times) => {

  // Recursion controls for progressing through the arrays 
  let lastPlayedTime = 0;
  let nextNotePos = 0;
  
  // Loop through timestamps and set a delay for playing notes.
  times.forEach(function(time) {
    setTimeout(function() {
      lastPlayedTime = time;
      console.log(notes[nextNotePos]);
      let audio = new Audio(
        `./grand-piano-mp3-sounds/${notes[nextNotePos]}.mp3`
      );
      audio.currentTime = 0;
      audio.play();
      nextNotePos++;
    }, time * 1000 - lastPlayedTime);
  });
};

module.exports = playSong;
