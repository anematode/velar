import React from 'react'
import styles from './Equations.module.css'
import AddEquation from './AddEquation.jsx'
import Equation from '../equation/Equation.jsx'
import { PlusIcon } from '@primer/octicons-react'

class Equations extends React.Component {
  render () {
    const {
      equations,
      onAddEquation,
      onEquationUpdate,
      onToggleVisibility,
      onDuplicate,
      onRemove
    } = this.props
    return (
      <section className={styles.wrapper}>
        <div className={styles.logoSpace} />
        <ul className={styles.equations}>
          {equations.map(({ equation, latex, color, lineStyle }, i) => <Equation
            key={i}
            index={i}
            equation={equation}
            latex={latex}
            color={color}
            lineStyle={lineStyle}
            onEquationUpdate={onEquationUpdate}
            onToggleVisibility={onToggleVisibility}
            onDuplicate={onDuplicate}
            onRemove={onRemove}
          />)}
          <li className={styles.addEquationLine}>
            <button className={styles.addEquationLineBtn} onClick={onAddEquation}>
              <PlusIcon aria-label='Add equation' />
            </button>
          </li>
        </ul>
        <AddEquation onAddEquation={onAddEquation} />
      </section>
    )
  }
}

export default Equations
