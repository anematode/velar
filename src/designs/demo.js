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

const wrapper = document.getElementById('_temp-grapheme-wrapper')

const plot = new Plot2D()
// It would be nice if Grapheme had a helper method for setting all padding to a value
for (const side of Object.keys(plot.padding)) {
  plot.padding[side] = 0
}

const gridlines = new Gridlines()
gridlines.pens.axis.thickness = 2
plot.add(gridlines)

// Derivative not interactive because not selected; in reality it should select the function on click but whatever
const dplot = new FunctionPlot2D()
dplot.pen.color = rgba(100, 150, 255)
plot.add(dplot)

const polyPlot = new FunctionPlot2D()
polyPlot.pen.color = rgba(150, 255, 100)
plot.add(polyPlot)

// Function plot thicker and on top because "selected"
const fplot = new InteractiveFunctionPlot2D()
fplot.pen.color = rgba(255, 100, 100)
fplot.pen.thickness = 4
plot.add(fplot)

function setFunction (input) {
  const fn = parse_string(input)

  fplot.setFunction(fn.compile().func)
  fplot.update()

  katex.render(fn.latex(false), document.getElementById('_temp-katex-preview'), { throwOnError: false })

  const derivative = fn.derivative('x')

  dplot.setFunction(derivative.compile().func)
  dplot.update()

  katex.render(derivative.latex(false), document.getElementById('_temp-katex-preview2'), { throwOnError: false })
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

  fplot.inspectionPointLabelStyle.color = text
  fplot.inspectionPointLabelStyle.shadowColor = background
  fplot.inspectionPointLabelStyle.fontFamily = font

  gridlines.pens.box.visible = false
  gridlines.pens.axis.color = axisColour
  gridlines.pens.major.color = gridColour
  gridlines.pens.minor.color = gridColour
}
function darkTheme () {
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

setTheme(darkTheme())
render()

const expressionInput = document.getElementById('_temp-equation-input')
expressionInput.value = 'piecewise(0<x<2,piecewise(abs(x)<1/2,x),2<=x<4,x^2/2)'
setFunction(expressionInput.value)
const expressionWrapper = expressionInput.closest('.equation')
expressionInput.addEventListener('input', e => {
  try {
    setFunction(expressionInput.value)
    expressionWrapper.classList.remove('error')
  } catch (err) {
    expressionWrapper.classList.add('error')
  }
})

const polynomial = parse_string('((x + 1)^2 * (x - 3) * (x - 4) * (x^2 - 10)) / (x^2 * (x - 2) * (x^2 - 25))')
polyPlot.setFunction(polynomial.compile().func)
polyPlot.update()
katex.render(polynomial.latex(false), document.getElementById('_temp-katex-preview3'), { throwOnError: false })

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

export {
  plot,
  gridlines,
  fplot,
  dplot,
  setFunction
}
