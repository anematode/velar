const plot = new Grapheme.Plot2D()
plot.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(plot.domElement)

const gridlines = new Grapheme.Gridlines()
plot.add(gridlines)

const fplot = new Grapheme.InteractiveFunctionPlot2D()
plot.add(fplot)

function setFunction (value) {
  const node = Grapheme.parse_string(value)
  const compiled = node.compile()

  fplot.setFunction(x => compiled.func(x))
  fplot.update()

  katex.render(node.latex(false), document.getElementById('_temp-katex-preview'), { throwOnError: false })
}

function render () {
  plot.render();
  requestAnimationFrame(render);
}

render()
setFunction('piecewise(0<x<2,piecewise(abs(x)<1/2,x),2<=x<4,x^2/2)')

export {
  plot,
  gridlines,
  fplot,
  setFunction
}
