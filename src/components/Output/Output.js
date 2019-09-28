import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { insertToArray } from '../../helpers.js'

const Output = (props) => {
  let output;

  if (props.hasPseudo) {
    output = insertToArray(props.output.split('\n'), 3, "content: '';").map((item, i) => {
        return `\t${ item }`;
    }).join('\n');
  } else {
    output = props.output;
  }

  return <div className="triangle-output">
    <h2 className="triangle-output__title">CSS</h2>

    <textarea className="triangle-output__textarea" onFocus={ props.handleFocus } value={ ((props.hasPseudo) ? ':after {\n' : '') + output + ((props.hasPseudo) ? '\n}' : '')}></textarea>

    <footer className="triangle-output__footer">
      <div className="">
        <CopyToClipboard
          text={ output }
          onCopy={ props.handleCopy }>
          <button className="triangle-output__btn">Copy to clipboard</button>
        </CopyToClipboard>

        { props.copied ? <span className="triangle-output__msg">Copied!</span> : null }
      </div>

      <div>
        <input type="checkbox" name="pseudo" id="pseudo" onChange={ props.togglePseudo } checked={ props.hasPseudo } />
        <label htmlFor="pseudo">Pseudo selector</label>
      </div>
    </footer>
  </div>
}

export default Output;
