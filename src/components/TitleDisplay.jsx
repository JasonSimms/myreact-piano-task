import React, { Component } from "react";

class Email extends Component {
  render() {
    return (
      <div className="input-form">
        <p className="input-title">
          Next Song Title:
          <input
            type="string"
            value={this.props.target}
            onChange={evt =>
              this.props.handleInputChange("title", evt.target.value)
            }
            className="title-input"
            //   placeholder="Untitled"
            autoFocus={true}
          />
        </p>
        <br />
        <br />
      </div>
    );
  }
}

export default Email;
