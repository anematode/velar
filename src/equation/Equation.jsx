import React from 'react'
import styles from './Equation.module.css'
import { classNames } from '../utils/class-names.js'
import QuickActions from './QuickActions.jsx'
import Info from './Info.jsx'
import { katex } from 'grapheme'

import PropTypes from 'prop-types'

class Equation extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    equation: PropTypes.string.isRequired,
    latex: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    lineStyle: PropTypes.string.isRequired,
    hidden: PropTypes.bool,
    error: PropTypes.bool,
    onEquationUpdate: PropTypes.func.isRequired,
    onToggleVisibility: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  }

  state = {
    showQuickActions: false,
    showInfo: false
  }

  componentDidMount () {
    katex.render(this.props.latex, this.previewRef, { throwOnError: false })
  }

  componentDidUpdate () {
    katex.render(this.props.latex, this.previewRef, { throwOnError: false })
  }

  handleHideQuickActions = () => {
    this.setState({ showQuickActions: false })
  }

  handleShowQuickActions = e => {
    e.stopPropagation()
    this.setState({ showQuickActions: true })
  }

  handleToggleInfoVisibility = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  handleEquationUpdate = (...changes) => {
    this.props.onEquationUpdate(this.props.id, ...changes)
  }

  handleTogglePlotVisibility = () => {
    this.props.onToggleVisibility(this.props.id)
  }

  handleDuplicate = () => {
    this.props.onDuplicate(this.props.id)
  }

  handleRemove = () => {
    this.props.onRemove(this.props.id)
  }

  setPreviewRef = ref => {
    this.previewRef = ref
  }

  render () {
    const { showInfo, showQuickActions } = this.state
    const { equation, color, lineStyle, hidden, error } = this.props
    return (
      <li
        className={classNames(
          styles.equation,
          styles.expanded,
          `color-${color}`
        )}
      >
        <div
          className={classNames(
            styles.preview,
            hidden && styles.hidden,
            showQuickActions && styles.showQuickActions
          )}
          onClick={this.handleHideQuickActions}
        >
          <QuickActions
            onToggleVisibility={this.handleTogglePlotVisibility}
            onRemove={this.handleRemove}
            hidden={hidden}
          />
          <div
            className={styles.colorStrip}
            onClick={this.handleShowQuickActions}
          />
          <button
            ref={this.setPreviewRef}
            className={styles.katexPreview}
            onClick={this.handleToggleInfoVisibility}
          />
        </div>
        {showInfo && (
          <Info
            equation={equation}
            color={color}
            lineStyle={lineStyle}
            error={error}
            onEquationUpdate={this.handleEquationUpdate}
            onDuplicate={this.handleDuplicate}
            onRemove={this.handleRemove}
            onCollapse={this.handleToggleInfoVisibility}
          />
        )}
      </li>
    )
  }
}

export default Equation
