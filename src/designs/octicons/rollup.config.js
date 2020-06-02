// rollup -c src/designs/octicons/rollup.config.js

import path from 'path'

import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'

export default {
  input: path.resolve(__dirname, './load-icons.js'),
  output: {
    file: path.resolve(__dirname, './load-icons-built.js'),
    format: 'es'
  },
  plugins: [
    resolve({
      browser: true
    }),
    commonjs(),
    json({
      preferConst: true
    })
  ]
}
