import React, { Component } from "react";

class Email extends Component {
  render() {
    return (
      <div className="input-form">
        <h4 className="input-title">
          What Should Your Next Song Be Called?:
          <input
            type="string"
            value={this.props.target}
            onChange={evt =>
              this.props.handleInputChange("title", evt.target.value)
            }
            className="title-input"
            autoFocus={true}
          />
        </h4>
      </div>
    );
  }
}

export default Email;
