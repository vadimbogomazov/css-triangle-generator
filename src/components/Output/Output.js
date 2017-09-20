import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

const Output = (props) => {
  return <div>
    <h2>CSS</h2>
    <textarea onFocus={ props.handleFocus } value={ props.output }></textarea>

    <CopyToClipboard
      text={ props.output }
      onCopy={ props.handleCopy }>
      <button>Copy to clipboard</button>
    </CopyToClipboard>

    { props.copied ? <span>Copied!</span> : null }
  </div>
}

export default Output;
