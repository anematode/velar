import React from 'react'
import styles from './App.module.css'
import MenuWrapper from './menu/MenuWrapper.jsx'
import Calculator from './calculator/Calculator.jsx'
import { Plot2D, Gridlines } from 'grapheme'

class App extends React.Component {
  constructor (props) {
    super(props)

    const plot = new Plot2D()
    for (const side of Object.keys(plot.padding)) {
      plot.padding[side] = 0
    }

    const gridlines = new Gridlines()
    gridlines.pens.axis.thickness = 2
    plot.add(gridlines)

    this.plot = plot
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
