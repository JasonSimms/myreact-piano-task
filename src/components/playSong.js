// This controls playback audio of a song object.
// song = {1: "D3", 1.4: "F3", 1.9999999999999998: "A3"}

const playback = (song) => {
  
    
    // Create array of times and notes to loop through
    let times = Object.keys(song);
    let notes = Object.values(song);
    let lastPlayed = 0;

    // Loop through timestamps and set a delay for playing notes.
    times.forEach(function(time) {
      setTimeout(function() {
        lastPlayed = time;
        console.log(notes[0]);
        let audio = new Audio(`./grand-piano-mp3-sounds/${notes[0]}.mp3`);
        audio.currentTime = 0;
        audio.play();
        notes.shift();
      }, time * 1000 - lastPlayed);
    });
};

module.exports = playback;
