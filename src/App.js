import React, { Component } from "react";

import PianoKey from "./components/Key";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      note: null,
      song: [],
      isPlaying: false,
      isRecording: false,
      time: 0
    };

    this.timer = null;
    this._startRecord = this._startRecord.bind(this);
    this._stopRecord = this._stopRecord.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._playNote = this._playNote.bind(this);
    this._endNote = this._endNote.bind(this);
  }

  componentDidMount() {
    console.log("Thank you for your interest in my code!");
  }
  render() {
    //
    const keys = ["A", "B", "C", "D", "E", "F", "G"];

    const piano = keys.map(el => {
      return (
        <PianoKey
          key={el}
          note={el}
          playKey={this._playNote}
          endNote={this._endNote}
        />
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
        {piano}
        <h3>Your Song</h3>
        {this.state.song}
      </div>
    );
  }

  // SandBox Functions
  _handleClick(key, note) {
    if (key === `down`) this.setState({ note });
    if (key === `up`) this.setState({ note: null });
  }

  _startRecord() {
    this.setState({time:0})
    console.log(`Record Started`);
    const increment = 0.5;
    this.timer = setInterval(() => {
      this.setState(prevState => ({ time: prevState.time + increment }));
    }, increment * 1000);
  }

  _stopRecord() {
    console.log(this.state.time);
    clearInterval(this.timer);
  }
  //  IN USE Functions
  _playNote(note) {
    if (this.state.note === null)
      this.setState({ song: [...this.state.song, `silence`] });
    this.setState({ note });
  }

  _endNote(note) {
    this.setState({ note: null, song: [...this.state.song, note] });
  }
}

export default App;

