import React from 'react'
import styles from './AddEquation.module.css'
import { PlusIcon, GraphIcon, NoteIcon } from '@primer/octicons-react'

import PropTypes from 'prop-types'

class AddEquation extends React.Component {
  static propTypes = {
    onAddEquation: PropTypes.func
  }

  render () {
    const { onAddEquation } = this.props
    return (
      <div className={styles.addEquation}>
        <span className={styles.addEquationLabel}>
          Add ...
          <span className='flex' />
          <PlusIcon />
        </span>
        <div className={styles.addEquationWrapper}>
          <div className={styles.addEquationDialog} role='group'>
            <button className={styles.addType} onClick={onAddEquation}>
              <GraphIcon className={styles.icon} />
              Graph
            </button>
            <button className={styles.addType}>
              <NoteIcon className={styles.icon} />
              Note
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddEquation
