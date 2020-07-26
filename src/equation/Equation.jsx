import React from 'react'
import styles from './Equation.module.css'
import { classNames } from '../utils/class-names.js'
import QuickActions from './QuickActions.jsx'
import Info from './Info.jsx'

class Equation extends React.Component {
  render () {
    return (
      <li
        className={classNames(styles.equation, styles.expanded, 'color-blue')}
      >
        <div className={styles.preview}>
          <QuickActions />
          <div className={styles.colorStrip} />
          <button className={styles.katexPreview} />
        </div>
        <Info />
      </li>
    )
  }
}

export default Equation
