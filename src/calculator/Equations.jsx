import React from 'react'
import styles from './Equations.module.css'
import AddEquation from './AddEquation.jsx'
import Equation from '../equation/Equation.jsx'
import { PlusIcon } from '@primer/octicons-react'

import PropTypes from 'prop-types'

class Equations extends React.Component {
  static propTypes = {
    equations: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        equation: PropTypes.string.isRequired,
        latex: PropTypes.string.isRequired,
        color: PropTypes.string.isRequired,
        lineStyle: PropTypes.string.isRequired,
        visible: PropTypes.bool.isRequired,
        error: PropTypes.bool
      })
    ).isRequired,
    onAddEquation: PropTypes.func.isRequired,
    onEquationUpdate: PropTypes.func.isRequired,
    onToggleVisibility: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }

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
          {equations.map(
            ({ id, equation, latex, color, lineStyle, visible, error }) => (
              <Equation
                key={id}
                id={id}
                equation={equation}
                latex={latex}
                color={color}
                lineStyle={lineStyle}
                hidden={!visible}
                error={error}
                onEquationUpdate={onEquationUpdate}
                onToggleVisibility={onToggleVisibility}
                onDuplicate={onDuplicate}
                onRemove={onRemove}
              />
            )
          )}
          <li className={styles.addEquationLine}>
            <button
              className={styles.addEquationLineBtn}
              onClick={onAddEquation}
            >
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
