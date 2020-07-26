import React from 'react'
import styles from './Info.module.css'
import {
  TrashcanIcon,
  PencilIcon,
  ClippyIcon,
  ChevronUpIcon
} from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { classNames } from '../utils/class-names.js'
import { COLORS } from '../colors/themes.js'
import { lineStyles } from '../utils/line-styles.js'

import PropTypes from 'prop-types'

function SelectGroup ({ label, children }) {
  return (
    <div className={styles.infoSelect}>
      <label className={styles.selectLabel}>{label}</label>
      <div className={styles.selectGroup}>
        {React.Children.map(children, option =>
          React.cloneElement(option, {
            className: classNames(option.props.className, styles.selectOption)
          })
        )}
      </div>
    </div>
  )
}

SelectGroup.propTypes = {
  label: PropTypes.string.isRequired,
  children: PropTypes.node
}

class Info extends React.Component {
  static propTypes = {
    equation: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
    lineStyle: PropTypes.string.isRequired,
    error: PropTypes.bool,
    onEquationUpdate: PropTypes.func.isRequired,
    onDuplicate: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired,
    onCollapse: PropTypes.func.isRequired
  }

  handleEquationChange = e => {
    this.props.onEquationUpdate('setFunction', e.target.value)
  }

  handleColorChange (color) {
    this.props.onEquationUpdate('setColor', color)
  }

  handleLineStyleChange (lineStyle) {
    this.props.onEquationUpdate('setLineStyle', lineStyle)
  }

  render () {
    const {
      equation,
      color,
      lineStyle,
      error,
      onDuplicate,
      onRemove,
      onCollapse
    } = this.props
    return (
      <div className={styles.info}>
        <div className={styles.rawEquationWrapper}>
          <textarea
            className={classNames(styles.rawEquation, error && styles.error)}
            onChange={this.handleEquationChange}
            value={equation}
          />
        </div>
        <SelectGroup label='Color'>
          {Object.entries(COLORS).map(([colorId, colorName]) => (
            // TODO: determine plotColorDark/plotColorLight
            <button
              key={colorId}
              className={classNames(
                styles.plotColor,
                `color-${colorId}`,
                color === colorId && styles.selected
              )}
              onClick={() => this.handleColorChange(colorId)}
            >
              {colorName}
            </button>
          ))}
          <button className={!COLORS[color] && styles.selected}>
            <PencilIcon aria-label='Custom color' />
          </button>
        </SelectGroup>
        <SelectGroup label='Line style'>
          {Object.entries(lineStyles).map(([id, { Icon, name }]) => (
            <button
              key={id}
              className={classNames(
                styles.plotLine,
                lineStyle === id && styles.selected
              )}
              onClick={() => this.handleLineStyleChange(id)}
            >
              <Icon aria-label={name} className={styles.customIcon} />
            </button>
          ))}
          <button className={!lineStyles[lineStyle] && styles.selected}>
            <PencilIcon aria-label='Custom line style' />
          </button>
        </SelectGroup>
        <div className={styles.actions}>
          <button className={styles.action} onClick={onDuplicate}>
            <ClippyIcon className={styles.icon} />
            Duplicate
          </button>
          <button
            className={classNames(styles.action, styles.danger)}
            onClick={onRemove}
          >
            <TrashcanIcon className={styles.icon} />
            Remove
          </button>
        </div>
        <IconBtn className={styles.closeInfoBtn} onClick={onCollapse}>
          <ChevronUpIcon aria-label='Collapse' className={styles.expandIcon} />
        </IconBtn>
      </div>
    )
  }
}

export default Info
