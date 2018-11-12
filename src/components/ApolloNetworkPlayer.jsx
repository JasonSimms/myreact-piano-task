import React, { Component } from "react";
import playSong from "./playSong";

import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider, Query } from "react-apollo";

import {
  Button,
  ButtonGroup,
  Collapse
} from "react-bootstrap";

class Player extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      error: null,
      isPlaying: false,
      songLength: 0,
      open: false
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
        <Button onClick={() => this.setState({ open: !this.state.open })}>
        Enjoy Database Library Songs:
        </Button>
        <Collapse in={this.state.open}>
        <div>
          <ButtonGroup>
            <Query
              query={GET_SONGS}
              pollInterval={1500}
              >
              {({ loading, error, data, startPolling, stopPolling }) => {
                if (loading) return <p>Loading...</p>;
                if (error)
                  return (
                    <h4>
                      Apollo Server Not Running..cd Apollo-server/README for
                      instructions...
                    </h4>
                  );
                return data.songs.map(el => {
                  return (
                    <Button
                    key={el.id}
                    onClick={() => {
                      this._handleClick(
                        el.keysPlayed,
                        el.keysTimeStamps,
                        el.duration
                        );
                      }}
                      >
                      {el.title} ({Math.round(el.duration)}s)
                    </Button>
                  );
                });
              }}
            </Query>
          </ButtonGroup>
              </div>
        </Collapse>
        </div>
      </ApolloProvider>
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
