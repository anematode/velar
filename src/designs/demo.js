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

// Function plot thicker and on top because "selected"
let ps = [];
const colors = [[85, 136, 204], [221, 68, 101], [187, 187, 204], [170, 102, 170], [0, 170, 85], [238, 119, 51], [187, 85, 34], [119, 136, 204], [34, 187, 204], [238, 187, 17]]
const funcs = ['x', 'x^2', 'sin(x)', 'sqrt(x)', '-2', '1/x', 'cos(x)-2', 'tan(x)', '-x^2/2-3', 'abs(x)-1']
for (let i = 0; i < 10; i++) {
	let pp = new Grapheme.FunctionPlot2D()
	pp.pen.color = rgba(colors[i][0], colors[i][1], colors[i][2])
	plot.add(pp)
	setFunction(pp, funcs[i], `eq${i+1}`)
}
/*const p1 = new InteractiveFunctionPlot2D()
p1.pen.color = rgba(85, 136, 204)
p1.pen.thickness = 4
plot.add(p1)

const p2 = new Grapheme.FunctionPlot2D()
p2.pen.color = rgba(221, 68, 101)
plot.add(p2)

const p3 = new InteractiveFunctionPlot2D()
p3.pen.color = rgba(187, 187, 204)
plot.add(p3)

const p4 = new Grapheme.FunctionPlot2D()
p4.pen.color = rgba(170, 102, 170)
plot.add(p4)*/

function setFunction (plot, input, id) {
  const fn = Grapheme.parse_string(input)

  plot.setFunction(fn.compile().func)
  plot.update()

  katex.render(fn.latex(false), document.getElementById(id), { throwOnError: false })
}

function render () {
  plot.render()
  window.requestAnimationFrame(render)
}

function setTheme ({
  text,
  background,
  gridColour,
  font
}) {
  gridlines.label_style.color = text
  gridlines.label_style.shadowColor = background
  gridlines.label_style.fontFamily = font

  //p1.inspectionPointLabelStyle.color = text
  //p1.inspectionPointLabelStyle.shadowColor = background
  //p1.inspectionPointLabelStyle.fontFamily = font

  for (const [name, pen] of Object.entries(gridlines.pens)) {
    if (name === 'box') {
      pen.visible = false
    } else {
      pen.color = gridColour
    }
  }
}
function darkTheme () {
  // Would like to use the computed CSS properties for these values, I think
  // Might be nice if Grapheme had a helper function for making a Color from a CSS string?
  return {
    text: rgba(255, 255, 255, 0.8 * 255),
    background: rgba(19, 20, 29),
    gridColour: rgba(255, 255, 255, 0.3 * 255),
    font: '"Source Sans Pro", sans-serif'
  }
}

setTheme(darkTheme())
render()

function resize () {
  const { width, height } = wrapper.getBoundingClientRect()
  plot.setSize(width, height)
}
window.requestAnimationFrame(() => {
  resize()
  wrapper.appendChild(plot.domElement)
  window.addEventListener('resize', resize)
})

export {
  plot,
  gridlines,
  setFunction
}
