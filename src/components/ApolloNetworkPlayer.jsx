import React, { Component } from "react";
import playSong from "./playSong";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

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
      }, this.state.songLength * 1000);
    }
  }

  render() {
    const client = new ApolloClient({
      uri: "http://localhost:4000"
    });

    const GET_SONGS = gql`
      {
        songs {
          id
          title
          keysPlayed
          keysTimeStamps
          duration
        }
      }
    `;

    return (
      <ApolloProvider client={client}>
        <div>
          <h2>Enjoy Database Library Songs:</h2>
          <ol>
            <Query 
            query={GET_SONGS}
            pollInterval={500}>
              {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Error :(</p>;
                console.log(data.songs[1]);
                return data.songs.map(el => {
                  return (
                    <li key={el.id}>
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
              }}
            </Query>
          </ol>
        </div>
      </ApolloProvider>
    );
  }

  _handleClick(notes,times, duration) {
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, songLength: duration });
      playSong(notes,times);
    }
  }
}

export default Player;
