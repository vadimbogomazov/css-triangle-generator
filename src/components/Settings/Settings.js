import React from 'react';
import Photoshop from 'react-color';
import { capitalizeFirstLetter, splitCamelCase } from '../../helpers.js'

import Field from '../Field/Field';

const Settings = (props) => {
  return (
  <div>
    <section className="section">
      <h3 className="section__title">Direction</h3>
      <p>{ capitalizeFirstLetter(splitCamelCase(props.direction)) }</p>
      {
        props.directions.map((direction, index) => {
          return <div key={ index }>
            <input
              type="radio"
              name="direction"
              id={ direction }
              value={ direction }
              checked={ direction === props.direction }
              onChange={ (e) => props.updateSettings('direction', e.currentTarget.value) }
            />
            <label htmlFor={ direction }>{ capitalizeFirstLetter(splitCamelCase(direction)) }</label>
          </div>
        })
      }
    </section>

    <section className="section">
      <h3 className="section__title">Type</h3>
      {
        props.types.map((type, index) => {
          if (type === 'equilateral' && props.settings.disableEquilateral) {
            return false;
          }

          return <span key={ index }>
            <input
              type="radio"
              name="type"
              id={ type }
              value={ type }
              checked={ type === props.type }
              onChange={ (e) => props.updateSettings('type', e.target.value) }
            />

            <label htmlFor={ type }>{ type }</label>
          </span>
        })
      }
    </section>

    <section className="section">
      <h3 className="section__title">Size</h3>

      <div>
        <Field
          name="width"
          valueName="width"
          value={ props.width }
          size={ props.settings.size }
          updateSettings={ props.updateSettings }
        />

        <Field
          name="left"
          valueName="widthLeft"
          value={ props.widthLeft }
          size={ props.settings.size }
          updateSettings={ props.updateSettings }
        />

        <Field
          name="right"
          valueName="widthRight"
          value={ props.widthRight }
          size={ props.settings.size }
          updateSettings={ props.updateSettings }
        />
      </div>

      <div>
        <Field
          name="height"
          valueName="height"
          value={ props.height }
          size={ props.settings.size }
          updateSettings={ props.updateSettings }
        />

        <Field
          name="top"
          valueName="heightTop"
          value={ props.heightTop }
          size={ props.settings.size }
          updateSettings={ props.updateSettings }
        />

        <Field
          name="bottom"
          valueName="heightBottom"
          value={ props.heightBottom }
          size={ props.settings.size }
          updateSettings={ props.updateSettings }
        />
      </div>
    </section>

    <section className="section">
      <h3 className="section__title">Color</h3>

      <Photoshop color={ props.color } onChangeComplete={ (color) =>  props.updateSettings('color', color.hex) }
        disableAlpha={ true }
      />
    </section>
  </div>);
}

export default Settings;