import React from 'react'
import styles from './Equations.module.css'
import AddEquation from './AddEquation.jsx'
import Equation from '../equation/Equation.jsx'
import { PlusIcon } from '@primer/octicons-react'

class Equations extends React.Component {
  render () {
    return (
      <section className={styles.wrapper}>
        <div className={styles.logoSpace} />
        <ul className={styles.equations}>
          <Equation />
          <li className={styles.addEquationLine}>
            <button className={styles.addEquationLineBtn}>
              <PlusIcon aria-label='Add equation' />
            </button>
          </li>
        </ul>
        <AddEquation />
      </section>
    )
  }
}

export default Equations
