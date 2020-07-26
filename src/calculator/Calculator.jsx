import React from 'react'
import styles from './Calculator.module.css'
import Equations from './Equations.jsx'
import GraphemeWrapper from './GraphemeWrapper.jsx'

import PropTypes from 'prop-types'
import { Plot2D } from 'grapheme'

class Calculator extends React.Component {
  static propTypes = {
    plot: PropTypes.instanceOf(Plot2D)
  }

  render () {
    const {
      plot,
      equations,
      onAddEquation,
      onEquationUpdate,
      onToggleEquationVisibility,
      onDuplicateEquation,
      onRemoveEquation
    } = this.props
    return (
      <main className={styles.main}>
        <Equations
          equations={equations}
          onAddEquation={onAddEquation}
          onEquationUpdate={onEquationUpdate}
          onToggleVisibility={onToggleEquationVisibility}
          onDuplicate={onDuplicateEquation}
          onRemove={onRemoveEquation}
        />
        <div className={styles.resizeEquations} />
        {plot && <GraphemeWrapper plot={plot} />}
      </main>
    )
  }
}

export default Calculator
