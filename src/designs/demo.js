// It'd be ideal if this could be imported as a module
const {
  Plot2D,
  Gridlines,
  FunctionPlot2D,
  InteractiveFunctionPlot2D,
  Color,
  rgba,
  parse_string
} = Grapheme

const params = new URL(window.location).searchParams

let theme = params.get('theme') || 'dark'
if (theme !== 'dark') {
  document.body.classList.replace('dark', theme)
}

const wrapper = document.getElementById('_temp-grapheme-wrapper')

const plot = new Plot2D()
// It would be nice if Grapheme had a helper method for setting all padding to a value
for (const side of Object.keys(plot.padding)) {
  plot.padding[side] = 0
}

const gridlines = new Gridlines()
gridlines.pens.axis.thickness = 2
plot.add(gridlines)

// Function plot thicker and on top because "selected"
let ps = []
const themeColours = {
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
const colours = ['blue', 'red', 'black', 'magenta', 'green', 'orange', 'brown', 'navy', 'lightBlue', 'yellow']
const funcs = ['x', 'x^2', 'sin(x)', 'sqrt(x)', '-2', '1/x', 'cos(x)-2', 'tan(x)', '-x^2/2-3', 'abs(x)-1']
let expandedPlot
for (let i = 0; i < 10; i++) {
  let pp = i === 0 ? new InteractiveFunctionPlot2D() : new FunctionPlot2D()
  if (themeColours[theme] && themeColours[theme][colours[i]]) {
    pp.pen.color = rgba(...themeColours[theme][colours[i]])
  }
  ps.push(pp)
  if (i === 0) {
    expandedPlot = pp
    expandedPlot.pen.thickness = 4
  } else {
    if (i !== 1) plot.add(pp)
    setFunction(pp, funcs[i], `eq${i+1}`, i !== 1)
  }
}
// HACK: Make the currently selected plot visually on top
plot.add(expandedPlot)

function setFunction (plot, input, id, setFunction = true) {
  const fn = parse_string(input)

  if (setFunction) {
    plot.setFunction(fn.compile().func)
    plot.update()
  }

  katex.render(fn.latex(false), document.getElementById(id), { throwOnError: false })
}

function render () {
  plot.render()
  window.requestAnimationFrame(render)
}

function setTheme ({
  text,
  background,
  axisColour,
  gridColour,
  font
}) {
  gridlines.label_style.color = text
  gridlines.label_style.shadowColor = background
  gridlines.label_style.fontFamily = font

  expandedPlot.inspectionPointLabelStyle.color = text
  expandedPlot.inspectionPointLabelStyle.shadowColor = background
  expandedPlot.inspectionPointLabelStyle.fontFamily = font

  gridlines.pens.box.visible = false
  gridlines.pens.axis.color = axisColour
  gridlines.pens.major.color = gridColour
  gridlines.pens.minor.color = gridColour
}
const themes = {
  dark () {
    // Would like to use the computed CSS properties for these values, I think
    // Might be nice if Grapheme had a helper function for making a Color from a CSS string?
    return {
      text: rgba(255, 255, 255, 0.8 * 255),
      background: rgba(19, 20, 29),
      axisColour: rgba(255, 255, 255, 0.5 * 255),
      gridColour: rgba(255, 255, 255, 0.3 * 255),
      font: '"Source Sans Pro", sans-serif'
    }
  }
}

if (themes[theme]) setTheme(themes[theme]())
render()

const expressionInput = document.getElementById('_temp-equation-input')
expressionInput.value = 'piecewise(0<x<2,piecewise(abs(x)<1/2,x),2<=x<4,x^2/2)'
setFunction(expandedPlot, expressionInput.value, 'eq1')
const expressionWrapper = expressionInput.closest('.equation')
expressionInput.addEventListener('input', e => {
  try {
    setFunction(expandedPlot, expressionInput.value, 'eq1')
    expressionWrapper.classList.remove('error')
  } catch (err) {
    expressionWrapper.classList.add('error')
  }
})

function resize () {
  const { width, height } = wrapper.getBoundingClientRect()
  plot.setSize(width, height)
}
window.requestAnimationFrame(() => {
  resize()
  wrapper.appendChild(plot.domElement)
  window.addEventListener('resize', resize)
})

document.getElementById('_temp-open-menu-btn').addEventListener('click', e => {
  document.body.classList.add('menu-showing')
})
document.getElementById('_temp-close-menu-btn').addEventListener('click', e => {
  document.body.classList.remove('menu-showing')
})

for (const strip of document.getElementsByClassName('colour-strip')) {
  strip.addEventListener('click', e => {
    strip.parentNode.classList.toggle('show-quick-actions')
    e.stopPropagation()
  })
  strip.parentNode.addEventListener('click', e => {
    if (e.target.closest('.quick-action')) return
    strip.parentNode.classList.remove('show-quick-actions')
  })
}

document.getElementById('_temp-settings-btn').addEventListener('click', e => {
  document.body.classList.toggle('settings-open')
})

export {
  plot,
  gridlines,
  setFunction
}
