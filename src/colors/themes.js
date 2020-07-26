import './themes.css'
import { Color, Colors } from 'grapheme'

const COLORS = ['blue', 'red', 'black', 'magenta', 'green', 'orange', 'brown', 'navy', 'lightBlue', 'yellow']

const themeColors = {
  dark: {
    blue: [85, 136, 204],
    red: [221, 68, 101],
    black: [187, 187, 204],
    magenta: [170, 102, 170],
    green: [0, 170, 85],
    orange: [238, 119, 51],
    brown: [187, 85, 34],
    navy: [119, 136, 204],
    lightBlue: [34, 187, 204],
    yellow: [238, 187, 17]
  },
  paper: {
    blue: [0, 0, 255],
    red: [255, 0, 0],
    black: [0, 0, 0],
    magenta: [255, 0, 255],
    green: [0, 128, 0],
    orange: [255, 165, 0],
    brown: [165, 42, 42],
    navy: [0, 0, 128],
    lightBlue: [173, 216, 230],
    yellow: [255, 255, 0]
  }
}

const baseGraphemeTheme = {
  font: '"Source Sans Pro", sans-serif'
}
const graphemeThemes = {
  dark: {
    text: Color.rgba(255, 255, 255, 0.8 * 255),
    background: Color.rgba(19, 20, 29),
    axisColour: Color.rgba(255, 255, 255, 0.5 * 255),
    gridColour: Color.rgba(255, 255, 255, 0.3 * 255),
    ...baseGraphemeTheme
  },
  paper: {
    text: Colors.BLACK,
    background: Colors.WHITE,
    axisColour: Colors.BLACK,
    gridColour: Color.rgba(0, 0, 0, 0.2 * 255),
    ...baseGraphemeTheme
  }
}

export {
  COLORS,
  themeColors,
  graphemeThemes
}
