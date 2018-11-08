import React, { Component } from "react";

class PianoKey extends Component {
  constructor(props) {
    super(props);

    this.state = {
      play: false
    };

    this.url = `./grand-piano-mp3-sounds/${this.props.note}4.mp3`;
    this.audio = new Audio(this.url);
    this.togglePlay = this.togglePlay.bind(this);
  }


  render() {
    return (
      <button className="music-btn" 
    //   onClick={this.togglePlay}
      onMouseDown={() => this.props.playKey(this.props.note)}
      onMouseUp={() => this.props.endKey(this.props.note)}
      
      >
        {/* {this.state.play ? "Pause" : "Play" } */}
        {this.props.note}
      </button>
    );
  }

  togglePlay() {
    this.setState({ play: true})
    console.log(this.audio);
    // this.state.play ? this.audio.play() : this.audio.pause();
    this.audio.play()
  }
}

export default PianoKey;