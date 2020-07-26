import React from 'react'
import styles from './Equation.module.css'
import { classNames } from '../utils/class-names.js'
import QuickActions from './QuickActions.jsx'
import Info from './Info.jsx'
import { katex } from 'grapheme'

class Equation extends React.Component {
  state = {
    showInfo: false
  }

  componentDidUpdate () {
    katex.render(this.props.latex, this.previewRef, { throwOnError: false })
  }

  handleToggleInfoVisibility = () => {
    this.setState({ showInfo: !this.state.showInfo })
  }

  handleEquationUpdate = changes => {
    this.props.onEquationUpdate(this.props.index, changes)
  }

  handleTogglePlotVisibility = () => {
    this.props.onToggleVisibility(this.props.index)
  }

  handleDuplicate = () => {
    this.props.onDuplicate(this.props.index)
  }

  handleRemove = () => {
    this.props.onRemove(this.props.index)
  }

  setPreviewRef = ref => {
    console.log('ref', ref);
    this.previewRef = ref
  }

  render () {
    const { showInfo } = this.state
    const {
      equation,
      color,
      lineStyle
    } = this.props
    return (
      <li
        className={classNames(styles.equation, styles.expanded, 'color-blue')}
      >
        <div className={styles.preview}>
          <QuickActions
            onToggleVisibility={this.handleTogglePlotVisibility}
            onRemove={this.handleRemove}
          />
          <div className={styles.colorStrip} />
          <button
            ref={this.setPreviewRef}
            className={styles.katexPreview}
            onClick={this.handleToggleInfoVisibility}
          />
        </div>
        {showInfo && <Info
          equation={equation}
          color={color}
          lineStyle={lineStyle}
          onEquationUpdate={this.handleEquationUpdate}
          onDuplicate={this.handleDuplicate}
          onRemove={this.handleRemove}
          onCollapse={this.handleToggleInfoVisibility}
        />}
      </li>
    )
  }
}

export default Equation
