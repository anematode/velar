import React from 'react'
import styles from './IconBtn.module.css'
import { classNames } from '../utils/class-names.js'

function IconBtn ({ className, children }) {
  return (
    <button className={classNames(className, styles.iconBtn)}>
      {children}
    </button>
  )
}

export default IconBtn
