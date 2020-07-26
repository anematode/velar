import React from 'react'
import styles from './App.module.css'
import MenuWrapper from './menu/MenuWrapper.jsx'
import Calculator from './calculator/Calculator.jsx'
import {
  Plot2D,
  Gridlines,
  InteractiveFunctionPlot2D,
  Color,
  parseString
} from 'grapheme'
import { themeColors, graphemeThemes } from './colors/themes.js'

import PropTypes from 'prop-types'

class App extends React.Component {
  static propTypes = {
    theme: PropTypes.oneOf(['dark', 'paper'])
  }

  constructor (props) {
    super(props)

    this.plot = new Plot2D()
    for (const side of Object.keys(this.plot.padding)) {
      this.plot.padding[side] = 0
    }

    this.gridlines = new Gridlines()
    this.gridlines.pens.axis.thickness = 2
    this.plot.add(this.gridlines)

    this.frameId = null

    this.state = {
      equations: []
    }
  }

  componentDidMount () {
    this.setTheme(graphemeThemes[this.props.theme])
    this.draw()
  }

  componentWillUnmount () {
    window.cancelAnimationFrame(this.frameId)
  }

  draw = () => {
    this.plot.render()
    this.frameId = window.requestAnimationFrame(this.draw)
  }

  setTheme ({ text, background, axisColor, gridColor, font }) {
    this.gridlines.labelStyle.color = text
    this.gridlines.labelStyle.shadowColor = background
    this.gridlines.labelStyle.fontFamily = font

    this.gridlines.pens.box.visible = false
    this.gridlines.pens.axis.color = axisColor
    this.gridlines.pens.major.color = gridColor
    this.gridlines.pens.minor.color = gridColor
  }

  newEquation () {
    const fnPlot = new InteractiveFunctionPlot2D()
    console.log(this.plot)
    const color = 'blue'
    fnPlot.pen.color = Color.rgba(...themeColors[this.props.theme][color])
    const { text, background, font } = graphemeThemes[this.props.theme]
    fnPlot.inspPtLabelStyle.color = text
    fnPlot.inspPtLabelStyle.shadowColor = background
    fnPlot.inspPtLabelStyle.fontFamily = font
    return {
      fnPlot,
      equation: '',
      latex: '',
      color,
      lineStyle: 'solid',
      visible: true,
      error: false
    }
  }

  handleAddEquation = () => {
    const equation = this.newEquation()
    this.plot.add(equation.fnPlot)
    this.setState({
      equations: [...this.state.equations, equation]
    })
  }

  handleEquationUpdate = (index, type, value) => {
    this.setState({
      equations: this.state.equations.map((equation, i) => {
        if (i === index) {
          const { fnPlot } = equation
          switch (type) {
            case 'setFunction': {
              try {
                const fn = parseString(value)
                fnPlot.setFunction(fn)
                fnPlot.update()
                return {
                  ...equation,
                  equation: value,
                  latex: fn.latex(),
                  error: false
                }
              } catch (_) {
                return { ...equation, equation: value, error: true }
              }
            }
            default: {
              console.warn(`What is this equation update of type ${type}??`)
              return equation
            }
          }
        } else {
          return equation
        }
      })
    })
  }

  handleToggleEquationVisibility = index => {
    this.setState({
      equations: this.state.equations.map((equation, i) => {
        if (i === index) {
          const { fnPlot } = equation
          fnPlot.visible = !fnPlot.visible
          fnPlot.needsUpdate = true
          return { ...equation, visible: fnPlot.visible }
        } else {
          return equation
        }
      })
    })
  }

  handleDuplicateEquation = index => {
    console.log('dupe', this.state.equations[index])
  }

  handleRemoveEquation = index => {
    this.setState({
      equations: this.state.equations.filter((_, i) => i !== index)
    })
  }

  render () {
    const { equations } = this.state
    return (
      <div className={styles.wrapper}>
        <MenuWrapper />
        <Calculator
          plot={this.plot}
          equations={equations.map(
            ({ equation, latex, color, lineStyle, visible, error }) => ({
              equation,
              latex,
              color,
              lineStyle,
              visible,
              error
            })
          )}
          onAddEquation={this.handleAddEquation}
          onEquationUpdate={this.handleEquationUpdate}
          onToggleEquationVisibility={this.handleToggleEquationVisibility}
          onDuplicateEquation={this.handleDuplicateEquation}
          onRemoveEquation={this.handleRemoveEquation}
        />
      </div>
    )
  }
}

export default App
