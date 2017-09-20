import React, { Component } from 'react';

class Triangle extends Component {
  componentDidMount() {
    this.refs.triangle.setAttribute('style', this.props.output);
  }

  componentDidUpdate() {
    this.refs.triangle.setAttribute('style', this.props.output);
  }

  render() {
    return <div className="triangle-wrapper"><div ref="triangle" className="triangle"></div></div>;
  } 
}

export default Triangle;
