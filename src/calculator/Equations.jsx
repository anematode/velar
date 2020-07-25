import React from 'react'
import styles from './Equations.module.css'
import AddEquation from './AddEquation.jsx'
import Equation from '../equation/Equation.jsx'

class Equations extends React.Component {
  render () {
    return (
      <section className={styles.wrapper}>
        <div className={styles.logoSpace}></div>
        <ul className={styles.equations}>
          <Equation />
        </ul>
        <AddEquation />
      </section>
    )
  }
}

export default Equations
