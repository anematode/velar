import React from 'react'
import styles from './App.module.css'
import MenuWrapper from './menu/MenuWrapper.jsx'
import Calculator from './calculator/Calculator.jsx'
import { Plot2D, Gridlines } from 'grapheme'
import { graphemeThemes } from './colors/themes.js'

class App extends React.Component {
  constructor (props) {
    super(props)

    this.plot = new Plot2D()
    for (const side of Object.keys(this.plot.padding)) {
      this.plot.padding[side] = 0
    }

    this.gridlines = new Gridlines()
    this.gridlines.pens.axis.thickness = 2
    this.plot.add(this.gridlines)

    const theme = 'dark' // TODO: change theme
    this.setTheme(graphemeThemes[theme])

    this.frameId = null

    this.state = {
      equations: []
    }
  }

  componentDidMount () {
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

  handleAddEquation () {
    console.log('add equation')
  }

  handleEquationUpdate (index, changes) {
    console.log('update', this.state.equations[index], changes)
  }

  handleToggleEquationVisibility (index) {
    console.log('toggle visib', this.state.equations[index])
  }

  handleDuplicateEquation (index) {
    console.log('dupe', this.state.equations[index])
  }

  handleRemoveEquation (index) {
    console.log('del', this.state.equations[index])
  }

  render () {
    const { equations } = this.state
    return (
      <div className={styles.wrapper}>
        <MenuWrapper />
        <Calculator
          plot={this.plot}
          equations={equations}
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
