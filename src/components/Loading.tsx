import React from 'react';

const Loading = () => {
  return (
    <div className='messages-container'>
      <div className='lds-ring'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
