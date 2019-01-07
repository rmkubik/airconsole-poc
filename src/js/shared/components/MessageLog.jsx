import React from 'react';

const MessageLog = ({ messages }) => (
  <ol>
    {messages.map(({ id, data }, index) => (
      <li key={index}>{`Device: ${id} - ${JSON.stringify(
        data,
        undefined,
        2,
      )}`}</li>
    ))}
  </ol>
);

export default MessageLog;
