/* global Grapheme */

// It'd be ideal if this could be imported as a module
const { Plot2D, Gridlines, InteractiveFunctionPlot2D, Colors, rgba } = Grapheme

class VelarElement {
  constructor () {
    const elem = (this.domElement = document.createElement('li'))
    this.elem = elem

    elem.classList.add('equation')

    const preview = (this.preview = document.createElement('div'))

    preview.classList.add('preview')

    const colourStrip = (this.colourStrip = document.createElement('div'))

    colourStrip.classList.add('colour-strip')

    elem.appendChild(preview)
    preview.appendChild(colourStrip)

    preview.onclick = () => this.toggleSelect()

    this.selected = false
  }

  toggleSelect () {
    if (this.selected) {
      this.deselect()
    } else {
      this.select()
    }
  }

  setColor (color) {
    this.elem.classList.remove(...builtInColors)
    this.elem.classList.add('colour-' + color)
  }

  select () {
    this.selected = true
    this.domElement.classList.add('expanded')
  }

  deselect () {
    this.selected = false
    this.domElement.classList.remove('expanded')
  }

  remove () {
    this.domElement.remove()
  }
}

const builtInColors = 'colour-blue, colour-red, colour-black, colour-magenta, colour-green, colour-orange, colour-brown, colour-navy, colour-light-blue, colour-yellow'.split(
  ', '
)

class VelarFunctionPlot2D extends VelarElement {
  constructor () {
    super()

    const latexPreview = (this.latexPreview = document.createElement('button'))

    latexPreview.classList.add('katex-preview')

    this.preview.appendChild(latexPreview)

    this.setDisplayedEquation('x')

    this.graphemeElement = new InteractiveFunctionPlot2D()

    plot.add(this.graphemeElement)

    this.graphemeElement.inspPtLabelStyle = inspPtLabelStyle

    this.info = document.createElement('div')
    this.info.classList.add('info')

    this.info.innerHTML = `
                <div class="raw-equation-wrapper">
                  <textarea class="raw-equation" id="_temp-equation-input"></textarea>
                </div>
                <div class="info-select">
                  <label class="select-label">Color</label>
                  <div class="select-group">
                    <button class="select-option plot-colour plot-colour-light colour-blue">Blue</button>
                    <button class="select-option plot-colour plot-colour-light colour-red">Red</button>
                    <button class="select-option plot-colour plot-colour-light colour-black">Black</button>
                    <button class="select-option plot-colour plot-colour-light colour-magenta">Magenta</button>
                    <button class="select-option plot-colour plot-colour-light colour-green">Green</button>
                  </div>
                  <div class="select-group">
                    <button class="select-option plot-colour plot-colour-light colour-orange">Orange</button>
                    <button class="select-option plot-colour plot-colour-light colour-navy">Navy</button>
                    <button class="select-option plot-colour plot-colour-light colour-light-blue">Light blue</button>
                    <button class="select-option plot-colour plot-colour-light colour-yellow">Yellow</button>
                    <button class="select-option"><span class="icon" data-octicon="pencil">Custom color</span></button>
                  </div>
                </div>
                <div class="info-select">
                  <label class="select-label">Line style</label>
                  <div class="select-group">
                    <button class="select-option plot-line"><span class="icon" data-src="./icons/icon-solid.svg">Solid</span></button>
                    <button class="select-option plot-line"><span class="icon" data-src="./icons/icon-dashed.svg">Dashed</span></button>
                    <button class="select-option plot-line"><span class="icon" data-src="./icons/icon-dotted.svg">Dotted</span></button>
                    <button class="select-option"><span class="icon" data-octicon="pencil">Custom line style</span></button>
                  </div>
                </div>
                <div class="actions">
                  <button class="action"><span class="icon" data-octicon="clippy"></span>Duplicate</button>
                  <button class="action danger"><span class="icon" data-octicon="trashcan"></span>Remove</button>
                </div>
                <button class="close-info-btn icon-btn">
                  <span class="icon expand-icon" data-octicon="chevron-up">Collapse</span>
                </button>`

    this.domElement.appendChild(this.info)

    this.dom = {
      equationInput: this.domElement.getElementsByClassName('raw-equation')[0],
      buttons: {
        colors: Array.from(
          this.domElement.getElementsByClassName('plot-colour')
        ),
        lineStyles: Array.from(
          this.domElement.getElementsByClassName('plot-line')
        ),
        duplicate: this.domElement.getElementsByClassName('action')[0],
        remove: this.domElement.getElementsByClassName('action')[1]
      }
    }

    this.setupInfoListeners()
  }

  setupInfoListeners () {
    this.dom.equationInput.oninput = () =>
      this.setFunction(this.dom.equationInput.value)

    this.dom.buttons.remove.onclick = () => removeEquation(this)
  }

  setFunction (str) {
    try {
      this.graphemeElement.setFunction(str)

      this.setDisplayedEquation(
        Grapheme.getFunction(
          equations[0].graphemeElement.functionName
        ).node.latex()
      )
    } catch (e) {
      console.log(e)
    }
  }

  select () {
    super.select()

    this.info.hidden = false
  }

  deselect () {
    super.deselect()

    this.info.hidden = true
  }

  setDisplayedEquation (latex) {
    Grapheme.katex.render(latex, this.latexPreview, { throwOnError: false })
  }

  remove () {
    super.remove()

    this.graphemeElement.destroy()
  }
}

const params = new URL(window.location).searchParams

const theme = params.get('theme') || 'dark'
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

const equationList = document.getElementsByClassName('equations')[0]
const equations = []

function addEquation () {
  const equation = new VelarFunctionPlot2D()

  equationList.appendChild(equation.domElement)

  equation.select()

  equations.push(equation)
}

function removeEquation (eq) {
  const index = equations.indexOf(eq)

  if (index !== -1) {
    equations.splice(index, 1)

    eq.remove()
  }
}

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

function render () {
  plot.render()
  window.requestAnimationFrame(render)
}

let inspPtLabelStyle

function setTheme ({ text, background, axisColour, gridColour, font }) {
  gridlines.label_style.color = text
  gridlines.label_style.shadowColor = background
  gridlines.label_style.fontFamily = font

  gridlines.pens.box.visible = false
  gridlines.pens.axis.color = axisColour
  gridlines.pens.major.color = gridColour
  gridlines.pens.minor.color = gridColour

  inspPtLabelStyle = new Grapheme.Label2DStyle()

  inspPtLabelStyle.color = text
  inspPtLabelStyle.shadowColor = background
  inspPtLabelStyle.fontFamily = font
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
  },
  paper () {
    // Would like to use the computed CSS properties for these values, I think
    // Might be nice if Grapheme had a helper function for making a Color from a CSS string?
    return {
      text: Colors.BLACK,
      background: Colors.WHITE,
      axisColour: Colors.BLACK,
      gridColour: rgba(0, 0, 0, 0.2 * 255),
      font: '"Source Sans Pro", sans-serif'
    }
  }
}

if (themes[theme]) setTheme(themes[theme]())
render()

export { plot, gridlines, VelarElement, equationList, addEquation, equations }
