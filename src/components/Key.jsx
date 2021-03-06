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
    return (
      <button className="key" onClick={this._togglePlay}>
        <p>{this.props.note}</p>
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
