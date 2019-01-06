import React from 'react';

const MessageLog = ({ messages }) => (
  <ol>
    {messages.map(({ id, data }, index) => (
      <li key={index}>{`Device: ${id} - ${data}`}</li>
    ))}
  </ol>
);

export default MessageLog;
