import React, { Component } from "react";

import PianoKey from "./components/Key";
import FlatKey from "./components/FlatKey";
import TitleDisplay from "./components/TitleDisplay";
import Player from "./components/Player";

import {
  Button,
  ToggleButton,
  ToggleButtonGroup,
  ButtonToolbar
} from "react-bootstrap";

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
      title: "Hello_World!",
      library: [],
      showOctave0: false,
      showOctave1: false,
      showOctave2: false,
      showOctave3: true,
      showOctave4: true,
      showOctave5: false,
      showOctave6: false,
      showOctave7: false
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
  }
  render() {
    return (
      <div className="App">
        <TitleDisplay
          target={this.state.title}
          handleInputChange={this._handleInputChange}
        />
        <Player
          song={this.state.song}
          title={this.state.title}
          library={this.state.library}
        />
        <br />
        <div id="piano-controls">
          <ButtonToolbar>
            <ToggleButtonGroup type="checkbox" defaultValue={[3, 4]}>
              {!this.state.isRecording ? (
                <Button bsStyle="danger" onClick={() => this._startRecord()}>
                  Record
                </Button>
              ) : (
                <Button
                  bsStyle="info"
                  active
                  onClick={() => this._stopRecord()}
                >
                  Stop Recording
                </Button>
              )}
              <ToggleButton disabled>Select Desired Octaves:</ToggleButton>
              <ToggleButton
                value={1}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave1: !prevState.showOctave1
                  }))
                }
              >
                1
              </ToggleButton>
              <ToggleButton
                value={2}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave2: !prevState.showOctave2
                  }))
                }
              >
                2
              </ToggleButton>
              <ToggleButton
                value={3}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave3: !prevState.showOctave3
                  }))
                }
              >
                3
              </ToggleButton>
              <ToggleButton
                value={4}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave4: !prevState.showOctave4
                  }))
                }
              >
                4
              </ToggleButton>
              <ToggleButton
                value={5}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave5: !prevState.showOctave5
                  }))
                }
              >
                5
              </ToggleButton>
              <ToggleButton
                value={6}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave6: !prevState.showOctave6
                  }))
                }
              >
                6
              </ToggleButton>
              <ToggleButton
                value={7}
                onChange={() =>
                  this.setState(prevState => ({
                    showOctave7: !prevState.showOctave7
                  }))
                }
              >
                7
              </ToggleButton>
            </ToggleButtonGroup>
          </ButtonToolbar>
        </div>

        <div id="piano">
          {/* Draw piano octaves programmatically */}
          {this.state.showOctave0 ? this._drawAnOctave(0) : null}
          {this.state.showOctave1 ? this._drawAnOctave(1) : null}
          {this.state.showOctave2 ? this._drawAnOctave(2) : null}
          {this.state.showOctave3 ? this._drawAnOctave(3) : null}
          {this.state.showOctave4 ? this._drawAnOctave(4) : null}
          {this.state.showOctave5 ? this._drawAnOctave(5) : null}
          {this.state.showOctave6 ? this._drawAnOctave(6) : null}
          {this.state.showOctave7 ? this._drawAnOctave(7) : null}
        </div>
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
      let thisSong = {
        title: this.state.title,
        keysPlayed: Object.values(this.currentRecording),
        keysTimeStamps: Object.keys(this.currentRecording),
        duration: this._getSongLength(this.currentRecording)
      };
      console.log(`Finished Song`, thisSong);
      clearInterval(this.timer);
      this.setState({
        timer: 0,
        isRecording: false,
        song: thisSong,
        displaySong: Object.values(this.currentRecording),
        library: [...this.state.library, thisSong],
        title: "mySong"
      });
    }
  }

  _playNote(note) {
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
        <div className="white-keys">{pianoKeys}</div>
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
