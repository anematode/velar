import 'https://anematode.github.io/grapheme/build/grapheme.js'

let plot = new Grapheme.Plot2D()

plot.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(plot.domElement);

let gridlines = new Grapheme.Gridlines()
plot.add(gridlines)

let fplot = new Grapheme.InteractiveFunctionPlot2D()
plot.add(fplot)

let dplot = new Grapheme.InteractiveFunctionPlot2D()
plot.add(dplot)

dplot.pen.color = Grapheme.Colors.BLACK

function setFunction(value) {
  let node = Grapheme.parse_string(value)
  let compile = node.compile()
  let index = compile.variableNames.indexOf('x')

  let func

  if (index === -1) {
    func = (x) => compile.func()
  } else {
    // as you can see, highly WIP
    func = (x) => compile.func(x)
  }

  fplot.setFunction(func)
  fplot.update()

  cow = node

  egg = node.derivative('x')

  dplot.setFunction(egg.compile().func)
  dplot.update()

  katex.render(node.latex(false), document.getElementById("katex-stuff"), { throwOnError: false })
}

let ia = 0;
function render() {
  ia += 0.1;

  plot.render();
  requestAnimationFrame(render);
}

window.onload = () => setFunction("piecewise(0<x<2,piecewise(abs(x)<1/2,x),2<=x<4,x^2/2)")
render()
