import React from 'react'
import styles from './QuickActions.module.css'
import { TrashcanIcon, EyeClosedIcon } from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { classNames } from '../utils/class-names.js'

import PropTypes from 'prop-types'

class QuickActions extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    onToggleVisibility: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  handleDontHide = e => {
    e.stopPropagation()
  }

  render () {
    const { onToggleVisibility, onRemove, hidden } = this.props
    return (
      <div className={styles.wrapper}>
        <div className={styles.quickActions} onClick={this.handleDontHide}>
          <IconBtn
            className={classNames(styles.quickAction, styles.danger)}
            onClick={onRemove}
          >
            <TrashcanIcon aria-label='Remove' className={styles.icon} />
          </IconBtn>
          <IconBtn
            className={classNames(
              styles.quickAction,
              hidden && styles.equationHidden
            )}
            onClick={onToggleVisibility}
          >
            <EyeClosedIcon aria-label='Hide' className={styles.icon} />
          </IconBtn>
        </div>
      </div>
    )
  }
}

export default QuickActions
