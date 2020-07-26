import React from 'react'
import styles from './MenuWrapper.module.css'
import { ThreeBarsIcon, XIcon } from '@primer/octicons-react'
import logo from './logo.svg'
import IconBtn from '../components/IconBtn.jsx'
import Menu from './Menu.jsx'
import Tabs from './Tabs.jsx'
import { classNames } from '../utils/class-names.js'

class MenuWrapper extends React.Component {
  state = {
    open: false
  }

  handleOpenMenu = () => {
    this.setState({ open: true })
  }

  handleCloseMenu = () => {
    this.setState({ open: false })
  }

  render () {
    const { open } = this.state
    return (
      <div className={classNames(styles.wrapper, open && styles.open)}>
        <div className={styles.logoWrapper}>
          {open ? (
            <IconBtn
              className={styles.closeMenuBtn}
              onClick={this.handleCloseMenu}
            >
              <XIcon aria-label='Close menu' />
            </IconBtn>
          ) : (
            <IconBtn className={styles.menuBtn} onClick={this.handleOpenMenu}>
              <ThreeBarsIcon aria-label='Open menu' />
            </IconBtn>
          )}
          <img src={logo} alt='Velar logo' className={styles.logo} />
        </div>
        {open && <Menu />}
        <Tabs />
      </div>
    )
  }
}

export default MenuWrapper
