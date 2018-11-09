import React, { Component } from "react";

import PianoKey from "./components/Key";
import FlatKey from "./components/FlatKey";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      note: null,
      song: {},
      isPlaying: false,
      isRecording: false,
      time: 0
    };
    this.currentRecording = {};
    this.timer = null;
    this._startRecord = this._startRecord.bind(this);
    this._stopRecord = this._stopRecord.bind(this);
    this._playNote = this._playNote.bind(this);
  }

  componentDidMount() {
    console.log("Thank you for your interest in my code!");
  }
  render() {
    //
    const keys = ["C", "D", "E", "F", "G", "A", "B"];
    const flats = ["Cb","Db", "Eb", "Fb", "Gb", "Ab", "Bb"];

    const pianoKeys = keys.map(el => {
      return (
        <PianoKey key={el} note={el} octave="4" playNote={this._playNote} />
      );
    });

    const flatKeys = flats.map(el => {
      return (
        <FlatKey key={el} note={el} octave="4" playNote={this._playNote} />
      );
    });

    return (
      <div className="App">
        <button className="testbtn" onClick={() => this._startRecord()}>
          Start Rec
        </button>
        <button className="testbtn" onClick={() => this._stopRecord()}>
          Stop Rec
        </button>
        <br />
        Timer:{this.state.time}
        <br />
        isRecording:{this.state.isRecording.toString()}
        <h3>Piano</h3>
        <h3>Your Song</h3>
        {this.state.song.toString()}
        <div id="piano">
          <div className="octave">
            {pianoKeys}
            <div className="flats">{flatKeys}</div>
          </div>
          Here is the piano!
        </div>
      </div>
    );
  }

  // SandBox Functions

  //  IN USE Functions
  _startRecord() {
    this.setState({ time: 0, isRecording: true });
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
      song: this.currentRecording
    });
  }
  _playNote(note) {
    console.log(note);
    if (this.state.isRecording) this.currentRecording[this.state.time] = note;
  }
}

export default App;
