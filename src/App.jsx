import React from 'react'
import styles from './App.module.css'
import MenuWrapper from './menu/MenuWrapper.jsx'
import Calculator from './calculator/Calculator.jsx'

function App () {
  return (
    <div className={styles.wrapper}>
      <MenuWrapper />
      <Calculator />
    </div>
  )
}

export default App
