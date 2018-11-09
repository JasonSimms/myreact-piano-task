import React, { Component } from "react";

import PianoKey from "./components/Key";
import FlatKey from "./components/FlatKey";
import playback from "./components/playBack";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      note: null,
      song: {},
      displaySong: [],
      isPlaying: false,
      isRecording: false,
      time: 0
    };
    this.currentRecording = {};
    this.timer = null;
    this._startRecord = this._startRecord.bind(this);
    this._stopRecord = this._stopRecord.bind(this);
    this._playNote = this._playNote.bind(this);
    this._drawAnOctave = this._drawAnOctave.bind(this);
  }

  componentDidMount() {
    console.log("Thank you for your interest in my code!");
  }
  render() {
    return (
      <div className="App">
        <button className="testbtn" onClick={() => this._startRecord()}>
          Start Rec
        </button>
        <button className="testbtn" onClick={() => this._stopRecord()}>
          Stop Rec
        </button>
        <br />
        <button
          className="testbtn"
          onClick={() => playback(this.currentRecording,"start")}
        >
          Start Playback
        </button>
        <button
          className="testbtn"
          onClick={() => playback(this.currentRecording,"stop")}
        >
          Stop Playback
        </button>
        <br />
        <br />
        Timer:{this.state.time}
        <br />
        isRecording:{this.state.isRecording.toString()}
        <h3>Piano</h3>
        <div id="piano">
          {/* Draw piano octaves programmatically */}
          {this._drawAnOctave(3)}
          {this._drawAnOctave(4)}
          {/* {this._drawAnOctave(5)} */}
        </div>
        <h3>Your Song</h3>
        {this.state.displaySong}
      </div>
    );
  }

  // SandBox Functions

  //  IN USE Functions
  _startRecord() {
    this.currentRecording = {};
    this.setState({ time: 0, isRecording: true, displaySong: [] });
    console.log(`Record Started`);
    const increment = 0.2;
    this.timer = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time + increment }));
    }, increment * 1000);
  }

  _stopRecord() {
    console.log(`Finished Song`, this.currentRecording);
    clearInterval(this.timer);
    this.setState({
      timer: 0,
      isRecording: false,
      song: this.currentRecording,
      displaySong: Object.values(this.currentRecording)
    });
  }
  _playNote(note) {
    console.log(note);
    if (this.state.isRecording) this.currentRecording[this.state.time] = note;
  }

  _drawAnOctave(octave) {
    const keys = ["C", "D", "E", "F", "G", "A", "B"];
    const flats = ["X", "Db", "Eb", "X2", "Gb", "Ab", "Bb"];

    const pianoKeys = keys.map(el => {
      return (
        <PianoKey
          key={el + octave}
          note={el + octave}
          playNote={this._playNote}
        />
      );
    });

    const flatKeys = flats.map(el => {
      return (
        <FlatKey
          key={el + octave}
          note={el + octave}
          playNote={this._playNote}
        />
      );
    });

    return (
      <div className="octave">
        <div className="whiteKeys">{pianoKeys}</div>
        <div className="flats">{flatKeys}</div>
      </div>
    );
  }
}

export default App;
