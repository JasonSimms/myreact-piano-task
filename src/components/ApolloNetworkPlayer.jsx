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
      uri: "https://w5xlvm3vzz.lp.gql.zone/graphql"
    });

    return (
      <ApolloProvider client={client}>
        <div>
          <h2>My first Apollo app</h2>
          <Query
            query={gql`
              {
                rates(currency: "USD") {
                  currency
                  rate
                }
              }
            `}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              return data.rates.map(({ currency, rate }) => (
                <div key={currency}>
                  <p>{`${currency}: ${rate}`}</p>
                </div>
              ));
            }}
          </Query>
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
