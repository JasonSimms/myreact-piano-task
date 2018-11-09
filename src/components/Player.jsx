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
              this._handleClick(el[1],el[2]);
            }}
          >
            Listen to: {el[0]} length: {Math.round(el[2])}s
          </button>
        </li>
      );
    });

    return (
      <div>
        <h3>Playing: {this.props.song[0]}</h3>
        <br />
        {this.state.isPlaying.toString()}
        {this.state.songLength}
        <ul>{mappedSongs}</ul>
        <br />
      </div>
    );
  }

  _handleClick(key,time) {
    console.log(time)
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, songLength: time});
      playSong(key);
    }
  }


}

export default Player;
