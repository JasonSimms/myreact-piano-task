import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      note: null,
      song: [],
      isPlaying: false
    };

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
    const mappedKeys = keys.map((el, index) => {
      return (
        <button
          key={index}
          className="piano-key"
          //  onClick={() =>this._handleClick()}
          onMouseDown={() => this._playNote(el)}
          onMouseUp={() => this._endNote(el)}
        >
          {el}
        </button>
      );
    });

    return (
      <div className="App">
        <button
          className="testbtn"
          //  onClick={() =>this._handleClick()}
          onMouseDown={() => this._handleClick("down")}
          onMouseUp={() => this._handleClick("up")}
        >
          TestButton
        </button>
        <h2>Mapped Keys</h2>
        {mappedKeys}
        <h3>Note Played</h3>
        {this.state.note}
        <h3>Your Song</h3>
        {this.state.song}
      </div>
    );
  }
// TEST BUTTON ONLY
  _handleClick(key, note) {
    if (key === `down`) this.setState({ note });
    if (key === `up`) this.setState({ note: null });
  }

  _playNote(note) {
    this.setState({ note });
  }

  _endNote(note) {
    this.setState({ note: null });
  }
}

export default App;

// var timer = 0,
//     timerInterval,
//     button = document.getElementById("button");

// button.addEventListener("mousedown", function() {
//   timerInterval = setInterval(function(){
//     timer += 1;
//     document.getElementById("timer").innerText = timer;
//   }, 1000);
// });

// button.addEventListener("mouseup", function() {
//   clearInterval(timerInterval);
//   timer = 0;
// });
