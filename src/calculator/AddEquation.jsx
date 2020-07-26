import React from 'react'
import styles from './AddEquation.module.css'
import { PlusIcon, GraphIcon, NoteIcon } from '@primer/octicons-react'

class AddEquation extends React.Component {
  render () {
    return (
      <div className={styles.addEquation}>
        <span className={styles.addEquationLabel}>
          Add ...
          <span className='flex' />
          <PlusIcon />
        </span>
        <div className={styles.addEquationWrapper}>
          <div className={styles.addEquationDialog} role='group'>
            <button className={styles.addType}>
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
