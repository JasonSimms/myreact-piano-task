import React, { Component } from "react";
import playSong from "./playSong";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import NewSong from "./NewSong";

import { ListGroup } from "react-bootstrap";

class Player extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isPlaying: false,
      songLength: 0,
      toPostSong: null
    };

    this._handleClick = this._handleClick.bind(this);
  }

  componentDidUpdate() {
    // Stops multiple songs from playing at once.
    if (this.state.isPlaying) {
      this.resetPlayerTimeout = setTimeout(() => {
        this.setState(() => ({ isPlaying: false }));
      }, this.state.songLength * 1000);
    }
  }
  render() {
    const client = new ApolloClient({
      uri: "http://localhost:4000"
    });

    let myLibrary = this.props.library;
    let mappedSongs = myLibrary.map((el, index) => {
      return (
        <NewSong key={el+index} song={el} index={index} handleClick={this._handleClick} />
      );
    });

    return (
      <div id="player">
        <ApolloProvider client={client}>
          <ListGroup>{mappedSongs}</ListGroup>
        </ApolloProvider>
      </div>
    );
  }

  _handleClick(notes, times, duration) {
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, songLength: duration });
      playSong(notes, times);
    }
  }
}

export default Player;
