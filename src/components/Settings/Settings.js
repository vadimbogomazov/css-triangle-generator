import React from 'react';
import Photoshop from 'react-color';
import { capitalizeFirstLetter, splitCamelCase } from '../../helpers.js'

import Field from '../Field/Field';

const Settings = (props) => {
  return (
  <div className="triangle-generator__settings">
    <section className="section">
      <h2 className="section__title">Direction</h2>
      {/*<p>{ capitalizeFirstLetter(splitCamelCase(props.direction)) }</p>*/}
      <div className="direction-table">
        {
          props.directions.map((direction, index) => {
            return <div key={ index } className="direction-table__cell">
                <span className="radio">
                <input
                  type="radio"
                  name="direction"
                  id={ `${ direction }-direction` }
                  value={ direction }
                  checked={ direction === props.direction }
                  onChange={ (e) => props.updateSettings('direction', e.currentTarget.value) }
                />
                <label htmlFor={ `${ direction }-direction` } className="radio-label">{ capitalizeFirstLetter(splitCamelCase(direction)) }</label>
              </span>
            </div>
          })
        }
      </div>
    </section>

    <section className="section">
      <h2 className="section__title">Type</h2>
      <div className="section__row">
        {
          props.types.map((type, index) => {
            return <span key={ index } className="radio">
              <input
                type="radio"
                name="type"
                id={ type }
                value={ type }
                checked={ type === props.type }
                onChange={ (e) => props.updateSettings('type', e.target.value) }
                disabled={ type === 'equilateral' && props.settings.disableEquilateral }
              />

              <label htmlFor={ type } className="radio-label">{ type }</label>
            </span>
          })
        }
      </div>
    </section>

    <section className="section">
      <h2 className="section__title">Size</h2>

      <div className="section__row">
        <div className="size-table">
          <div className="size-table__row">
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

          <div className="size-table__row">
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
        </div>
      </div>
    </section>

    <section className="section">
      <h2 className="section__title">Color</h2>

      <Photoshop color={ props.color } onChangeComplete={ (color) =>  props.updateSettings('color', color.hex) }
        disableAlpha={ true }
      />
    </section>
  </div>);
}

export default Settings;