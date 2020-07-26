import React from 'react'
import styles from './App.module.css'
import MenuWrapper from './menu/MenuWrapper.jsx'
import Calculator from './calculator/Calculator.jsx'
import {
  Plot2D,
  Gridlines,
  InteractiveFunctionPlot2D,
  Color,
  parseString,
  utils
} from 'grapheme'
import { COLORS, themeColors, graphemeThemes } from './colors/themes.js'
import { lineStyles } from './utils/line-styles.js'

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
    this.plot.setSize(1, 1)

    this.gridlines = new Gridlines()
    this.gridlines.pens.axis.thickness = 2
    this.plot.add(this.gridlines)

    this.frameId = null

    this.colors = Object.keys(COLORS)
    const equation = this.newEquation({ color: this.colors[0] })
    this.plot.add(equation.fnPlot)
    this.state = {
      nextColor: 1,
      equations: [equation]
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

  newEquation ({ equation = 'x', color = 'blue', lineStyle = 'SOLID' } = {}) {
    const fnPlot = new InteractiveFunctionPlot2D()

    fnPlot.pen.color = Color.rgba(...themeColors[this.props.theme][color])

    const { thickness, dashPattern } = lineStyles[lineStyle]
    fnPlot.pen.thickness = thickness
    fnPlot.pen.dashPattern = dashPattern

    const { text, background, font } = graphemeThemes[this.props.theme]
    fnPlot.inspPtLabelStyle.color = text
    fnPlot.inspPtLabelStyle.shadowColor = background
    fnPlot.inspPtLabelStyle.fontFamily = font

    let latex = ''
    let error = false
    try {
      const fn = parseString(equation)
      fnPlot.setFunction(fn)
      latex = fn.latex()
    } catch (err) {
      error = true
    }

    return {
      id: utils.generateUUID(),
      fnPlot,
      equation,
      latex,
      color,
      lineStyle,
      visible: true,
      error
    }
  }

  handleAddEquation = () => {
    const equation = this.newEquation({
      color: this.colors[this.state.nextColor]
    })
    this.plot.add(equation.fnPlot)
    this.setState({
      nextColor: (this.state.nextColor + 1) % this.colors.length,
      equations: [...this.state.equations, equation]
    })
  }

  handleEquationUpdate = (id, type, value) => {
    this.setState({
      equations: this.state.equations.map(equation => {
        if (id === equation.id) {
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
            case 'setColor': {
              fnPlot.pen.color = Color.rgba(
                ...themeColors[this.props.theme][value]
              )
              return { ...equation, color: value }
            }
            case 'setLineStyle': {
              const { thickness, dashPattern } = lineStyles[value]
              fnPlot.pen.thickness = thickness
              fnPlot.pen.dashPattern = dashPattern
              fnPlot.markUpdate()
              return { ...equation, lineStyle: value }
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

  handleToggleEquationVisibility = id => {
    this.setState({
      equations: this.state.equations.map(equation => {
        if (id === equation.id) {
          const { fnPlot } = equation
          fnPlot.visible = !fnPlot.visible
          return { ...equation, visible: fnPlot.visible }
        } else {
          return equation
        }
      })
    })
  }

  handleDuplicateEquation = id => {
    const index = this.state.equations.findIndex(eq => eq.id === id)
    const equation = this.newEquation(this.state.equations[index])
    this.plot.add(equation.fnPlot)
    this.setState({
      equations: [
        ...this.state.equations.slice(0, index + 1),
        equation,
        ...this.state.equations.slice(index + 1)
      ]
    })
  }

  handleRemoveEquation = id => {
    this.setState({
      equations: this.state.equations.filter(({ fnPlot, id: eqId }) => {
        if (id === eqId) {
          fnPlot.destroy()
          return false
        } else {
          return true
        }
      })
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
            ({ id, equation, latex, color, lineStyle, visible, error }) => ({
              id,
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
