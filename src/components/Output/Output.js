import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const Output = (props) => {
  return <div className="triangle-output">
    <h2 className="triangle-output__title">CSS</h2>
    <textarea className="triangle-output__textarea" onFocus={ props.handleFocus } value={ props.output }></textarea>

    <CopyToClipboard
      text={ props.output }
      onCopy={ props.handleCopy }>
      <button className="triangle-output__btn">Copy to clipboard</button>
    </CopyToClipboard>

    { props.copied ? <span className="triangle-output__msg">Copied!</span> : null }
  </div>
}

export default Output;
