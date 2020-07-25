import React from 'react'
import styles from './MenuWrapper.module.css'
import { ThreeBarsIcon, XIcon } from '@primer/octicons-react'
import logo from './logo.svg'
import IconBtn from '../components/IconBtn.jsx'
import Menu from './Menu.jsx'
import Tabs from './Tabs.jsx'

class MenuWrapper extends React.Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <div className={styles.logoWrapper}>
          <IconBtn className={styles.menuBtn}>
            <ThreeBarsIcon aria-label="Open menu" />
          </IconBtn>
          <IconBtn className={styles.closeMenuBtn}>
            <XIcon aria-label="Close menu" />
          </IconBtn>
          <img src={logo} alt="Velar logo" className={styles.logo} />
        </div>
        <Menu />
        <Tabs />
      </div>
    )
  }
}

export default MenuWrapper
