import React from 'react'
import styles from './GraphemeSettings.module.css'
import { GearIcon } from '@primer/octicons-react'
import IconBtn from '../components/IconBtn.jsx'

class GraphemeSettings extends React.Component {
  render () {
    return <>
      <IconBtn className={styles.settingsBtn}>
        <GearIcon aria-label="Graphing settings" />
      </IconBtn>
      <div className={styles.wrapper}>
        What settings should Grapheme have here? Can't have too many, or it'll be overwhelming.<br />
        Actually, what'd be cool is if there could be a demo for each option, so students can learn what each option does and is meant for.<br />
        Not sure how helpful that'd be.
      </div>
    </>
  }
}

export default GraphemeSettings
