import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

class NewSong extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isHidden: false
    };

    this._disableBtn = this._disableBtn.bind(this);
  }

  render() {
    const ADD_SONG = gql`
      mutation AddSong(
        $title: String
        $keysPlayed: [String]
        $keysTimeStamps: [Float]
        $duration: Int
      ) {
        addSong(
          title: $title
          keysPlayed: $keysPlayed
          keysTimeStamps: $keysTimeStamps
          duration: $duration
        ) {
          id
          title
          keysPlayed
          keysTimeStamps
          duration
        }
      }
    `;

    return (
      <div key={this.props.song + this.props.index}>
        {!this.state.isHidden ? (
          <div>
            <button
              className="song-btn"
              onClick={() => {
                this.props.handleClick(
                  this.props.song.keysPlayed,
                  this.props.song.keysTimeStamps,
                  this.props.song.duration
                );
              }}
            >
              Listen to: {this.props.song.title} length:{" "}
              {Math.round(this.props.song.duration)}s
            </button>
            <Mutation mutation={ADD_SONG}>
              {(addSong, { data }) => (
                <button
                  ref={btn => {
                    this.btn = btn;
                  }}
                  onClick={e => {
                    e.preventDefault();
                    addSong({
                      variables: {
                        title: this.props.song.title,
                        duration: this.props.song.duration,
                        keysPlayed: this.props.song.keysPlayed,
                        keysTimeStamps: this.props.song.keysTimeStamps
                      }
                    });
                    this._disableBtn();
                  }}
                >
                  Post this Song!
                </button>
              )}
            </Mutation>
          </div>
        ) : (
          <p>{this.props.song.title} uploaded!</p>
        )}
      </div>
    );
  }

  _disableBtn() {
    this.setState({ isHidden: true });
  }
}

export default NewSong;
