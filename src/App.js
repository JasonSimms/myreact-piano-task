import React, { Component } from "react";

import PianoKey from "./components/Key";
import FlatKey from "./components/FlatKey";
import TitleDisplay from "./components/TitleDisplay";
import Player from "./components/Player";
import ApolloPlayer from "./components/ApolloNetworkPlayer"

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      note: null,
      song: [],
      displaySong: [],
      isRecording: false,
      time: 0,
      title: "NoTitle",
      library: []
    };
    this.currentRecording = {};
    this.timer = null;
    this._startRecord = this._startRecord.bind(this);
    this._stopRecord = this._stopRecord.bind(this);
    this._playNote = this._playNote.bind(this);
    this._drawAnOctave = this._drawAnOctave.bind(this);
    this._handleInputChange = this._handleInputChange.bind(this);
    this._getSongLength = this._getSongLength.bind(this);

  }

  componentDidMount() {
    console.log("Thank you for your interest in my code!");
    console.log("Heroku Deploy 0.1");

  }
  render() {
    return (
      <div className="App">
      {/* <ApolloPlayer/> */}
        <button className="testbtn" onClick={() => this._startRecord()}>
          Start Rec
        </button>
        <button className="testbtn" onClick={() => this._stopRecord()}>
          Stop Rec
        </button>
        <br />
        <br />
        <Player
          song={this.state.song}
          title={this.state.title}
          library={this.state.library}
        />
        <br />
        <TitleDisplay
          target={this.state.title}
          handleInputChange={this._handleInputChange}
        />
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
    if (!this.state.isRecording) {
      this.currentRecording = {};
      this.setState({ time: 0, isRecording: true, displaySong: [] });
      console.log(`Record Started`);
      const increment = 0.2;
      this.timer = setInterval(() => {
        this.setState(prevState => ({ time: prevState.time + increment }));
      }, increment * 1000);
    }
  }

  _stopRecord() {
    if (this.state.isRecording) {
      let thisSong = {title: this.state.title, keysPlayed: Object.values(this.currentRecording), keysTimeStamps: Object.keys(this.currentRecording), duration: this._getSongLength(this.currentRecording)};
      console.log(`Finished Song`, thisSong);
      clearInterval(this.timer);
      this.setState({
        timer: 0,
        isRecording: false,
        song: thisSong,
        displaySong: Object.values(this.currentRecording),
        library: [...this.state.library, thisSong]
      });
    }
  }

  _playNote(note) {
    // console.log(note);
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

  _getSongLength(song) {
    const times = Object.keys(song);
    const lastTime = times[times.length - 1];
    return Number(Math.ceil(lastTime));
  }

  // Delivers input field to state
  _handleInputChange(key, newValue) {
    this.setState({
      [key]: newValue
    });
  }
}

export default App;
