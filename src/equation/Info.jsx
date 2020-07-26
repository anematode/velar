import React from 'react'
import styles from './Info.module.css'
import {
  TrashcanIcon,
  PencilIcon,
  ClippyIcon,
  ChevronUpIcon
} from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { ReactComponent as SolidIcon } from './icon-solid.svg'
import { ReactComponent as DashedIcon } from './icon-dashed.svg'
import { ReactComponent as DottedIcon } from './icon-dotted.svg'
import { classNames } from '../utils/class-names.js'
import { COLORS } from '../colors/themes.js'

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

class Info extends React.Component {
  render () {
    return (
      <div className={styles.info}>
        <div className={styles.rawEquationWrapper}>
          <textarea className={styles.rawEquation} />
        </div>
        <SelectGroup label='Color'>
          {Object.entries(COLORS).map(([colorId, colorName]) => (
            // TODO: determine plotColorDark/plotColorLight
            <button
              key={colorId}
              className={classNames(styles.plotColor, `color-${colorId}`)}
            >
              {colorName}
            </button>
          ))}
          <button>
            <PencilIcon aria-label='Custom color' />
          </button>
        </SelectGroup>
        <SelectGroup label='Line style'>
          <button className={styles.plotLine}>
            <SolidIcon aria-label='Solid' className={styles.customIcon} />
          </button>
          <button className={styles.plotLine}>
            <DashedIcon aria-label='Dashed' className={styles.customIcon} />
          </button>
          <button className={styles.plotLine}>
            <DottedIcon aria-label='Dotted' className={styles.customIcon} />
          </button>
          <button>
            <PencilIcon aria-label='Custom line style' />
          </button>
        </SelectGroup>
        <div className={styles.actions}>
          <button className={styles.action}>
            <ClippyIcon className={styles.icon} />
            Duplicate
          </button>
          <button className={classNames(styles.action, styles.danger)}>
            <TrashcanIcon className={styles.icon} />
            Remove
          </button>
        </div>
        <IconBtn className={styles.closeInfoBtn}>
          <ChevronUpIcon aria-label='Collapse' className={styles.expandIcon} />
        </IconBtn>
      </div>
    )
  }
}

export default Info
