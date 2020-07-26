import React from 'react'
import styles from './Tabs.module.css'
import { PlusIcon } from '@primer/octicons-react'
import { classNames } from '../utils/class-names.js'

class Tabs extends React.Component {
  render () {
    return (
      <nav className={styles.tabs}>
        <button className={classNames(styles.tab, styles.active)}>Graph</button>
        <button className={styles.tab}>Data</button>
        <button className={styles.addTab}>
          <PlusIcon aria-label='Add tab' />
        </button>
      </nav>
    )
  }
}

export default Tabs
