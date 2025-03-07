import React, { Component } from "react";

const user = {
  firstName: "Parth",
  lastName: "Marathe"
};

class UserParser extends Component {
  render() {
    return (
      <div>
        {this.props.children}
        {this.props.greetings} {user.firstName} {user.lastName}
      </div>
    );
  }
}

export default UserParser;
