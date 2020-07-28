import React from 'react'
import styles from './QuickActions.module.css'
import { XIcon, EyeIcon, EyeClosedIcon } from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { classNames } from '../utils/class-names.js'

import PropTypes from 'prop-types'

class QuickActions extends React.Component {
  static propTypes = {
    hidden: PropTypes.bool,
    showingInfo: PropTypes.bool,
    onToggleVisibility: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  handleDontHide = e => {
    e.stopPropagation()
  }

  render () {
    const { onToggleVisibility, onRemove, hidden, showingInfo } = this.props
    return (
      <div
        className={classNames(
          styles.quickActions,
          showingInfo && styles.showingInfo
        )}
        onClick={this.handleDontHide}
      >
        <IconBtn
          className={classNames(styles.quickAction, styles.removeBtn)}
          onClick={onRemove}
        >
          <XIcon aria-label='Remove equation' className={styles.icon} />
        </IconBtn>
        <IconBtn
          className={classNames(styles.quickAction, styles.visibilityBtn)}
          onClick={onToggleVisibility}
        >
          {hidden ? (
            <EyeClosedIcon aria-label='Show equation' className={styles.icon} />
          ) : (
            <EyeIcon aria-label='Hide equation' className={styles.icon} />
          )}
        </IconBtn>
      </div>
    )
  }
}

export default QuickActions
