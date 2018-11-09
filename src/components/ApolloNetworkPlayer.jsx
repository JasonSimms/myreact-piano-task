import React, { Component } from "react";
import playSong from "./playSong";

// import { render } from "react-dom";
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
    }
    }
  `;
    

    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app</h2>
          <ol>

          <Query
            query={GET_SONGS}
            >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
                console.log(data.songs)
                return data.songs.map(el=>{
                  return <li key={el.title}>{el.title}</li>
                  
                })
                // return <p>{data.songs.toString()}</p>
              }}
          </Query>
              </ol>
        </div>
      </ApolloProvider>
    );
  }

  _handleClick(key, time) {
    console.log(time);
    if (!this.state.isPlaying) {
      this.setState({ isPlaying: true, songLength: time });
      playSong(key);
    }
  }
}

export default Player;
