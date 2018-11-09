import React, { Component } from "react";

class PianoKey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false
    };

    this.url = `./grand-piano-mp3-sounds/${this.props.note}3.mp3`;
    this.audio = new Audio(this.url);
    this._togglePlay = this._togglePlay.bind(this);
  }

  render() {
    return (
      <button className="music-btn" onClick={this._togglePlay}>
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
