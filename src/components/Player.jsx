import React, { Component } from "react";
import playSong from "./playSong";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isPlaying: false,
      songLength: 0
    };

    this._handleClick = this._handleClick.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isPlaying) {
      // when the state is updated (turned red),
      // a timeout is triggered to switch it back off
      this.resetPlayerTimeout = setTimeout(() => {
        this.setState(() => ({ isPlaying: false }));
      }, this.state.songLength*1000);
    }
  }
  render() {
    let myLibrary = this.props.library;
    let mappedSongs = myLibrary.map(el => {
      return (
        <li key={el}>
          <button
            className="song-btn"
            onClick={() => {
              this._handleClick(el.keysPlayed,el.keysTimeStamps,el.duration);
            }}
          >
            Listen to: {el.title} length: {Math.round(el.duration)}s
          </button>
        </li>
      );
    });

    return (
      <div>
        <h3>Playing: {this.props.song.title}</h3>
        <br />
        {this.state.isPlaying.toString()}
        {this.state.songLength}
        <ul>{mappedSongs}</ul>
        <br />
      </div>
    );
  }

  _handleClick(notes,times,duration) {
    console.log(notes,times,duration)
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, songLength: duration});
      playSong(notes,times);
    }
  }


}

export default Player;
