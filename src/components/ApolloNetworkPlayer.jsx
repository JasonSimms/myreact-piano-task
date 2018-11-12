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
      // when the state is updated (isPlaying),
      // a timeout is triggered to return it to false
      this.resetPlayerTimeout = setTimeout(() => {
        this.setState(() => ({ isPlaying: false }));
      }, this.state.songLength * 1000);
    }
  }

  componentShouldUpdate(){
    return false;
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
        <div className="apollo-container">
          <h4>Enjoy Database Library Songs:</h4>
          <div className="sidescroll-menu">
            <Query 
            query={GET_SONGS}
            pollInterval={1500}
            // skip={{this.state.isPlaying ? true}}
            >
              {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <p>Loading...</p>;
                if (error) return <p>Apollo Server Not Running..cd Apollo-server/README for instructions...</p>;
                console.log(data.songs[1]);
                return data.songs.map(el => {
                  return (
                      <button
                      key={el.id}
                        className="sidescroll-item"
                        onClick={() => {
                          this._handleClick(el.keysPlayed,el.keysTimeStamps,el.duration);
                        }}
                      >
                        {el.title} ({Math.round(el.duration)}s)
                      </button>
                  );
                });
              }}
            </Query>
          </div>
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
