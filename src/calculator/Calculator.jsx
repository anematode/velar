import React from 'react'
import styles from './Calculator.module.css'
import Equations from './Equations.jsx'
import GraphemeWrapper from './GraphemeWrapper.jsx'

class Calculator extends React.Component {
  render () {
    const { plot } = this.props
    return (
      <main className={styles.main}>
        <Equations />
        <div className={styles.resizeEquations}></div>
        {plot && <GraphemeWrapper plot={plot} />}
      </main>
    )
  }
}

export default Calculator
