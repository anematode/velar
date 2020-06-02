// It'd be ideal if this could be imported as a module
const {
  Plot2D,
  Gridlines,
  InteractiveFunctionPlot2D,
  Color,
  rgba
} = Grapheme

const wrapper = document.getElementById('_temp-grapheme-wrapper')

const plot = new Plot2D()
// It would be nice if Grapheme had a helper method for setting all padding to a value
for (const side of Object.keys(plot.padding)) {
  plot.padding[side] = 0
}

const gridlines = new Gridlines()
plot.add(gridlines)

const fplot = new InteractiveFunctionPlot2D()
plot.add(fplot)

function setFunction (value) {
  const node = Grapheme.parse_string(value)
  const compiled = node.compile()

  fplot.setFunction(x => compiled.func(x))
  fplot.update()

  katex.render(node.latex(false), document.getElementById('_temp-katex-preview'), { throwOnError: false })
}

function render () {
  plot.render()
  window.requestAnimationFrame(render)
}

function setTheme ({
  text,
  background,
  gridColour,
  graphColour,
  font
}) {
  gridlines.label_style.color = text
  gridlines.label_style.shadowColor = background
  gridlines.label_style.fontFamily = font

  fplot.inspectionPointLabelStyle.color = text
  fplot.inspectionPointLabelStyle.shadowColor = background
  fplot.inspectionPointLabelStyle.fontFamily = font

  for (const [name, pen] of Object.entries(gridlines.pens)) {
    if (name === 'box') {
      pen.visible = false
    } else {
      pen.color = gridColour
    }
  }

  fplot.pen.color = graphColour
}
function darkTheme () {
  // Would like to use the computed CSS properties for these values, I think
  // Might be nice if Grapheme had a helper function for making a Color from a CSS string?
  return {
    text: rgba(255, 255, 255, 0.8 * 255),
    background: rgba(19, 20, 29),
    gridColour: rgba(255, 255, 255, 0.5 * 255),
    graphColour: rgba(255, 100, 100),
    font: '"Source Sans Pro", sans-serif'
  }
}

setTheme(darkTheme())
render()
setFunction('piecewise(0<x<2,piecewise(abs(x)<1/2,x),2<=x<4,x^2/2)')

window.requestAnimationFrame(() => {
  const { width, height } = wrapper.getBoundingClientRect()
  plot.setSize(width, height)
  wrapper.appendChild(plot.domElement)
})

export {
  plot,
  gridlines,
  fplot,
  setFunction
}
