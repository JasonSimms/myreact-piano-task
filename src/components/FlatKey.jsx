import React, { Component } from "react";

class PianoKey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false
    };

    this.url = `./grand-piano-mp3-sounds/${this.props.note}.mp3`;
    this.audio = new Audio(this.url);
    this._togglePlay = this._togglePlay.bind(this);
  }

  render() {
    if (this.props.note.includes("X")) {
      return (
        <button className="flat-key-hidden" onClick={this._togglePlay}>
          {this.props.note}
        </button>
      );
    }

    return (
      <button className="flat-key" onClick={this._togglePlay}>
        {this.props.note}
      </button>
    );
  }

  _togglePlay() {
    this.audio.currentTime = 0;
    this.audio.play();
    this.props.playNote(this.props.note);
  }
}

export default PianoKey;
