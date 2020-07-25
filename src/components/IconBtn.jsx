import React from 'react'
import styles from './IconBtn.module.css'
import { classNames } from '../utils/class-names.js'

function IconBtn ({ className, children, ...btnProps }) {
  return (
    <button className={classNames(className, styles.iconBtn)} {...btnProps}>
      {children}
    </button>
  )
}

export default IconBtn
