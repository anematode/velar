import React from 'react'
import styles from './QuickActions.module.css'
import { TrashcanIcon, EyeClosedIcon } from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { classNames } from '../utils/class-names.js'

class QuickActions extends React.Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <div className={styles.quickActions}>
          <IconBtn className={classNames(styles.quickAction, styles.danger)}>
            <TrashcanIcon aria-label='Remove' />
          </IconBtn>
          <IconBtn className={styles.quickAction}>
            <EyeClosedIcon aria-label='Hide' />
          </IconBtn>
        </div>
      </div>
    )
  }
}

export default QuickActions
