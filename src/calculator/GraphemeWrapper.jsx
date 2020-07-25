import React from 'react'
import styles from './GraphemeWrapper.module.css'
import GraphemeSettings from './GraphemeSettings.jsx'

class GraphemeWrapper extends React.Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <GraphemeSettings />
      </div>
    )
  }
}

export default GraphemeWrapper
