import React, { Component } from 'react';
import MessageLog from '../../shared/components/MessageLog';

class Screen extends Component {
  state = {
    messages: [],
  };

  constructor(props) {
    super(props);

    // eslint-disable-next-line no-param-reassign
    props.airconsole.onMessage = (id, data) => {
      this.setState(prevState => ({
        messages: [
          ...prevState.messages,
          {
            id,
            data,
          },
        ],
      }));
    };
  }

  render() {
    const { messages } = this.state;

    return (
      <div>
        <h1>Screen</h1>
        <MessageLog messages={messages} />
      </div>
    );
  }
}

export default Screen;
