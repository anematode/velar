import React from 'react'
import styles from './Equation.module.css'
import { TrashcanIcon, EyeClosedIcon, PencilIcon, ClippyIcon, ChevronUpIcon } from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { classNames } from '../utils/class-names.js'
import { ReactComponent as SolidIcon } from './icon-solid.svg'
import { ReactComponent as DashedIcon } from './icon-dashed.svg'
import { ReactComponent as DottedIcon } from './icon-dotted.svg'

class Equation extends React.Component {
  render () {
    return (
      <li className={classNames(styles.equation, styles.expanded, 'colour-blue')}>
        <div className={styles.preview}>
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
          <div className={styles.colorStrip}></div>
          <button className={styles.katexPreview}></button>
        </div>
        <div className={styles.info}>
          <div className={styles.rawEquationWrapper}>
            <textarea className={styles.rawEquation} id="_temp-equation-input"></textarea>
          </div>
          <div className={styles.infoSelect}>
            <label className={styles.selectLabel}>Color</label>
            <div className={styles.selectGroup}>
              <button className="select-option plot-colour plot-colour-light colour-blue selected">Blue</button>
              <button className="select-option plot-colour plot-colour-light colour-red">Red</button>
              <button className="select-option plot-colour plot-colour-light colour-black">Black</button>
              <button className="select-option plot-colour plot-colour-light colour-magenta">Magenta</button>
              <button className="select-option plot-colour plot-colour-light colour-green">Green</button>
            </div>
            <div className={styles.selectGroup}>
              <button className="select-option plot-colour plot-colour-light colour-orange">Orange</button>
              <button className="select-option plot-colour plot-colour-light colour-navy">Navy</button>
              <button className="select-option plot-colour plot-colour-light colour-light-blue">Light blue</button>
              <button className="select-option plot-colour plot-colour-light colour-yellow">Yellow</button>
              <button className={styles.selectOption}><PencilIcon aria-label="Custom color" /></button>
            </div>
          </div>
          <div className={styles.infoSelect}>
            <label className={styles.selectLabel}>Line style</label>
            <div className={styles.selectGroup}>
              <button className="select-option plot-line selected"><SolidIcon aria-label="Solid" /></button>
              <button className="select-option plot-line"><DashedIcon aria-label="Dashed" /></button>
              <button className="select-option plot-line"><DottedIcon aria-label="Dotted" /></button>
              <button className={styles.selectOption}><PencilIcon aria-label="Custom line style" /></button>
            </div>
          </div>
          <div className={styles.actions}>
            <button className={styles.action}><ClippyIcon />Duplicate</button>
            <button className={classNames(styles.action, 'danger')}><TrashcanIcon />Remove</button>
          </div>
          <IconBtn className={styles.closeInfoBtn}>
            <EyeClosedIcon aria-label="Collapse" className={styles.expandIcon} />
          </IconBtn>
        </div>
      </li>
    )
  }
}

export default Equation
