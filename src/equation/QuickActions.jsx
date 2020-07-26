import React from 'react'
import styles from './QuickActions.module.css'
import { TrashcanIcon, EyeClosedIcon } from '@primer/octicons-react'

class QuickActions extends React.Component {
  render () {
    return (
      <div className={styles.quickActionsWrapper}>
        <div className={styles.quickActions}>
          <IconBtn className={classNames(styles.quickAction, 'danger')}>
            <TrashcanIcon aria-label="Remove" />
          </IconBtn>
          <IconBtn className={styles.quickAction}>
            <EyeClosedIcon aria-label="Hide" />
          </IconBtn>
        </div>
      </div>
    )
  }
}

export default QuickActions
