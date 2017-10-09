import React, { Component } from 'react';

import Settings from './components/Settings/Settings';
import Triangle from './components/Triangle/Triangle';
import Output from './components/Output/Output';

import 'normalize.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.updateCss = this.updateCss.bind(this);
    this.updateSettings = this.updateSettings.bind(this);
    this.changeSetup = this.changeSetup.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.changeSize = this.changeSize.bind(this);
    this.handleCopy = this.handleCopy.bind(this);

    this.lengthDirection = {
      top: {
        top: 0,
        right: 'widthRight',
        bottom: 'height',
        left: 'widthLeft'
      },
      right: {
        top: 'heightTop',
        right: 0,
        bottom: 'heightBottom',
        left: 'width'
      },
      bottom: {
        top: 'height',
        right: 'widthRight',
        bottom: 0,
        left: 'widthLeft'
      },
      left: {
        top: 'heightTop',
        right: 'width',
        bottom: 'heightBottom',
        left: 0
      },
      topRight: {
        top: 0,
        right: 'width',
        bottom: 'height',
        left: 0
      },
      bottomRight: {
        top: 0,
        right: 0,
        bottom: 'height',
        left: 'width'
      },
      bottomLeft: {
        top: 'height',
        right: 0,
        bottom: 0,
        left: 'width'
      },
      topLeft: {
        top: 'height',
        right: 'width',
        bottom: 0,
        left: 0
      }
    };

    this.colorDirection = {
      'top': 'bottom',
      'right': 'left',
      'bottom': 'top',
      'left': 'right',
      'topRight': 'right',
      'bottomRight': 'bottom',
      'bottomLeft': 'left',
      'topLeft': 'top'
    };

    this.settings = {
      disableEquilateral: false,
      size: {}
    };

    this.staticCSS = 'display: inline-block;\nwidth: 0;\nheight: 0;\nborder-style: solid;';

    const width = 200,
          height = 100,
          widthRight = width / 2,
          widthLeft = width / 2,
          heightTop = height / 2,
          heightBottom = height / 2;

    this.state = {
      direction: 'top',
      type: 'isosceles',
      color: '#00bcd4',
      output: '',
      copied: false,
      width,
      height,
      widthRight,
      widthLeft,
      heightTop,
      heightBottom,
    };
  }

  componentDidMount() {
    this.changeSetup();
    this.updateCss();
  }

  componentWillUpdate() {
    if (this.state.copied) {
      this.setState({
        copied: false
      });
    }
  }

  updateSettings(field, value) {
    this.setState({ [field]: value }, () => {
      switch (field) {
        case 'direction':
        case 'type':
          this.changeSetup();
          this.changeSize();
          this.updateCss();
        break;
        case 'color':
          this.updateCss();
        break;
        case 'width':
        this.changeSize('width');
        this.updateCss();
        break;
        case 'height':
        this.changeSize('height');
        this.updateCss();
        break;
        case 'widthLeft':
        case 'widthRight':
        case 'heightTop':
        case 'heightBottom':
          this.changeSize();
          this.updateCss();
        break;
        default:
        break;
      }
    });
  }

  changeSize(value) {
    const direction = this.state.direction;
    const type = this.state.type;

    if (direction === 'top' ||
      direction === 'bottom' ||
      direction === 'left' ||
      direction === 'right') {
      if (!this.settings.size.width) {
        this.setState({
          width: Number(this.state.widthLeft) + Number(this.state.widthRight)
        });
      } else if (!this.settings.size.height) {
        this.setState({
          height: Number(this.state.heightTop) + Number(this.state.heightBottom)
        });
      }
    } else if (type === 'isosceles') {
      if (value === 'width') {
        this.setState({
          height: this.state.width
        });
      } else if (value === 'height') {
        this.setState({
          width: this.state.height
        });
      } else if (this.state.height !== this.state.width) {
        this.setState({
          height: this.state.width
        });
      }
    }

    if (type !== 'scalene') {
      this.setState({
        widthLeft: this.state.width / 2,
        widthRight: this.state.width / 2,
        heightTop: this.state.height / 2,
        heightBottom: this.state.height / 2
      });
    }

    this.updateCss();
  }

  changeSetup() {
    const type = this.state.type;
    const direction = this.state.direction;

    if (
        direction === 'topLeft' ||
        direction ==='topRight' ||
        direction === 'bottomLeft' ||
        direction === 'bottomRight'
        )
    {
      this.settings.disableEquilateral = true;
      if (type === 'equilateral') {
        this.setState({
          type: 'isosceles'
        }, () => {
          this.changeSize();
          return;
        });
      }
    } else {
      this.settings.disableEquilateral = false;
    }

    switch (type) {
      case 'equilateral':
        if (direction === 'top' || direction === 'bottom') {
          this.settings.size = {
            width: true,
            height: false,
            widthLeft: false,
            widthRight: false,
            heightTop: false,
            heightBottom: false
          }
        } else if (direction === 'left' || direction === 'right') {
          this.settings.size = {
            width: false,
            height: true,
            widthLeft: false,
            widthRight: false,
            heightTop: false,
            heightBottom: false
          }
        } else {
          this.settings.size = {
            width: true,
            height: true,
            widthLeft: false,
            widthRight: false,
            heightTop: false,
            heightBottom: false
          }
        }
      break;
      case 'isosceles':
        this.settings.size = {
          width: true,
          height: true,
          widthLeft: false,
          widthRight: false,
          heightTop: false,
          heightBottom: false
        }
      break;
      case 'scalene':
        if (direction === 'top' || direction === 'bottom') {
          this.settings.size = {
            width: false,
            height: true,
            widthLeft: true,
            widthRight: true,
            heightTop: false,
            heightBottom: false
          }
        } else if (direction === 'left' || direction === 'right') {
          this.settings.size = {
            width: true,
            height: false,
            widthLeft: false,
            widthRight: false,
            heightTop: true,
            heightBottom: true
          }
        } else {
          this.settings.size = {
            width: true,
            height: true,
            widthLeft: false,
            widthRight: false,
            heightTop: false,
            heightBottom: false
          }
        }
      break;
      default:
      break;
    }
  }

  updateCss() {
    const direction = this.state.direction;
    const type = this.state.type;
    const color = this.state.color;

    const width = this.state.width;
    const height = this.state.height;

    const widthLeft = this.state.widthLeft;
    const widthRight = this.state.widthRight;

    const heightTop = this.state.heightTop;
    const heightBottom = this.state.heightBottom;

    let currentDirection = this.lengthDirection[direction];
    let borderColors = {
      'top': 'transparent',
      'right': 'transparent',
      'bottom': 'transparent',
      'left': 'transparent'
    };
    let borderWidth = {
      'top': 0,
      'right': 0,
      'bottom': 0,
      'left': 0
    };

    borderColors[this.colorDirection[direction]] = color;

    for (let value in currentDirection) {
      switch(type) {
        case 'equilateral':
          if (direction === 'top' || direction === 'bottom') {
            const equHeight = (Math.sqrt(3) / 2 * width).toFixed(1);

            switch(currentDirection[value]) {
              case 'width':
              case 'height':
                borderWidth[value] = `${ equHeight }px`;
              break;
              case 'widthLeft':
              case 'widthRight':
                borderWidth[value] = `${ width / 2 }px`;
              break;
              default:
              break;
            }
          } else if (direction === 'left' || direction === 'right') {
            const equHeight = (Math.sqrt(3) / 2 * height).toFixed(1);

            switch(currentDirection[value]) {
              case 'width':
              case 'height':
                borderWidth[value] = `${ equHeight }px`;
              break;
              case 'heightTop':
              case 'heightBottom':
                borderWidth[value] = `${ height / 2 }px`;
              break;
              default:
              break;
            }
          }
        break;
        case 'isosceles':
          switch(currentDirection[value]) {
            case 'width':
              borderWidth[value] = `${ width }px`;
              break;
            case 'height':
              borderWidth[value] = `${ height }px`;
              break;
            case 'widthLeft':
            case 'widthRight':
              borderWidth[value] = `${ width / 2 }px`;
            break;
            case 'heightTop':
            case 'heightBottom':
              borderWidth[value] = `${ height / 2 }px`;
            break;
            default:
            break;
          }
        break;
        case 'scalene':
          switch(currentDirection[value]) {
            case 'width':
              borderWidth[value] = `${ width }px`;
              break;
            case 'height':
              borderWidth[value] = `${ height }px`;
              break;
            case 'widthLeft':
              borderWidth[value] = `${ widthLeft }px`;
            break;
            case 'widthRight':
              borderWidth[value] = `${ widthRight }px`;
            break;
            case 'heightTop':
              borderWidth[value] = `${ heightTop }px`;
            break;
            case 'heightBottom':
              borderWidth[value] = `${ heightBottom }px`;
            break;
            default:
            break;
          }
        break;
        default:
        break;
      }
    }

    borderWidth = Object.values(borderWidth).join(' ');
    borderColors = Object.values(borderColors).join(' ');

    this.setState(
      { output: `${ this.staticCSS }\nborder-width: ${ borderWidth };\nborder-color: ${ borderColors };` }
    );
  }

  handleFocus(e) {
    e.target.select();
  }

  handleCopy() {
    this.setState({
      copied: true
    });
  }

  render() {
    return (
      <div className="triangle-generator">
        <header className="triangle-generator__header">
          <h1 className="triangle-generator__title">CSS Triangle Generator</h1>
        </header>

        <main className="triangle-generator__content">
          <div className="container">
            <div className="triangle-generator__inner">
              
              <Settings
                directions={ this.props.directions }
                types={ this.props.types }
  
                direction={ this.state.direction }
                type={ this.state.type }
                color={ this.state.color }
                width={ this.state.width }
                height={ this.state.height }
  
                widthLeft={ this.state.widthLeft }
                widthRight={ this.state.widthRight }
                heightTop={ this.state.heightTop }
                heightBottom={ this.state.heightBottom }
  
                handleChangeColor={ this.handleChangeColor }
                updateSettings={ this.updateSettings }
  
                settings={ this.settings }
                changeSetup={ this.changeSetup }
                changeSize={ this.changeSize }
                updateCss={ this.updateCss }
              />
  
              <div className="triangle-generator__result">
                <Triangle output={ this.state.output } />
  
                <Output
                  output={ this.state.output }
                  copied={ this.state.copied }
                  handleFocus={ this.handleFocus }
                  handleCopy={ this.handleCopy }
                />
              </div>
            </div>
          </div>
        </main>

        <footer className="triangle-generator__footer">
          <div className="container">&copy; 2017</div>
        </footer>
      </div>
    );
  }
}

App.defaultProps = {
  directions: [
    'topLeft',
    'top',
    'topRight',
    'right',
    'bottomRight',
    'bottom',
    'bottomLeft',
    'left',
  ],
  types: [
    'equilateral',
    'isosceles',
    'scalene'
  ]
}

export default App;
