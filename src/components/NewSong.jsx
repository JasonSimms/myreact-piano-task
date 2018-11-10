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

    const AddSong = () => {
      let input;
      // this.btn.setAttribute("disabled", "disabled");
    };

    return (
      <li key={this.props.song + this.props.index}>
        <button
          className="song-btn"
          onClick={() => {
            this._handleClick(
              this.props.song.keysPlayed,
              this.props.song.keysTimeStamps,
              this.props.song.duration
            );
          }}
        >
          Listen to: {this.props.song.title} length:{" "}
          {Math.round(this.props.song.duration)}s
        </button>
        {!this.state.isHidden ? 
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
                    this._disableBtn(this.props.song.title);
                }}
                >
              Post Song
            </button>
          )}
        </Mutation> : <p>uploaded!</p>
        }
      </li>
    );
  }

  _disableBtn(name) {
    console.log(`disabled`, name);
    this.setState({ isHidden: true });
  }
}

export default NewSong;
