import React from 'react';
import { capitalizeFirstLetter } from '../../helpers.js'

const Field = (props) => {
  return <div className="size-table__cell">
    <label htmlFor={ props.name }>{ capitalizeFirstLetter(props.name) }</label>
    <input
      type="number"
      id={ props.name }
      min="1"
      disabled={ !props.size[props.valueName] }
      value={ props.value }
      onChange={ (e) => props.updateSettings(props.valueName, e.target.value) }
    />
  </div>
}

export default Field;