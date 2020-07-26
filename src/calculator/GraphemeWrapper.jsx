import React from 'react'
import styles from './GraphemeWrapper.module.css'
import GraphemeSettings from './GraphemeSettings.jsx'

import PropTypes from 'prop-types'
import { Plot2D } from 'grapheme'

class GraphemeWrapper extends React.Component {
  static propTypes = {
    plot: PropTypes.instanceOf(Plot2D).isRequired
  }

  // Refers to GraphemeWrapper's DOM element
  ref = null

  componentDidMount () {
    this.ref.appendChild(this.props.plot.domElement)
    this.resize()
    window.addEventListener('resize', this.resize)
  }

  componentWillUnmount () {
    this.ref.removeChild(this.props.plot.domElement)
    window.removeEventListener('resize', this.resize)
  }

  resize = () => {
    const { width, height } = this.ref.getBoundingClientRect()
    this.props.plot.setSize(width, height)
  }

  setRef = ref => {
    this.ref = ref
  }

  render () {
    return (
      <div className={styles.wrapper} ref={this.setRef}>
        <GraphemeSettings />
      </div>
    )
  }
}

export default GraphemeWrapper
