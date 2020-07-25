import React from 'react'
import styles from './Calculator.module.css'
import Equations from './Equations.jsx'
import GraphemeWrapper from './GraphemeWrapper.jsx'

class Calculator extends React.Component {
  render () {
    return (
      <main className={styles.main}>
        <Equations />
        <div className={styles.resizeEquations}></div>
        <GraphemeWrapper />
      </main>
    )
  }
}

export default Calculator
