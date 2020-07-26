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
    this.setTheme(graphemeThemes['dark'])

    this.frameId = null
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

  setTheme ({
    text,
    background,
    axisColour,
    gridColour,
    font
  }) {
    this.gridlines.labelStyle.color = text
    this.gridlines.labelStyle.shadowColor = background
    this.gridlines.labelStyle.fontFamily = font

    this.gridlines.pens.box.visible = false
    this.gridlines.pens.axis.color = axisColour
    this.gridlines.pens.major.color = gridColour
    this.gridlines.pens.minor.color = gridColour
  }

  render () {
    return (
      <div className={styles.wrapper}>
        <MenuWrapper />
        <Calculator plot={this.plot} />
      </div>
    )
  }
}

export default App
