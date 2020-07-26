import React from 'react'
import styles from './GraphemeSettings.module.css'
import { GearIcon } from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'
import { classNames } from '../utils/class-names.js'

class GraphemeSettings extends React.Component {
  state = {
    open: false
  }

  handleToggleOpen = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render () {
    const { open } = this.state
    return (
      <>
        <IconBtn
          className={classNames(styles.settingsBtn, open && styles.open)}
          onClick={this.handleToggleOpen}
        >
          <GearIcon aria-label='Graphing settings' />
        </IconBtn>
        {open && (
          <div className={styles.wrapper}>
            What settings should Grapheme have here? Can't have too many, or
            it'll be overwhelming.
            <br />
            Actually, what'd be cool is if there could be a demo for each
            option, so students can learn what each option does and is meant
            for.
            <br />
            Not sure how helpful that'd be.
          </div>
        )}
      </>
    )
  }
}

export default GraphemeSettings
