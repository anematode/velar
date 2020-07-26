import React from 'react'
import styles from './IconBtn.module.css'
import { classNames } from '../utils/class-names.js'

import PropTypes from 'prop-types'

function IconBtn ({ className, children, ...btnProps }) {
  return (
    <button className={classNames(className, styles.iconBtn)} {...btnProps}>
      {children}
    </button>
  )
}

IconBtn.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
}

export default IconBtn
